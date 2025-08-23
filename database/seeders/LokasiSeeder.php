<?php

namespace Database\Seeders;

use App\Models\Kecamatan;
use App\Models\Kota;
use App\Models\Provinsi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LokasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
     {
        // Contoh data
        $provinsiData = [
            [
                'nama' => 'Jawa Barat',
                'kota' => [
                    [
                        'nama' => 'Bandung',
                        'kecamatan' => ['Coblong', 'Sukajadi', 'Lengkong']
                    ],
                    [
                        'nama' => 'Bekasi',
                        'kecamatan' => ['Bekasi Barat', 'Bekasi Timur', 'Medan Satria']
                    ],
                ]
            ],
            [
                'nama' => 'Jawa Timur',
                'kota' => [
                    [
                        'nama' => 'Surabaya',
                        'kecamatan' => ['Wonokromo', 'Rungkut', 'Tegalsari']
                    ],
                    [
                        'nama' => 'Malang',
                        'kecamatan' => ['Lowokwaru', 'Klojen', 'Sukun']
                    ],
                ]
            ],
        ];

        foreach ($provinsiData as $provinsi) {
            $prov = Provinsi::create(['nama' => $provinsi['nama']]);

            foreach ($provinsi['kota'] as $kota) {
                $city = Kota::create([
                    'provinsi_id' => $prov->id,
                    'nama' => $kota['nama']
                ]);

                foreach ($kota['kecamatan'] as $kec) {
                    Kecamatan::create([
                        'kota_id' => $city->id,
                        'nama' => $kec
                    ]);
                }
            }
        }
    }
}
