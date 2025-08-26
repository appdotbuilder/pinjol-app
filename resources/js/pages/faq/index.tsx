import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

interface FaqArticle {
    id: number;
    title: string;
    content: string;
    category: string;
}

interface Props {
    articles: FaqArticle[];
    categories: string[];
    current_category: string;
    [key: string]: unknown;
}

export default function FaqIndex({ articles, categories, current_category }: Props) {
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleArticle = (articleId: number) => {
        setExpandedArticle(expandedArticle === articleId ? null : articleId);
    };

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'pinjaman':
                return '💰';
            case 'pembayaran':
                return '💳';
            case 'akun':
                return '👤';
            case 'keamanan':
                return '🔒';
            default:
                return '❓';
        }
    };

    const getCategoryName = (category: string) => {
        switch (category.toLowerCase()) {
            case 'general':
                return 'Umum';
            case 'pinjaman':
                return 'Pinjaman';
            case 'pembayaran':
                return 'Pembayaran';
            case 'akun':
                return 'Akun';
            case 'keamanan':
                return 'Keamanan';
            default:
                return category.charAt(0).toUpperCase() + category.slice(1);
        }
    };

    return (
        <>
            <Head title="❓ FAQ - Bantuan" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm px-4 py-3">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <div className="flex items-center space-x-3">
                            <Link 
                                href="/"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ← Kembali
                            </Link>
                            <span className="font-bold text-lg text-gray-800">❓ FAQ</span>
                        </div>
                    </div>
                </header>

                <div className="max-w-md mx-auto bg-white min-h-screen">
                    {/* Search Bar */}
                    <div className="p-4 border-b">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari pertanyaan..."
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                            <span className="absolute left-3 top-3 text-gray-500">🔍</span>
                        </div>
                    </div>

                    {/* Categories */}
                    {categories.length > 0 && (
                        <div className="p-4 border-b">
                            <h2 className="font-bold mb-3">Kategori</h2>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/faq"
                                    className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                                        current_category === 'general'
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    📋 Semua
                                </Link>
                                {categories.map((category) => (
                                    <Link
                                        key={category}
                                        href={`/faq?category=${category}`}
                                        className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                                            current_category === category
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        {getCategoryIcon(category)} {getCategoryName(category)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ Articles */}
                    <div className="p-4">
                        {filteredArticles.length > 0 ? (
                            <div className="space-y-3">
                                {filteredArticles.map((article) => (
                                    <div
                                        key={article.id}
                                        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleArticle(article.id)}
                                            className="w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-start space-x-3">
                                                    <span className="text-lg mt-0.5">
                                                        {getCategoryIcon(article.category)}
                                                    </span>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900 mb-1">
                                                            {article.title}
                                                        </h3>
                                                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                            {getCategoryName(article.category)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`transform transition-transform ${
                                                        expandedArticle === article.id ? 'rotate-180' : ''
                                                    }`}
                                                >
                                                    ▼
                                                </span>
                                            </div>
                                        </button>
                                        
                                        {expandedArticle === article.id && (
                                            <div className="px-4 pb-4 border-t border-gray-100">
                                                <div className="pt-3">
                                                    <div className="prose prose-sm max-w-none text-gray-700">
                                                        {article.content.split('\n').map((paragraph, index) => (
                                                            <p key={index} className="mb-2">
                                                                {paragraph}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">🤔</div>
                                <h3 className="font-bold text-lg mb-2">Tidak Ditemukan</h3>
                                <p className="text-gray-600 mb-4">
                                    {searchQuery
                                        ? `Tidak ada artikel yang cocok dengan "${searchQuery}"`
                                        : 'Belum ada artikel FAQ untuk kategori ini'
                                    }
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Hapus Pencarian
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Help Section */}
                    <div className="p-4 border-t-8 border-gray-100">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <div className="text-2xl mb-2">💬</div>
                            <h3 className="font-bold mb-2">Butuh Bantuan Lebih Lanjut?</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Tim customer service kami siap membantu Anda 24/7
                            </p>
                            <button
                                onClick={() => {
                                    const message = encodeURIComponent(
                                        'Halo, saya butuh bantuan terkait aplikasi pinjaman. Mohon bantuannya.'
                                    );
                                    window.open(`https://wa.me/+6281234567890?text=${message}`, '_blank');
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center mx-auto"
                            >
                                <span className="mr-2">📱</span>
                                Hubungi WhatsApp CS
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bg-white border-t px-6 py-4 sticky bottom-0">
                    <div className="grid grid-cols-4 gap-4 text-center max-w-md mx-auto">
                        <Link 
                            href="/"
                            className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                        >
                            <span className="text-lg mb-1">🏠</span>
                            <span className="text-xs font-medium">Home</span>
                        </Link>
                        <Link 
                            href="/wallet"
                            className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                        >
                            <span className="text-lg mb-1">💰</span>
                            <span className="text-xs font-medium">Dompet</span>
                        </Link>
                        <div className="flex flex-col items-center">
                            <span className="text-blue-600 text-lg mb-1">❓</span>
                            <span className="text-xs font-medium text-blue-600">FAQ</span>
                        </div>
                        <Link 
                            href="/profile"
                            className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                        >
                            <span className="text-lg mb-1">👤</span>
                            <span className="text-xs font-medium">Profil</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}