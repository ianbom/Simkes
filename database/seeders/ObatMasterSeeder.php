<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ObatMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('obat_master')->insert([
            // Obat & Suplemen untuk Ibu Hamil
            [
                'nama_obat' => 'Asam Folat',
                'jenis' => 'Vitamin',
                'deskripsi' => 'Suplemen penting untuk ibu hamil guna mencegah cacat tabung saraf pada janin.',
            ],
            [
                'nama_obat' => 'Vitamin Prenatal',
                'jenis' => 'Vitamin',
                'deskripsi' => 'Kombinasi vitamin dan mineral esensial untuk kesehatan ibu hamil dan perkembangan janin.',
            ],
            [
                'nama_obat' => 'Zat Besi',
                'jenis' => 'Mineral',
                'deskripsi' => 'Mencegah anemia pada ibu hamil akibat kekurangan zat besi.',
            ],
            [
                'nama_obat' => 'Kalsium',
                'jenis' => 'Mineral',
                'deskripsi' => 'Membantu pembentukan tulang dan gigi janin serta mencegah osteoporosis pada ibu hamil.',
            ],

            // Obat & Suplemen untuk Balita
            [
                'nama_obat' => 'Paracetamol Sirup Anak',
                'jenis' => 'Obat',
                'deskripsi' => 'Digunakan untuk menurunkan demam dan meredakan nyeri pada anak dan balita.',
            ],
            [
                'nama_obat' => 'Vitamin D Tetes',
                'jenis' => 'Vitamin',
                'deskripsi' => 'Membantu pertumbuhan tulang dan gigi anak serta mencegah rakhitis.',
            ],
            [
                'nama_obat' => 'Vitamin A',
                'jenis' => 'Vitamin',
                'deskripsi' => 'Meningkatkan daya tahan tubuh anak serta mendukung kesehatan mata.',
            ],
            [
                'nama_obat' => 'Zinc Sirup',
                'jenis' => 'Mineral',
                'deskripsi' => 'Membantu pemulihan anak dari diare dan meningkatkan daya tahan tubuh.',
            ],
        ]);
    }
}
