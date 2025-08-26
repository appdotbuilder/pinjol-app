import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

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
}

interface Props {
    user: User;
    profile?: UserProfile;
    [key: string]: unknown;
}

interface ProfileFormData {
    phone: string;
    nik: string;
    full_name: string;
    address: string;
    job: string;
    monthly_income: string;
    bank_name: string;
    bank_account: string;
    ktp_photo: File | null;
    selfie_photo: File | null;
    signature: File | null;
    [key: string]: string | boolean | File | null | undefined;
}

export default function ProfileVerify({ user, profile }: Props) {
    const [currentStep, setCurrentStep] = useState(1);
    const [ktpPreview, setKtpPreview] = useState<string | null>(null);
    const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, progress } = useForm<ProfileFormData>({
        phone: profile?.phone || '',
        nik: profile?.nik || '',
        full_name: profile?.full_name || user.name,
        address: profile?.address || '',
        job: profile?.job || '',
        monthly_income: profile?.monthly_income || '',
        bank_name: profile?.bank_name || '',
        bank_account: profile?.bank_account || '',
        ktp_photo: null,
        selfie_photo: null,
        signature: null,
    });

    const handleFileChange = (field: 'ktp_photo' | 'selfie_photo' | 'signature', file: File | null) => {
        setData(field, file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                switch (field) {
                    case 'ktp_photo':
                        setKtpPreview(result);
                        break;
                    case 'selfie_photo':
                        setSelfiePreview(result);
                        break;
                    case 'signature':
                        setSignaturePreview(result);
                        break;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/profile', {
            forceFormData: true,
        });
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const formatCurrency = (value: string) => {
        const number = value.replace(/[^\d]/g, '');
        return new Intl.NumberFormat('id-ID').format(Number(number));
    };

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        setData('monthly_income', rawValue);
    };

    return (
        <>
            <Head title="✅ Verifikasi Identitas" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm px-4 py-3">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        <div className="flex items-center space-x-3">
                            <Link 
                                href="/profile"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ← Kembali
                            </Link>
                            <span className="font-bold text-lg text-gray-800">✅ Verifikasi</span>
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {currentStep}/3
                        </div>
                    </div>
                </header>

                <div className="max-w-md mx-auto bg-white min-h-screen">
                    {/* Progress Bar */}
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress Verifikasi</span>
                            <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4">
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <span className="text-4xl mb-2 block">📋</span>
                                    <h2 className="text-xl font-bold">Data Pribadi</h2>
                                    <p className="text-gray-600 text-sm">Lengkapi informasi dasar Anda</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Nomor HP *
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="08xxxxxxxxxx"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        NIK (16 digit) *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nik}
                                        onChange={(e) => setData('nik', e.target.value)}
                                        placeholder="1234567890123456"
                                        maxLength={16}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        placeholder="Masukkan nama sesuai KTP"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Alamat Lengkap *
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Masukkan alamat sesuai KTP"
                                        rows={3}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                                        required
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Employment & Banking */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <span className="text-4xl mb-2 block">💼</span>
                                    <h2 className="text-xl font-bold">Pekerjaan & Bank</h2>
                                    <p className="text-gray-600 text-sm">Informasi pekerjaan dan rekening bank</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Pekerjaan *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.job}
                                        onChange={(e) => setData('job', e.target.value)}
                                        placeholder="Contoh: Karyawan Swasta"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.job && <p className="text-red-500 text-xs mt-1">{errors.job}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Penghasilan Per Bulan *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                                        <input
                                            type="text"
                                            value={formatCurrency(data.monthly_income)}
                                            onChange={handleIncomeChange}
                                            placeholder="1,000,000"
                                            className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Minimum Rp 1,000,000</p>
                                    {errors.monthly_income && <p className="text-red-500 text-xs mt-1">{errors.monthly_income}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Nama Bank *
                                    </label>
                                    <select
                                        value={data.bank_name}
                                        onChange={(e) => setData('bank_name', e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Pilih Bank</option>
                                        <option value="BCA">BCA</option>
                                        <option value="BNI">BNI</option>
                                        <option value="BRI">BRI</option>
                                        <option value="Mandiri">Mandiri</option>
                                        <option value="CIMB Niaga">CIMB Niaga</option>
                                        <option value="Danamon">Danamon</option>
                                        <option value="Permata">Permata</option>
                                        <option value="BTN">BTN</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {errors.bank_name && <p className="text-red-500 text-xs mt-1">{errors.bank_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Nomor Rekening *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.bank_account}
                                        onChange={(e) => setData('bank_account', e.target.value)}
                                        placeholder="1234567890"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.bank_account && <p className="text-red-500 text-xs mt-1">{errors.bank_account}</p>}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Document Upload */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <span className="text-4xl mb-2 block">📸</span>
                                    <h2 className="text-xl font-bold">Upload Dokumen</h2>
                                    <p className="text-gray-600 text-sm">Unggah foto dokumen yang diperlukan</p>
                                </div>

                                {/* KTP Photo */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Foto KTP *
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        {ktpPreview ? (
                                            <div className="text-center">
                                                <img 
                                                    src={ktpPreview} 
                                                    alt="KTP Preview" 
                                                    className="w-full max-w-sm mx-auto rounded-lg mb-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleFileChange('ktp_photo', null)}
                                                    className="text-red-500 text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <span className="text-4xl mb-2 block">🆔</span>
                                                <p className="text-sm text-gray-600 mb-2">Foto KTP yang jelas dan tidak blur</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange('ktp_photo', e.target.files?.[0] || null)}
                                                    className="hidden"
                                                    id="ktp-input"
                                                    required
                                                />
                                                <label
                                                    htmlFor="ktp-input"
                                                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                                                >
                                                    Pilih File
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    {errors.ktp_photo && <p className="text-red-500 text-xs mt-1">{errors.ktp_photo}</p>}
                                </div>

                                {/* Selfie Photo */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Selfie dengan KTP *
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        {selfiePreview ? (
                                            <div className="text-center">
                                                <img 
                                                    src={selfiePreview} 
                                                    alt="Selfie Preview" 
                                                    className="w-full max-w-sm mx-auto rounded-lg mb-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleFileChange('selfie_photo', null)}
                                                    className="text-red-500 text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <span className="text-4xl mb-2 block">🤳</span>
                                                <p className="text-sm text-gray-600 mb-2">Foto diri dengan memegang KTP</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange('selfie_photo', e.target.files?.[0] || null)}
                                                    className="hidden"
                                                    id="selfie-input"
                                                    required
                                                />
                                                <label
                                                    htmlFor="selfie-input"
                                                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                                                >
                                                    Pilih File
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    {errors.selfie_photo && <p className="text-red-500 text-xs mt-1">{errors.selfie_photo}</p>}
                                </div>

                                {/* Signature */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Tanda Tangan Digital *
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                        {signaturePreview ? (
                                            <div className="text-center">
                                                <img 
                                                    src={signaturePreview} 
                                                    alt="Signature Preview" 
                                                    className="w-full max-w-xs mx-auto rounded-lg mb-2 bg-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleFileChange('signature', null)}
                                                    className="text-red-500 text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <span className="text-4xl mb-2 block">✍️</span>
                                                <p className="text-sm text-gray-600 mb-2">Foto tanda tangan di kertas putih</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange('signature', e.target.files?.[0] || null)}
                                                    className="hidden"
                                                    id="signature-input"
                                                    required
                                                />
                                                <label
                                                    htmlFor="signature-input"
                                                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                                                >
                                                    Pilih File
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    {errors.signature && <p className="text-red-500 text-xs mt-1">{errors.signature}</p>}
                                </div>

                                {/* Upload Progress */}
                                {progress && (
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Mengupload...</span>
                                            <span className="text-sm text-gray-500">{progress.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${progress.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex space-x-3 pt-6">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
                                >
                                    Sebelumnya
                                </button>
                            )}
                            
                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                                >
                                    Lanjutkan
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan & Verifikasi'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}