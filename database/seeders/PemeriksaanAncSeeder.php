<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kehamilan;
use App\Models\PemeriksaanAnc;
use Carbon\Carbon;

class PemeriksaanAncSeeder extends Seeder
{
    public function run(): void
    {
        $kehamilanList = Kehamilan::all();

        if ($kehamilanList->isEmpty()) {
            $this->command->warn("⚠️ Tidak ada data kehamilan. Jalankan UserSeeder terlebih dahulu.");
            return;
        }

        foreach ($kehamilanList as $kehamilan) {
            $hpht = Carbon::parse($kehamilan->hpht);
            $hpl = Carbon::parse($kehamilan->hpl);
            $lamaKehamilanMinggu = $hpht->diffInWeeks($hpl);

            // Normalnya 9 kunjungan (min 1 per bulan)
            for ($i = 1; $i <= 9; $i++) {
                $mingguKe = intval(($i - 1) * ($lamaKehamilanMinggu / 9));
                $tanggalCheckup = $hpht->copy()->addWeeks($mingguKe);

                // Tentukan trimester
                if ($mingguKe <= 12) {
                    $trimester = 1;
                } elseif ($mingguKe <= 28) {
                    $trimester = 2;
                } else {
                    $trimester = 3;
                }

                $this->createAncRecord($kehamilan, $tanggalCheckup, $trimester);
            }
        }

        $this->command->info('✅ Seeder Pemeriksaan ANC berhasil dibuat (9 kali per kehamilan).');
    }

    private function createAncRecord(Kehamilan $kehamilan, Carbon $tanggal, int $trimester): void
    {
        // Nilai fisiologis normal berdasarkan trimester
        $beratBadan = $this->estimasiBeratBadan($trimester);
        $tekananSistolik = $this->estimasiTekananDarah('sistolik');
        $tekananDiastolik = $this->estimasiTekananDarah('diastolik');
        $lila = fake()->randomFloat(1, 23.0, 32.0);
        $tinggiFundus = $this->tinggiFundusTrimester($trimester);
        $bengkak = $this->statusBengkakTrimester($trimester);

        PemeriksaanAnc::create([
            'kehamilan_id'             => $kehamilan->id,
            'petugas_faskes_id'        => 1, // default petugas
            'jenis_pemeriksaan'        => fake()->randomElement(['Rutin', 'Rutin', 'Sakit']), // mayoritas rutin
            'tanggal_checkup'          => $tanggal->format('Y-m-d'),

            // Data Ibu
            'berat_badan'              => $beratBadan,
            'tekanan_darah_sistolik'   => $tekananSistolik,
            'tekanan_darah_diastolik'  => $tekananDiastolik,
            'lila'                     => $lila,
            'tinggi_fundus'            => $tinggiFundus,
            'status_bengkak_kaki'      => $bengkak,
            'keluhan'                  => fake()->optional()->randomElement([
                                            'Mual dan muntah ringan',
                                            'Kram kaki',
                                            'Sulit tidur',
                                            'Tidak ada keluhan',
                                            null
                                        ]),

            // Vital signs
            'suhu_tubuh_celsius'       => fake()->randomFloat(1, 36.5, 37.5),
            'frekuensi_napas_per_menit'=> fake()->numberBetween(16, 22),
            'frekuensi_jantung_per_menit'=> fake()->numberBetween(70, 100),

            // Catatan
            'catatan_petugas'          => $this->catatanTrimester($trimester),
            'deteksi_resiko'           => $this->deteksiResikoTrimester($trimester),
            'saran_kunjungan_berikutnya' => $tanggal->copy()->addWeeks(4)->format('Y-m-d'),
        ]);
    }

    // ========= Helper Functions =========

    private function estimasiBeratBadan(int $trimester): float
    {
        switch ($trimester) {
            case 1: return fake()->randomFloat(2, 45.0, 50.0);
            case 2: return fake()->randomFloat(2, 50.0, 60.0);
            case 3: return fake()->randomFloat(2, 60.0, 75.0);
            default: return 55.0;
        }
    }

    private function estimasiTekananDarah(string $jenis): int
    {
        if ($jenis === 'sistolik') {
            return fake()->numberBetween(100, 120);
        }
        return fake()->numberBetween(70, 80);
    }

    private function tinggiFundusTrimester(int $trimester): ?float
    {
        switch ($trimester) {
            case 1: return fake()->randomFloat(1, 8.0, 12.0);
            case 2: return fake()->randomFloat(1, 14.0, 24.0);
            case 3: return fake()->randomFloat(1, 26.0, 35.0);
            default: return null;
        }
    }

    private function statusBengkakTrimester(int $trimester): ?string
    {
        return fake()->randomElement([
            'Tidak Ada',
            'Tidak Ada',
            $trimester === 3 ? 'Ringan' : 'Tidak Ada',
        ]);
    }

    private function catatanTrimester(int $trimester): string
    {
        switch ($trimester) {
            case 1: return 'Pemantauan awal kehamilan, diberikan vitamin folat.';
            case 2: return 'Ibu dalam kondisi baik, disarankan menjaga nutrisi.';
            case 3: return 'Menjelang persalinan, edukasi tanda bahaya diberikan.';
            default: return 'Kondisi normal.';
        }
    }

    private function deteksiResikoTrimester(int $trimester): ?string
    {
        if ($trimester === 3 && rand(0, 4) === 0) {
            return 'Perlu pemantauan tekanan darah lebih lanjut.';
        }
        return null;
    }
}
