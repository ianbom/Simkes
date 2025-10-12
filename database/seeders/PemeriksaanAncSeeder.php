<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kehamilan;
use App\Models\PemeriksaanAnc;
use App\Models\DataJanin;
use App\Models\HasilLab;
use App\Models\RiwayatSakitKehamilan;
use App\Models\User;
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

            // Normalnya 9 kali pemeriksaan (min 1 per bulan)
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
            $this->createRiwayatSakitKehamilan($kehamilan);
        }

        $this->command->info('✅ Seeder Pemeriksaan ANC, Data Janin & Hasil Lab berhasil dibuat.');
    }

    private function createAncRecord(Kehamilan $kehamilan, Carbon $tanggal, int $trimester): void
    {
        $petugasFaskes = User::where('role', 'Petugas Faskes')->first();
        // Nilai fisiologis normal berdasarkan trimester
        $beratBadan = $this->estimasiBeratBadan($trimester);
        $tekananSistolik = $this->estimasiTekananDarah('sistolik');
        $tekananDiastolik = $this->estimasiTekananDarah('diastolik');
        $lila = fake()->randomFloat(1, 23.0, 32.0);
        $tinggiFundus = $this->tinggiFundusTrimester($trimester);
        $bengkak = $this->statusBengkakTrimester($trimester);

        // Buat data pemeriksaan ANC
        $anc = PemeriksaanAnc::create([
            'kehamilan_id'             => $kehamilan->id,
            'petugas_faskes_id'        => $petugasFaskes->id,
            'jenis_pemeriksaan'        => fake()->randomElement(['Rutin', 'Rutin', 'Sakit']),
            'tanggal_checkup'          => $tanggal->format('Y-m-d'),
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
            'suhu_tubuh_celsius'       => fake()->randomFloat(1, 36.5, 37.5),
            'frekuensi_napas_per_menit'=> fake()->numberBetween(16, 22),
            'frekuensi_jantung_per_menit'=> fake()->numberBetween(70, 100),
            'catatan_petugas'          => $this->catatanTrimester($trimester),
            'deteksi_resiko'           => $this->deteksiResikoTrimester($trimester),
            'saran_kunjungan_berikutnya' => $tanggal->copy()->addWeeks(4)->format('Y-m-d'),
        ]);

        // Buat data janin & hasil lab
        $this->createDataJanin($kehamilan, $anc, $trimester);
        $this->createHasilLab($anc, $trimester);
    }

    /**
     * Membuat data_janin sesuai perkembangan normal per trimester.
     */
    private function createDataJanin(Kehamilan $kehamilan, PemeriksaanAnc $anc, int $trimester): void
    {
        $jumlahJanin = $kehamilan->jumlah_janin ?? 1;

        for ($i = 1; $i <= $jumlahJanin; $i++) {
            $growth = $this->estimasiPertumbuhanJanin($trimester);

            DataJanin::create([
                'pemeriksaan_anc_id'  => $anc->id,
                'kehamilan_id'         => $kehamilan->id,
                'urutan_janin'         => $i,
                'posisi_deskriptif'    => fake()->randomElement([
                    'Kepala di bawah, punggung kiri',
                    'Kepala di bawah, punggung kanan',
                    'Sungsang sebagian',
                    'Lintang, posisi belum stabil',
                ]),
                'denyut_jantung_janin' => fake()->numberBetween(120, 160),
                'posisi_janin'         => $growth['posisi'],
                'pergerakan_janin'     => $growth['pergerakan'],
                'taksiran_berat_janin' => $growth['berat'],
                'panjang_janin_cm'     => $growth['panjang'],
            ]);
        }
    }

    /**
     * Membuat hasil_lab realistis per pemeriksaan.
     */
    private function createHasilLab(PemeriksaanAnc $anc, int $trimester): void
    {
        $tests = [
            'Hemoglobin' => ['g/dL', $this->hasilHemoglobin()],
            'Gula Darah' => ['mg/dL', $this->hasilGulaDarah()],
            'Protein Urin' => ['mg/dL', $this->hasilProteinUrin()],
            'Leukosit' => ['ribu/uL', $this->hasilLeukosit()],
            'Tekanan Darah' => ['mmHg', "{$anc->tekanan_darah_sistolik}/{$anc->tekanan_darah_diastolik}"],
        ];

        foreach ($tests as $namaTes => [$satuan, $hasil]) {
            if ($hasil === null) continue;

            HasilLab::create([
                'pemeriksaan_anc_id' => $anc->id,
                'nama_tes' => $namaTes,
                'hasil' => is_array($hasil) ? $hasil['nilai'] : $hasil,
                'satuan' => $satuan,
                'status' => is_array($hasil) ? $hasil['status'] : 'Normal',
            ]);
        }
    }

    // ========= Helper Functions =========

    private function hasilHemoglobin(): array
    {
        $nilai = fake()->randomFloat(1, 10.5, 14.5);
        $status = $nilai < 11 ? 'Kurang Normal' : 'Normal';
        return ['nilai' => $nilai, 'status' => $status];
    }

    private function hasilGulaDarah(): array
    {
        $nilai = fake()->randomFloat(0, 70, 150);
        $status = match (true) {
            $nilai < 70 => 'Kurang Normal',
            $nilai > 140 => 'Tidak Normal',
            default => 'Normal',
        };
        return ['nilai' => $nilai, 'status' => $status];
    }

    private function hasilProteinUrin(): array
    {
        $nilai = fake()->randomFloat(1, 0, 30);
        $status = $nilai > 15 ? 'Perlu Tindak Lanjut' : 'Normal';
        return ['nilai' => $nilai, 'status' => $status];
    }

    private function hasilLeukosit(): array
    {
        $nilai = fake()->randomFloat(1, 4.0, 11.0);
        $status = $nilai > 10 ? 'Perlu Tindak Lanjut' : 'Normal';
        return ['nilai' => $nilai, 'status' => $status];
    }

    private function estimasiPertumbuhanJanin(int $trimester): array
    {
        switch ($trimester) {
            case 1:
                return [
                    'berat' => fake()->numberBetween(1, 25),
                    'panjang' => fake()->randomFloat(2, 1.0, 8.0),
                    'posisi' => 'Belum Terdefinisi',
                    'pergerakan' => 'Aktif',
                ];
            case 2:
                return [
                    'berat' => fake()->numberBetween(300, 800),
                    'panjang' => fake()->randomFloat(2, 15.0, 30.0),
                    'posisi' => fake()->randomElement(['Kepala', 'Sungsang', 'Lintang']),
                    'pergerakan' => 'Aktif',
                ];
            case 3:
                return [
                    'berat' => fake()->numberBetween(1800, 3500),
                    'panjang' => fake()->randomFloat(2, 42.0, 52.0),
                    'posisi' => fake()->randomElement(['Kepala', 'Sungsang']),
                    'pergerakan' => fake()->randomElement(['Aktif', 'Berkurang']),
                ];
            default:
                return [
                    'berat' => 1000,
                    'panjang' => 25.0,
                    'posisi' => 'Belum Terdefinisi',
                    'pergerakan' => 'Aktif',
                ];
        }
    }

    private function estimasiBeratBadan(int $trimester): float
    {
        return match ($trimester) {
            1 => fake()->randomFloat(2, 45.0, 50.0),
            2 => fake()->randomFloat(2, 50.0, 60.0),
            3 => fake()->randomFloat(2, 60.0, 75.0),
            default => 55.0,
        };
    }

    private function estimasiTekananDarah(string $jenis): int
    {
        return $jenis === 'sistolik'
            ? fake()->numberBetween(100, 120)
            : fake()->numberBetween(70, 80);
    }

    private function tinggiFundusTrimester(int $trimester): ?float
    {
        return match ($trimester) {
            1 => fake()->randomFloat(1, 8.0, 12.0),
            2 => fake()->randomFloat(1, 14.0, 24.0),
            3 => fake()->randomFloat(1, 26.0, 35.0),
            default => null,
        };
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
        return match ($trimester) {
            1 => 'Pemantauan awal kehamilan, diberikan vitamin folat.',
            2 => 'Ibu dalam kondisi baik, disarankan menjaga nutrisi.',
            3 => 'Menjelang persalinan, edukasi tanda bahaya diberikan.',
            default => 'Kondisi normal.',
        };
    }

     private function createRiwayatSakitKehamilan(Kehamilan $kehamilan): void
    {
        $anc = PemeriksaanAnc::where('kehamilan_id', $kehamilan->id)->inRandomOrder()->first();
        if (!$anc) return;

        RiwayatSakitKehamilan::create([
            'kehamilan_id' => $kehamilan->id,
            'pemeriksaan_anc_id' => $anc->id,
            'tanggal_diagnosis' => Carbon::parse($anc->tanggal_checkup)->subDays(rand(0, 14)),
            'diagnosis' => fake()->randomElement([
                'Anemia ringan',
                'Hipertensi dalam kehamilan',
                'Infeksi saluran kemih',
                'Preeklamsia ringan',
                'Tidak ada keluhan berarti',
            ]),
            'gejala' => fake()->randomElement([
                'Pusing, lemas',
                'Tekanan darah tinggi',
                'Demam ringan dan nyeri saat buang air kecil',
                'Bengkak pada kaki dan tangan',
            ]),
            'tindakan_pengobatan' => fake()->randomElement([
                'Diberikan tablet Fe dan dianjurkan istirahat cukup.',
                'Kontrol tekanan darah rutin tiap minggu.',
                'Pemberian antibiotik ringan sesuai resep dokter.',
                'Edukasi tanda bahaya dan rujukan ke faskes tingkat lanjut bila perlu.',
            ]),
            'status_penyakit' => fake()->randomElement(['Aktif', 'Sembuh', 'Terkontrol']),
        ]);
    }

    private function deteksiResikoTrimester(int $trimester): ?string
    {
        return $trimester === 3 && rand(0, 4) === 0
            ? 'Perlu pemantauan tekanan darah lebih lanjut.'
            : null;
    }
}
