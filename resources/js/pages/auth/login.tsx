import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: string | boolean | File | null | undefined;
}

export default function Login({ status }: { status?: string }) {
    const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

    const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // If using phone, convert to email format for backend
        if (loginMethod === 'phone' && !data.email.includes('@')) {
            setData('email', `${data.email}@pinjamanku.com`);
        }

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="🔐 Masuk ke Akun" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm px-4 py-3">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <Link 
                            href="/"
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                        >
                            <span>← Kembali</span>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">💰</span>
                            </div>
                            <span className="font-bold text-lg text-gray-800">PinjamanKu</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex items-center justify-center px-4 py-8">
                    <div className="w-full max-w-md">
                        {/* Welcome Section */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🔐</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
                            <p className="text-gray-600">
                                Masuk ke akun Anda untuk melanjutkan
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                                {status}
                            </div>
                        )}

                        {/* Login Method Toggle */}
                        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setLoginMethod('phone');
                                    setData('email', '');
                                }}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                    loginMethod === 'phone'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                📱 Nomor HP
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setLoginMethod('email');
                                    setData('email', '');
                                }}
                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                    loginMethod === 'email'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                📧 Email
                            </button>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username/Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {loginMethod === 'phone' ? 'Nomor HP' : 'Email'}
                                </label>
                                <input
                                    type={loginMethod === 'phone' ? 'tel' : 'email'}
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder={loginMethod === 'phone' ? '08xxxxxxxxxx' : 'email@contoh.com'}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Masukkan password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    Lupa password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Masuk...
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">🚀</span>
                                        Masuk
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Belum punya akun?{' '}
                                <Link
                                    href="/register"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Daftar sekarang
                                </Link>
                            </p>
                        </div>

                        {/* Demo Account */}
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <div className="text-center">
                                <p className="text-sm text-yellow-800 mb-2">
                                    <strong>Demo Account:</strong>
                                </p>
                                <p className="text-xs text-yellow-700">
                                    Email: test@example.com<br />
                                    Password: password
                                </p>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-500">
                                Butuh bantuan?{' '}
                                <button
                                    onClick={() => {
                                        const message = encodeURIComponent(
                                            'Halo, saya butuh bantuan untuk login ke akun PinjamanKu. Mohon bantuannya.'
                                        );
                                        window.open(`https://wa.me/+6281234567890?text=${message}`, '_blank');
                                    }}
                                    className="text-green-600 hover:text-green-700 font-medium"
                                >
                                    Hubungi CS WhatsApp
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}