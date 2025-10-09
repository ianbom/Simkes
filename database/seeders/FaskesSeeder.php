<?php

namespace Database\Seeders;

use App\Models\Faskes;
use Illuminate\Database\Seeder;

class FaskesSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk tabel faskes.
     */
    public function run(): void
    {
        $faskesData = [
            [
                'nama' => 'Puskesmas Surabaya Selatan',
                'tipe_faskes' => 'Puskesmas',
                'alamat' => 'Jl. Raya Wonokromo No. 45, Surabaya',
                'provinsi_id' => 1,
                'kota_id' => 1,
                'kecamatan_id' => 3,
                'latitude' => -7.3087,
                'longitude' => 112.7378,
                'profile_pic_url' => '/assets/images/hospital.png',
                'deskripsi' => 'Puskesmas dengan layanan kesehatan umum dan gizi anak di kawasan Surabaya Selatan.',
            ],
            [
                'nama' => 'Klinik Sehat Bersama',
                'tipe_faskes' => 'Klinik',
                'alamat' => 'Jl. Diponegoro No. 12, Surabaya',
                'provinsi_id' => 1,
                'kota_id' => 1,
                'kecamatan_id' => 5,
                'latitude' => -7.2906,
                'longitude' => 112.7351,
                'profile_pic_url' => '/assets/images/hospital.png',
                'deskripsi' => 'Klinik pratama dengan layanan rawat jalan dan laboratorium sederhana.',
            ],
            [
                'nama' => 'RSIA Kasih Ibu',
                'tipe_faskes' => 'RSIA',
                'alamat' => 'Jl. Pahlawan No. 20, Gresik',
                'provinsi_id' => 1,
                'kota_id' => 2,
                'kecamatan_id' => 7,
                'latitude' => -7.1564,
                'longitude' => 112.6552,
                'profile_pic_url' => '/assets/images/hospital.png',
                'deskripsi' => 'Rumah sakit ibu dan anak yang menyediakan layanan persalinan dan neonatal.',
            ],
            [
                'nama' => 'RSUD Mojokerto',
                'tipe_faskes' => 'RSUD',
                'alamat' => 'Jl. Gajah Mada No. 30, Mojokerto',
                'provinsi_id' => 2,
                'kota_id' => 3,
                'kecamatan_id' => 9,
                'latitude' => -7.4722,
                'longitude' => 112.4427,
                'profile_pic_url' => '/assets/images/hospital.png',
                'deskripsi' => 'Rumah sakit daerah dengan layanan rawat inap, gawat darurat, dan bedah umum.',
            ],
            [
                'nama' => 'Posyandu Melati Indah',
                'tipe_faskes' => 'Posyandu',
                'alamat' => 'Jl. Anggrek No. 5, Sidoarjo',
                'provinsi_id' => 2,
                'kota_id' => 4,
                'kecamatan_id' => 11,
                'latitude' => -7.4512,
                'longitude' => 112.7173,
                'profile_pic_url' => '/assets/images/hospital.png',
                'deskripsi' => 'Posyandu aktif untuk pelayanan imunisasi dan kesehatan ibu-anak.',
            ],
        ];

        Faskes::insert($faskesData);
    }
}
