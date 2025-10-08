<?php

namespace Database\Seeders;

use App\Models\Faskes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaskesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Faskes::create([
            'provinsi_id' => 1,
            'kota_id' => 1,
            'kecamatan_id' => 1,
            'profile_pic_url' => 'https://via.placeholder.com/150',
            'nama' => 'Puskesmas Melati',
            'deskripsi' => 'Puskesmas Melati adalah fasilitas kesehatan yang menyediakan layanan kesehatan primer untuk masyarakat sekitar.',
            'tipe_faskes' => 'Puskesmas',
            'alamat' => 'Jl. Melati No. 123, Jakarta',
            
        ]);
    }
}
