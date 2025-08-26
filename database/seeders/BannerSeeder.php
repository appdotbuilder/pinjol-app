<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        Banner::create([
            'title' => 'Pinjaman Cepat & Mudah',
            'description' => 'Dapatkan dana tunai hingga 10 juta dengan proses approval yang cepat',
            'image' => '/images/banner1.jpg',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        Banner::create([
            'title' => 'Bunga Rendah 0.8% per Hari',
            'description' => 'Bunga kompetitif dengan tenor fleksibel mulai dari 1 bulan',
            'image' => '/images/banner2.jpg',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        Banner::create([
            'title' => 'Tanpa Jaminan & Ribet',
            'description' => 'Cukup dengan KTP dan selfie, dana langsung cair ke rekening Anda',
            'image' => '/images/banner3.jpg',
            'is_active' => true,
            'sort_order' => 3,
        ]);
    }
}