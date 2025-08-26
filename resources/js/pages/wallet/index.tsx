import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface Wallet {
    id: number;
    balance: string;
    total_received: string;
    total_withdrawn: string;
}

interface Withdrawal {
    id: number;
    amount: string;
    status: string;
    created_at: string;
    processed_at?: string;
}

interface Props {
    wallet: Wallet;
    recent_withdrawals: Withdrawal[];
    whatsapp_cs: string;
    [key: string]: unknown;
}

export default function WalletIndex({ wallet, recent_withdrawals, whatsapp_cs }: Props) {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [processing, setProcessing] = useState(false);

    const formatCurrency = (amount: string | number) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(num);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'processing':
                return 'text-blue-600 bg-blue-100';
            case 'failed':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-yellow-600 bg-yellow-100';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Selesai';
            case 'processing':
                return 'Diproses';
            case 'failed':
                return 'Gagal';
            default:
                return 'Menunggu';
        }
    };

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/wallet/withdraw', {
            amount: parseFloat(withdrawAmount),
            verification_code: verificationCode,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowWithdrawModal(false);
                setWithdrawAmount('');
                setVerificationCode('');
            },
            onFinish: () => setProcessing(false),
        });
    };

    const openWhatsApp = () => {
        const message = encodeURIComponent(
            `Halo, saya ingin menanyakan tentang penarikan dana saya. Mohon bantuannya.`
        );
        window.open(`https://wa.me/${whatsapp_cs}?text=${message}`, '_blank');
    };

    return (
        <>
            <Head title="💰 Dompet Saya" />
            
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
                            <span className="font-bold text-lg text-gray-800">💰 Dompet</span>
                        </div>
                        <button
                            onClick={openWhatsApp}
                            className="text-green-600 hover:text-green-700"
                        >
                            📱 CS
                        </button>
                    </div>
                </header>

                <div className="max-w-md mx-auto bg-white min-h-screen">
                    {/* Balance Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                        <div className="text-center">
                            <p className="text-sm opacity-90 mb-1">Saldo Aktif</p>
                            <h1 className="text-3xl font-bold mb-4">{formatCurrency(wallet.balance)}</h1>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-white/10 rounded-lg p-3">
                                    <p className="opacity-75">Total Diterima</p>
                                    <p className="font-bold">{formatCurrency(wallet.total_received)}</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3">
                                    <p className="opacity-75">Total Ditarik</p>
                                    <p className="font-bold">{formatCurrency(wallet.total_withdrawn)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4">
                        <button
                            onClick={() => setShowWithdrawModal(true)}
                            disabled={parseFloat(wallet.balance) <= 0}
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <span className="mr-2">💸</span>
                            Tarik Dana
                        </button>
                        
                        <button
                            onClick={openWhatsApp}
                            className="w-full mt-3 bg-white border-2 border-green-500 text-green-600 py-3 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center"
                        >
                            <span className="mr-2">💬</span>
                            Hubungi CS WhatsApp
                        </button>
                    </div>

                    {/* Recent Withdrawals */}
                    {recent_withdrawals.length > 0 && (
                        <div className="p-4 border-t-8 border-gray-100">
                            <h2 className="font-bold mb-4 flex items-center">
                                <span className="mr-2">📋</span>
                                Riwayat Penarikan
                            </h2>
                            <div className="space-y-3">
                                {recent_withdrawals.map((withdrawal) => (
                                    <div key={withdrawal.id} className="bg-white border rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium">{formatCurrency(withdrawal.amount)}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                                                {getStatusText(withdrawal.status)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {formatDate(withdrawal.created_at)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {parseFloat(wallet.balance) <= 0 && recent_withdrawals.length === 0 && (
                        <div className="p-8 text-center">
                            <div className="text-6xl mb-4">💰</div>
                            <h3 className="font-bold text-lg mb-2">Dompet Masih Kosong</h3>
                            <p className="text-gray-600 mb-4">
                                Ajukan pinjaman untuk mendapatkan dana di dompet Anda
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                            >
                                Ajukan Pinjaman
                            </Link>
                        </div>
                    )}
                </div>

                {/* Withdraw Modal */}
                {showWithdrawModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
                        <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">💸 Tarik Dana</h3>
                                <button
                                    onClick={() => setShowWithdrawModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleWithdraw} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Jumlah Penarikan
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            placeholder="Minimum 50,000"
                                            min="50000"
                                            max={parseFloat(wallet.balance)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                            required
                                        />
                                        <span className="absolute right-3 top-3 text-gray-500">IDR</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maksimal: {formatCurrency(wallet.balance)}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Kode Verifikasi
                                    </label>
                                    <input
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        placeholder="Masukkan kode 4-8 digit"
                                        minLength={4}
                                        maxLength={8}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Masukkan kode verifikasi yang Anda buat
                                    </p>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowWithdrawModal(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300"
                                    >
                                        {processing ? 'Memproses...' : 'Tarik Dana'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

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
                        <div className="flex flex-col items-center">
                            <span className="text-blue-600 text-lg mb-1">💰</span>
                            <span className="text-xs font-medium text-blue-600">Dompet</span>
                        </div>
                        <Link 
                            href="/faq"
                            className="flex flex-col items-center text-gray-500 hover:text-blue-600"
                        >
                            <span className="text-lg mb-1">❓</span>
                            <span className="text-xs font-medium">FAQ</span>
                        </Link>
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