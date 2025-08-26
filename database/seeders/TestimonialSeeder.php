<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        Testimonial::create([
            'name' => 'Budi Santoso',
            'content' => 'Prosesnya sangat cepat, dalam 15 menit dana sudah cair ke rekening saya. Sangat membantu untuk kebutuhan mendesak.',
            'rating' => 5,
            'location' => 'Jakarta',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        Testimonial::create([
            'name' => 'Sari Dewi',
            'content' => 'Aplikasinya mudah digunakan dan customer servicenya sangat responsif. Recommended banget!',
            'rating' => 5,
            'location' => 'Bandung',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        Testimonial::create([
            'name' => 'Andi Wijaya',
            'content' => 'Bunga yang wajar dan proses pencairannya transparan. Tidak ada biaya tersembunyi.',
            'rating' => 4,
            'location' => 'Surabaya',
            'is_active' => true,
            'sort_order' => 3,
        ]);

        Testimonial::create([
            'name' => 'Maya Sari',
            'content' => 'Terima kasih PinjamanKu, sangat membantu untuk modal usaha kecil saya. Proses mudah dan cepat.',
            'rating' => 5,
            'location' => 'Yogyakarta',
            'is_active' => true,
            'sort_order' => 4,
        ]);
    }
}