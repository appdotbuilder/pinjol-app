import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    captcha_answer: string;
    [key: string]: string | boolean | File | null | undefined;
}

export default function Register() {
    const [captchaQuestion, setCaptchaQuestion] = useState('');
    const [captchaAnswer, setCaptchaAnswer] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm<RegisterFormData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        captcha_answer: '',
    });

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operations = ['+', '-', '*'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let answer = 0;
        let question = '';

        switch (operation) {
            case '+': {
                answer = num1 + num2;
                question = `${num1} + ${num2}`;
                break;
            }
            case '-': {
                // Ensure positive result
                const larger = Math.max(num1, num2);
                const smaller = Math.min(num1, num2);
                answer = larger - smaller;
                question = `${larger} - ${smaller}`;
                break;
            }
            case '*': {
                answer = num1 * num2;
                question = `${num1} × ${num2}`;
                break;
            }
        }

        setCaptchaQuestion(question);
        setCaptchaAnswer(answer);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check captcha
        if (parseInt(data.captcha_answer) !== captchaAnswer) {
            alert('Jawaban captcha salah!');
            generateCaptcha();
            setData('captcha_answer', '');
            return;
        }

        // Auto-generate email from phone if not provided
        if (!data.email) {
            setData('email', `${data.phone}@pinjamanku.com`);
        }
        if (!data.name) {
            setData('name', `User${data.phone.slice(-4)}`);
        }

        post('/register', {
            onFinish: () => reset('password', 'password_confirmation', 'captcha_answer'),
        });
    };

    return (
        <>
            <Head title="📝 Daftar Akun Baru" />

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
                                <span className="text-3xl">📝</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Sekarang</h1>
                            <p className="text-gray-600">
                                Buat akun untuk mulai mengajukan pinjaman
                            </p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nomor HP *
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="08xxxxxxxxxx"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Nomor HP akan digunakan sebagai username
                                </p>
                            </div>

                            {/* Name (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lengkap (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Bisa diisi nanti saat verifikasi identitas
                                </p>
                            </div>

                            {/* Email (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email (Opsional)
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@contoh.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimal 8 karakter"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                    minLength={8}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Konfirmasi Password *
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Ulangi password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Simple Captcha */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Captcha Sederhana *
                                </label>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-gray-100 px-4 py-3 rounded-xl font-mono text-lg font-bold flex-shrink-0">
                                        {captchaQuestion} = ?
                                    </div>
                                    <input
                                        type="number"
                                        value={data.captcha_answer}
                                        onChange={(e) => setData('captcha_answer', e.target.value)}
                                        placeholder="Jawaban"
                                        className="w-20 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            generateCaptcha();
                                            setData('captcha_answer', '');
                                        }}
                                        className="text-blue-600 hover:text-blue-700 flex-shrink-0"
                                    >
                                        🔄
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Jawab pertanyaan matematika sederhana di atas
                                </p>
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
                                        Mendaftar...
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">✅</span>
                                        Daftar Akun
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Sudah punya akun?{' '}
                                <Link
                                    href="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Masuk di sini
                                </Link>
                            </p>
                        </div>

                        {/* Terms */}
                        <div className="text-center mt-4">
                            <p className="text-xs text-gray-500">
                                Dengan mendaftar, Anda menyetujui{' '}
                                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                                    Syarat & Ketentuan
                                </Link>{' '}
                                serta{' '}
                                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                                    Kebijakan Privasi
                                </Link>{' '}
                                kami.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}