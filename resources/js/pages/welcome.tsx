import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Banner {
    id: number;
    title: string;
    description?: string;
    image: string;
    link_url?: string;
}

interface Testimonial {
    id: number;
    name: string;
    content: string;
    rating: number;
    location?: string;
}

interface Props {
    banners: Banner[];
    testimonials: Testimonial[];
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ banners = [], testimonials = [], auth }: Props) {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [loanTerm, setLoanTerm] = useState(3);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleLoanApplication = () => {
        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        router.post('/loan-application', {
            amount: loanAmount,
            term_months: loanTerm,
        });
    };

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <>
            <Head title="💰 Pinjaman Online Mudah & Cepat" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm px-4 py-3">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">💰</span>
                            </div>
                            <span className="font-bold text-lg text-gray-800">PinjamanKu</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-sm text-blue-600 font-medium"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="max-w-md mx-auto bg-white min-h-screen">
                    {/* Banner Slider */}
                    {banners.length > 0 && (
                        <div className="relative">
                            <div className="overflow-hidden">
                                <div 
                                    className="flex transition-transform duration-300"
                                    style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                                >
                                    {banners.map((banner) => (
                                        <div key={banner.id} className="w-full flex-shrink-0">
                                            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white p-6">
                                                <div className="text-center">
                                                    <h2 className="text-xl font-bold mb-2">{banner.title}</h2>
                                                    {banner.description && (
                                                        <p className="text-sm opacity-90">{banner.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {banners.length > 1 && (
                                <>
                                    <button
                                        onClick={prevBanner}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white p-2 rounded-full"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={nextBanner}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white p-2 rounded-full"
                                    >
                                        →
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                        {banners.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentBanner(index)}
                                                className={`w-2 h-2 rounded-full ${
                                                    index === currentBanner ? 'bg-white' : 'bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Hero Section if no banners */}
                    {banners.length === 0 && (
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
                            <h1 className="text-2xl font-bold mb-2">💰 Pinjaman Online Mudah & Cepat</h1>
                            <p className="opacity-90">Dapatkan dana tunai hingga 10 juta rupiah dengan proses cepat dan mudah</p>
                        </div>
                    )}

                    {/* Loan Calculator */}
                    <div className="p-6 border-b-8 border-gray-100">
                        <h2 className="text-lg font-bold mb-4 flex items-center">
                            <span className="mr-2">🧮</span>
                            Kalkulator Pinjaman
                        </h2>
                        
                        {/* Loan Amount Slider */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Jumlah Pinjaman: <span className="text-blue-600 font-bold">{formatCurrency(loanAmount)}</span>
                            </label>
                            <input
                                type="range"
                                min="500000"
                                max="10000000"
                                step="100000"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>500K</span>
                                <span>10M</span>
                            </div>
                        </div>

                        {/* Loan Term Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Tenor Pinjaman</label>
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 3, 6, 12].map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => setLoanTerm(term)}
                                        className={`p-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                                            loanTerm === term
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {term} Bulan
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Apply Button */}
                        <button
                            onClick={handleLoanApplication}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                        >
                            <span className="mr-2">📋</span>
                            Ajukan Pinjaman Sekarang
                        </button>
                    </div>

                    {/* Features */}
                    <div className="p-6 border-b-8 border-gray-100">
                        <h2 className="text-lg font-bold mb-4">✨ Kenapa Pilih PinjamanKu?</h2>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="text-green-500 text-lg">⚡</span>
                                <div>
                                    <h3 className="font-medium">Proses Super Cepat</h3>
                                    <p className="text-sm text-gray-600">Persetujuan dalam hitungan menit</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-500 text-lg">🔒</span>
                                <div>
                                    <h3 className="font-medium">100% Aman & Terpercaya</h3>
                                    <p className="text-sm text-gray-600">Data pribadi terlindungi dengan enkripsi</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-purple-500 text-lg">💳</span>
                                <div>
                                    <h3 className="font-medium">Tanpa Jaminan</h3>
                                    <p className="text-sm text-gray-600">Tidak perlu agunan atau jaminan</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-orange-500 text-lg">📱</span>
                                <div>
                                    <h3 className="font-medium">Mudah Diakses</h3>
                                    <p className="text-sm text-gray-600">Bisa diakses kapan saja, dimana saja</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    {testimonials.length > 0 && (
                        <div className="p-6 border-b-8 border-gray-100">
                            <h2 className="text-lg font-bold mb-4">💬 Kata Mereka</h2>
                            <div className="bg-white border rounded-xl p-4 shadow-sm">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-bold text-sm">
                                            {testimonials[currentTestimonial]?.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium">{testimonials[currentTestimonial]?.name}</div>
                                        <div className="text-sm text-gray-500">
                                            {testimonials[currentTestimonial]?.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span
                                            key={i}
                                            className={`text-sm ${
                                                i < testimonials[currentTestimonial]?.rating
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-700">
                                    "{testimonials[currentTestimonial]?.content}"
                                </p>
                            </div>
                            
                            {testimonials.length > 1 && (
                                <div className="flex justify-center space-x-2 mt-4">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentTestimonial(index)}
                                            className={`w-2 h-2 rounded-full ${
                                                index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bottom Navigation */}
                    <div className="bg-white border-t px-6 py-4 sticky bottom-0">
                        <div className="grid grid-cols-4 gap-4 text-center">
                            <div className="flex flex-col items-center">
                                <span className="text-blue-600 text-lg mb-1">🏠</span>
                                <span className="text-xs font-medium text-blue-600">Home</span>
                            </div>
                            <Link 
                                href={auth?.user ? "/wallet" : "/login"}
                                className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                            >
                                <span className="text-lg mb-1">💰</span>
                                <span className="text-xs font-medium">Dompet</span>
                            </Link>
                            <Link 
                                href={auth?.user ? "/faq" : "/login"}
                                className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                            >
                                <span className="text-lg mb-1">❓</span>
                                <span className="text-xs font-medium">FAQ</span>
                            </Link>
                            <Link 
                                href={auth?.user ? "/profile" : "/login"}
                                className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                            >
                                <span className="text-lg mb-1">👤</span>
                                <span className="text-xs font-medium">Profil</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}