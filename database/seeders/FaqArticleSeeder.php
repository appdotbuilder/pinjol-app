<?php

namespace Database\Seeders;

use App\Models\FaqArticle;
use Illuminate\Database\Seeder;

class FaqArticleSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // General FAQs
        FaqArticle::create([
            'title' => 'Apa itu PinjamanKu?',
            'content' => 'PinjamanKu adalah platform pinjaman online yang memberikan solusi finansial cepat dan mudah untuk kebutuhan dana tunai Anda. Kami menyediakan pinjaman hingga 10 juta rupiah dengan proses approval yang cepat dan syarat yang mudah.',
            'category' => 'general',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        FaqArticle::create([
            'title' => 'Siapa yang bisa mengajukan pinjaman?',
            'content' => 'Syarat pengajuan pinjaman:\n• WNI berusia 21-55 tahun\n• Memiliki KTP yang masih berlaku\n• Memiliki penghasilan tetap minimal Rp 1,000,000\n• Memiliki rekening bank aktif\n• Belum pernah masuk daftar hitam BI Checking',
            'category' => 'general',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        // Loan FAQs
        FaqArticle::create([
            'title' => 'Berapa jumlah pinjaman yang bisa diajukan?',
            'content' => 'Jumlah pinjaman yang tersedia:\n• Minimum: Rp 500,000\n• Maximum: Rp 10,000,000\n\nJumlah pinjaman yang disetujui akan disesuaikan dengan profil dan kemampuan pembayaran Anda.',
            'category' => 'pinjaman',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        FaqArticle::create([
            'title' => 'Berapa lama tenor pinjaman?',
            'content' => 'Tenor pinjaman yang tersedia:\n• 1 bulan\n• 3 bulan\n• 6 bulan\n• 12 bulan\n\nAnda bisa memilih tenor sesuai dengan kemampuan pembayaran bulanan Anda.',
            'category' => 'pinjaman',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        FaqArticle::create([
            'title' => 'Berapa bunga pinjaman?',
            'content' => 'Bunga pinjaman mulai dari 0.8% per hari atau setara dengan 24% per bulan. Bunga bersifat flat dan sudah termasuk biaya administrasi. Tidak ada biaya tersembunyi lainnya.',
            'category' => 'pinjaman',
            'is_active' => true,
            'sort_order' => 3,
        ]);

        // Payment FAQs
        FaqArticle::create([
            'title' => 'Bagaimana cara pembayaran pinjaman?',
            'content' => 'Cara pembayaran pinjaman:\n• Transfer ke rekening yang akan diberikan\n• Melalui ATM, mobile banking, atau internet banking\n• Pembayaran sebelum jatuh tempo\n• Notifikasi pembayaran akan dikirim via WhatsApp',
            'category' => 'pembayaran',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        FaqArticle::create([
            'title' => 'Apa yang terjadi jika terlambat bayar?',
            'content' => 'Konsekuensi keterlambatan pembayaran:\n• Denda keterlambatan 5% per hari dari jumlah tagihan\n• Maksimal denda 100% dari pokok pinjaman\n• Data masuk ke sistem BI Checking\n• Kesulitan mendapatkan pinjaman di masa depan\n\nSilakan hubungi customer service jika mengalami kesulitan pembayaran.',
            'category' => 'pembayaran',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        // Account FAQs
        FaqArticle::create([
            'title' => 'Bagaimana cara mendaftar akun?',
            'content' => 'Langkah pendaftaran:\n1. Download aplikasi atau buka website\n2. Klik "Daftar" dan masukkan nomor HP\n3. Buat password yang aman\n4. Verifikasi dengan kode OTP (jika diperlukan)\n5. Lengkapi data profil dan dokumen\n6. Tunggu proses verifikasi admin',
            'category' => 'akun',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        FaqArticle::create([
            'title' => 'Berapa lama proses verifikasi?',
            'content' => 'Proses verifikasi biasanya memakan waktu:\n• Verifikasi otomatis: 5-15 menit\n• Verifikasi manual: 1-24 jam\n• Jika dokumen tidak lengkap: hingga 3 hari kerja\n\nAnda akan mendapat notifikasi status verifikasi melalui WhatsApp atau email.',
            'category' => 'akun',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        // Security FAQs
        FaqArticle::create([
            'title' => 'Apakah data pribadi saya aman?',
            'content' => 'Keamanan data terjamin:\n• Data dienkripsi dengan teknologi SSL 256-bit\n• Server berlokasi di Indonesia dengan sertifikat ISO 27001\n• Tidak membagikan data ke pihak ketiga tanpa izin\n• Compliance dengan regulasi OJK dan BI\n• Tim security monitoring 24/7',
            'category' => 'keamanan',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        FaqArticle::create([
            'title' => 'Bagaimana jika saya lupa password?',
            'content' => 'Cara reset password:\n1. Klik "Lupa Password" di halaman login\n2. Masukkan nomor HP yang terdaftar\n3. Tunggu kode verifikasi via SMS\n4. Masukkan kode verifikasi\n5. Buat password baru yang aman\n6. Login dengan password baru',
            'category' => 'keamanan',
            'is_active' => true,
            'sort_order' => 2,
        ]);
    }
}