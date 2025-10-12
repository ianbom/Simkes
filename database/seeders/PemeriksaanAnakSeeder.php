<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Anak;
use App\Models\PemeriksaanAnak;
use App\Models\RiwayatSakitAnak;
use App\Models\User;
use Carbon\Carbon;

class PemeriksaanAnakSeeder extends Seeder
{
    public function run(): void
    {
        $anakList = Anak::all();
        $petugasFaskes = User::where('role', 'Petugas Faskes')->first();

        if ($anakList->isEmpty()) {
            $this->command->warn("⚠️ Tidak ada data anak. Jalankan AnakSeeder terlebih dahulu.");
            return;
        }

        foreach ($anakList as $anak) {
            if (!$anak->tanggal_lahir) continue;

            // 🔹 Buat data pemeriksaan anak 0–24 bulan
            for ($usia = 0; $usia <= 24; $usia++) {
                $tanggalPemeriksaan = Carbon::parse($anak->tanggal_lahir)->addMonths($usia);

                if ($tanggalPemeriksaan->greaterThan(now())) break;

                $berat = $this->beratBadanPerBulan($usia);
                $tinggi = $this->tinggiBadanPerBulan($usia);
                $lingkar = $this->lingkarKepalaPerBulan($usia);

                PemeriksaanAnak::create([
                    'anak_id' => $anak->id,
                    'petugas_faskes_id' => $petugasFaskes->id,
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

            // 🔹 Tambahkan minimal 1 riwayat sakit anak untuk tiap anak
            $this->createRiwayatSakitAnak($anak);
        }

        $this->command->info('✅ Seeder Pemeriksaan Anak & Riwayat Sakit Anak selesai (0–24 bulan untuk setiap anak).');
    }

    /**
     * Buat 1 riwayat sakit anak secara acak untuk tiap anak.
     */
    private function createRiwayatSakitAnak(Anak $anak): void
    {
        $pemeriksaan = PemeriksaanAnak::where('anak_id', $anak->id)->inRandomOrder()->first();

        if (!$pemeriksaan) return;

        $tanggalSakit = Carbon::parse($anak->tanggal_lahir)->addMonths(rand(3, 18));

        RiwayatSakitAnak::create([
            'anak_id' => $anak->id,
            'pemeriksaan_anak_id' => $pemeriksaan->id,
            'tanggal_sakit' => $tanggalSakit->format('Y-m-d'),
            'diagnosis' => fake()->randomElement([
                'ISPA (Infeksi Saluran Pernapasan Atas)',
                'Diare Akut',
                'Demam Berdarah Dengue',
                'Campak',
                'Infeksi Kulit Ringan',
                'Bronkiolitis',
            ]),
            'gejala' => fake()->randomElement([
                'Demam tinggi dan batuk pilek',
                'Buang air besar encer lebih dari 3 kali sehari',
                'Ruam merah di seluruh tubuh',
                'Lesu dan kehilangan nafsu makan',
                'Batuk kering dan sulit bernapas',
            ]),
            'tindakan_pengobatan' => fake()->randomElement([
                'Diberikan antibiotik dan istirahat cukup',
                'Dianjurkan minum oralit dan cairan tambahan',
                'Diberikan paracetamol sesuai dosis',
                'Kontrol ulang ke Puskesmas dalam 3 hari',
                'Diberikan vitamin dan imunisasi tambahan',
            ]),
            'catatan' => fake()->optional()->sentence(),
        ]);
    }

    // ========= Estimasi Fisiologis =========

    private function beratBadanPerBulan(int $usia): float
    {
        if ($usia == 0) return 3.3;
        if ($usia <= 6) return 3.3 + ($usia * 0.7);
        if ($usia <= 12) return 7.5 + (($usia - 6) * 0.4);
        return 10 + (($usia - 12) * 0.25);
    }

    private function tinggiBadanPerBulan(int $usia): float
    {
        if ($usia == 0) return 50.0;
        if ($usia <= 6) return 50 + ($usia * 2.5);
        if ($usia <= 12) return 65 + (($usia - 6) * 1.5);
        return 74 + (($usia - 12) * 1.0);
    }

    private function lingkarKepalaPerBulan(int $usia): float
    {
        if ($usia == 0) return 34.0;
        if ($usia <= 6) return 34 + ($usia * 0.6);
        if ($usia <= 12) return 37.5 + (($usia - 6) * 0.4);
        return 40 + (($usia - 12) * 0.2);
    }
}
