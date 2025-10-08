<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Anak;
use App\Models\PemeriksaanAnak;
use Carbon\Carbon;

class PemeriksaanAnakSeeder extends Seeder
{
    public function run(): void
    {
        $anakList = Anak::all();

        if ($anakList->isEmpty()) {
            $this->command->warn("⚠️ Tidak ada data anak. Jalankan AnakSeeder terlebih dahulu.");
            return;
        }

        foreach ($anakList as $anak) {
            // Pastikan tanggal lahir ada
            if (!$anak->tanggal_lahir) {
                continue;
            }

            for ($usia = 0; $usia <= 24; $usia++) {
                $tanggalPemeriksaan = Carbon::parse($anak->tanggal_lahir)->addMonths($usia);

                // Jika tanggal pemeriksaan melewati hari ini, hentikan loop
                if ($tanggalPemeriksaan->greaterThan(now())) {
                    break;
                }

                // $jenisKunjungan = $usia % 6 === 0 ? 'Sakit' : 'Rutin'; // contoh variasi tiap 6 bulan

                // Estimasi nilai antropometri
                $berat = $this->beratBadanPerBulan($usia);
                $tinggi = $this->tinggiBadanPerBulan($usia);
                $lingkar = $this->lingkarKepalaPerBulan($usia);

                PemeriksaanAnak::create([
                    'anak_id' => $anak->id,
                    'petugas_faskes_id' => 1,
                    'jenis_kunjungan' => 'Rutin',
                    'tanggal_pemeriksaan' => $tanggalPemeriksaan->format('Y-m-d'),
                    'usia_saat_periksa_bulan' => $usia,

                    'berat_badan_kg' => round($berat, 2),
                    'tinggi_badan_cm' => round($tinggi, 1),
                    'lingkar_kepala_cm' => round($lingkar, 1),
                    'cara_ukur_tinggi' => $usia < 24 ? 'Berbaring' : 'Berdiri',

                    'suhu_tubuh_celsius' => fake()->randomFloat(1, 36.5, 37.8),
                    'frekuensi_napas_per_menit' => fake()->numberBetween(25, 40),
                    'frekuensi_jantung_per_menit' => fake()->numberBetween(100, 150),
                    'saturasi_oksigen_persen' => fake()->numberBetween(95, 100),

                    'perkembangan_motorik' => fake()->sentence(),
                    'perkembangan_kognitif' => fake()->sentence(),
                    'perkembangan_emosional' => fake()->sentence(),
                    'catatan_pemeriksaan' => fake()->sentence(),
                ]);
            }
        }

        $this->command->info('✅ Seeder Pemeriksaan Anak selesai (0–24 bulan untuk setiap anak).');
    }

    private function beratBadanPerBulan(int $usia): float
    {
        // Estimasi berat badan (kg) sesuai WHO Growth Chart
        if ($usia == 0) return 3.3;
        if ($usia <= 6) return 3.3 + ($usia * 0.7);       // 0–6 bulan
        if ($usia <= 12) return 7.5 + (($usia - 6) * 0.4); // 6–12 bulan
        return 10 + (($usia - 12) * 0.25);                // 12–24 bulan
    }

    private function tinggiBadanPerBulan(int $usia): float
    {
        // Estimasi tinggi badan (cm)
        if ($usia == 0) return 50.0;
        if ($usia <= 6) return 50 + ($usia * 2.5);
        if ($usia <= 12) return 65 + (($usia - 6) * 1.5);
        return 74 + (($usia - 12) * 1.0);
    }

    private function lingkarKepalaPerBulan(int $usia): float
    {
        // Estimasi lingkar kepala (cm)
        if ($usia == 0) return 34.0;
        if ($usia <= 6) return 34 + ($usia * 0.6);
        if ($usia <= 12) return 37.5 + (($usia - 6) * 0.4);
        return 40 + (($usia - 12) * 0.2);
    }
}
