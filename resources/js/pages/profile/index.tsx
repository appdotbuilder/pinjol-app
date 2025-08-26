import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserProfile {
    id: number;
    phone: string;
    nik?: string;
    full_name?: string;
    address?: string;
    job?: string;
    monthly_income?: string;
    bank_name?: string;
    bank_account?: string;
    is_verified: boolean;
    verified_at?: string;
}

interface Props {
    user: User;
    profile?: UserProfile;
    [key: string]: unknown;
}

export default function ProfileIndex({ user, profile }: Props) {
    const formatCurrency = (amount: string | number | undefined) => {
        if (!amount) return 'Belum diisi';
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(num);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const getVerificationStatus = () => {
        if (!profile) {
            return {
                icon: '⚠️',
                text: 'Belum Lengkap',
                color: 'text-red-600 bg-red-100',
                description: 'Lengkapi data untuk verifikasi'
            };
        }

        if (profile.is_verified) {
            return {
                icon: '✅',
                text: 'Terverifikasi',
                color: 'text-green-600 bg-green-100',
                description: 'Identitas Anda sudah terverifikasi'
            };
        }

        return {
            icon: '⏳',
            text: 'Menunggu Verifikasi',
            color: 'text-yellow-600 bg-yellow-100',
            description: 'Data sedang diverifikasi admin'
        };
    };

    const status = getVerificationStatus();

    return (
        <>
            <Head title="👤 Profil Saya" />
            
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
                            <span className="font-bold text-lg text-gray-800">👤 Profil</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                            Keluar
                        </button>
                    </div>
                </header>

                <div className="max-w-md mx-auto bg-white min-h-screen">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">👤</span>
                        </div>
                        <h1 className="text-xl font-bold mb-1">{profile?.full_name || user.name}</h1>
                        <p className="text-sm opacity-90">{user.email}</p>
                        
                        <div className="mt-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                <span className="mr-1">{status.icon}</span>
                                {status.text}
                            </span>
                        </div>
                    </div>

                    {/* Verification Status */}
                    <div className="p-4 border-b">
                        <div className="flex items-start space-x-3">
                            <span className="text-2xl">{status.icon}</span>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{status.text}</h3>
                                <p className="text-sm text-gray-600 mt-1">{status.description}</p>
                                {!profile?.is_verified && (
                                    <Link
                                        href="/profile/verify"
                                        className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                                    >
                                        {!profile ? 'Lengkapi Data' : 'Perbarui Data'}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="p-4">
                        <h2 className="font-bold mb-4 flex items-center">
                            <span className="mr-2">📋</span>
                            Informasi Pribadi
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-blue-600">📱</span>
                                    <div>
                                        <p className="font-medium text-sm">Nomor HP</p>
                                        <p className="text-gray-600 text-sm">{profile?.phone || 'Belum diisi'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-600">🆔</span>
                                    <div>
                                        <p className="font-medium text-sm">NIK</p>
                                        <p className="text-gray-600 text-sm">
                                            {profile?.nik ? `****${profile.nik.slice(-4)}` : 'Belum diisi'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-purple-600">🏠</span>
                                    <div>
                                        <p className="font-medium text-sm">Alamat</p>
                                        <p className="text-gray-600 text-sm">
                                            {profile?.address ? 
                                                `${profile.address.substring(0, 30)}${profile.address.length > 30 ? '...' : ''}` 
                                                : 'Belum diisi'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-orange-600">💼</span>
                                    <div>
                                        <p className="font-medium text-sm">Pekerjaan</p>
                                        <p className="text-gray-600 text-sm">{profile?.job || 'Belum diisi'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-green-600">💰</span>
                                    <div>
                                        <p className="font-medium text-sm">Penghasilan</p>
                                        <p className="text-gray-600 text-sm">{formatCurrency(profile?.monthly_income)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <span className="text-blue-600">🏦</span>
                                    <div>
                                        <p className="font-medium text-sm">Bank</p>
                                        <p className="text-gray-600 text-sm">
                                            {profile?.bank_name ? 
                                                `${profile.bank_name} - ****${profile.bank_account?.slice(-4)}` 
                                                : 'Belum diisi'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t-8 border-gray-100">
                        <div className="space-y-3">
                            <Link
                                href="/profile/verify"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
                            >
                                <span className="mr-2">✏️</span>
                                {!profile ? 'Lengkapi Data Profil' : 'Edit Profil'}
                            </Link>

                            <button
                                onClick={() => {
                                    const message = encodeURIComponent(
                                        'Halo, saya ingin menanyakan tentang status verifikasi profil saya. Mohon bantuannya.'
                                    );
                                    window.open(`https://wa.me/+6281234567890?text=${message}`, '_blank');
                                }}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center"
                            >
                                <span className="mr-2">💬</span>
                                Hubungi Customer Service
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 flex items-center justify-center"
                            >
                                <span className="mr-2">🚪</span>
                                Keluar dari Akun
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
                        <Link 
                            href="/faq"
                            className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                        >
                            <span className="text-lg mb-1">❓</span>
                            <span className="text-xs font-medium">FAQ</span>
                        </Link>
                        <div className="flex flex-col items-center">
                            <span className="text-blue-600 text-lg mb-1">👤</span>
                            <span className="text-xs font-medium text-blue-600">Profil</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}