<?php

namespace App\Services;

use App\Models\DataJanin;
use App\Models\HasilLab;
use App\Models\MediaPemeriksaan;
use App\Models\PemeriksaanAnc;
use App\Models\ResepObatCheckup;
use App\Models\RiwayatImunisasi;
use App\Models\RiwayatSakitKehamilan;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PemeriksaanAncService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

     public function createPemeriksaanAnc(array $data): array
    {
        DB::beginTransaction();

        try {
            // 1️⃣ Buat data utama pemeriksaan ANC
            $pemeriksaanAnc = $this->createMainPemeriksaan($data);
            Log::info('✅ Pemeriksaan ANC berhasil dibuat', ['id' => $pemeriksaanAnc->id]);

            // 2️⃣ Data relasi tambahan
            $this->createRelatedData($data, $pemeriksaanAnc);

            DB::commit();

            return [
                'success' => true,
                'data' => [
                    'pemeriksaan_anc_id' => $pemeriksaanAnc->id,
                    'tanggal_checkup' => $pemeriksaanAnc->tanggal_checkup,
                    'jenis_pemeriksaan' => $pemeriksaanAnc->jenis_pemeriksaan,
                ],
            ];
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('❌ Gagal create Pemeriksaan ANC', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    private function createMainPemeriksaan(array $data): PemeriksaanAnc
    {
        return PemeriksaanAnc::create([
            'kehamilan_id' => $data['kehamilan_id'] ?? null,
            'petugas_faskes_id' => $data['petugas_faskes_id'] ?? Auth::id(),
            'jenis_pemeriksaan' => $data['jenis_pemeriksaan'] ?? 'Rutin',
            'tanggal_checkup' => $data['tanggal_checkup'] ?? now(),

            // Data Ibu
            'berat_badan' => $data['berat_badan'] ?? null,
            'tekanan_darah_sistolik' => $data['tekanan_darah_sistolik'] ?? null,
            'tekanan_darah_diastolik' => $data['tekanan_darah_diastolik'] ?? null,
            'lila' => $data['lila'] ?? null,
            'tinggi_fundus' => $data['tinggi_fundus'] ?? null,
            'status_bengkak_kaki' => $data['status_bengkak_kaki'] ?? null,
            'keluhan' => $data['keluhan'] ?? null,

            // Vital Signs
            'suhu_tubuh_celsius' => $data['suhu_tubuh_celsius'] ?? null,
            'frekuensi_napas_per_menit' => $data['frekuensi_napas_per_menit'] ?? null,
            'frekuensi_jantung_per_menit' => $data['frekuensi_jantung_per_menit'] ?? null,

            // Catatan
            'catatan_petugas' => $data['catatan_petugas'] ?? null,
            'deteksi_resiko' => $data['deteksi_resiko'] ?? null,
            'saran_kunjungan_berikutnya' => $data['saran_kunjungan_berikutnya'] ?? null,
        ]);
    }

    private function createRelatedData(array $data, PemeriksaanAnc $pemeriksaanAnc): void
    {
        // 1️⃣ Data janin (multiple)
        if (!empty($data['data_janin']) && is_array($data['data_janin'])) {
            $this->createDataJanin($data['data_janin'], $pemeriksaanAnc->id, $pemeriksaanAnc->kehamilan_id);
        }

        // 2️⃣ Media pemeriksaan (multiple)
        if (!empty($data['media_pemeriksaan']) && is_array($data['media_pemeriksaan'])) {
            $this->createMediaPemeriksaan($data['media_pemeriksaan'], $pemeriksaanAnc->id);
        }

        // 3️⃣ Hasil lab (multiple)
        if (!empty($data['hasil_lab']) && is_array($data['hasil_lab'])) {
            $this->createHasilLab($data['hasil_lab'], $pemeriksaanAnc->id);
        }

        // 4️⃣ Riwayat sakit (single)
        if (!empty($data['riwayat_sakit_kehamilan'])) {
            $this->createRiwayatSakitKehamilan($data['riwayat_sakit_kehamilan'], $pemeriksaanAnc);
        }
    }

    private function createDataJanin(array $dataJaninArray, int $pemeriksaanAncId, int $kehamilanId): void
    {
        foreach ($dataJaninArray as $dataJanin) {
            DataJanin::create([
                'pemeriksaan_anc_id' => $pemeriksaanAncId,
                'kehamilan_id' => $kehamilanId,
                'urutan_janin' => $dataJanin['urutan_janin'],
                'posisi_deskriptif' => $dataJanin['posisi_deskriptif'] ?? null,
                'denyut_jantung_janin' => $dataJanin['denyut_jantung_janin'] ?? null,
                'posisi_janin' => $dataJanin['posisi_janin'] ?? null,
                'pergerakan_janin' => $dataJanin['pergerakan_janin'] ?? null,
                'taksiran_berat_janin' => $dataJanin['taksiran_berat_janin'] ?? null,
                'panjang_janin_cm' => $dataJanin['panjang_janin_cm'] ?? null,
            ]);
        }
    }
    private function createMediaPemeriksaan(array $mediaPemeriksaanArray, int $pemeriksaanAncId): void
    {
        foreach ($mediaPemeriksaanArray as $media) {
            // Jika file_url berupa string URL (bukan UploadedFile)
            $fileUrl = is_string($media['file_url'])
                ? $media['file_url']
                : ($media['file_url']->store('media_pemeriksaan', 'public') ?? null);

            MediaPemeriksaan::create([
                'pemeriksaan_anc_id' => $pemeriksaanAncId,
                'file_url' => $fileUrl,
            ]);
        }
    }

    private function createHasilLab(array $hasilLabArray, int $pemeriksaanAncId): void
    {
        $hasilLabData = collect($hasilLabArray)->map(function ($lab) use ($pemeriksaanAncId) {
            return [
                'pemeriksaan_anc_id' => $pemeriksaanAncId,
                'nama_tes' => $lab['nama_tes'],
                'hasil' => $lab['hasil'],
                'satuan' => $lab['satuan'] ?? null,
                'status' => $lab['status'] ?? 'Normal',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        if (!empty($hasilLabData)) {
            HasilLab::insert($hasilLabData);
        }
    }

    private function createRiwayatSakitKehamilan(array $riwayatSakit, PemeriksaanAnc $pemeriksaanAnc): void
    {
        if (empty($riwayatSakit['diagnosis']) && empty($riwayatSakit['gejala'])) {
            return;
        }

        RiwayatSakitKehamilan::create([
            'kehamilan_id' => $riwayatSakit['kehamilan_id'] ?? $pemeriksaanAnc->kehamilan_id,
            'pemeriksaan_anc_id' => $pemeriksaanAnc->id,
            'tanggal_diagnosis' => $riwayatSakit['tanggal_diagnosis'] ?? $pemeriksaanAnc->tanggal_checkup,
            'diagnosis' => $riwayatSakit['diagnosis'] ?? null,
            'gejala' => $riwayatSakit['gejala'] ?? null,
            'tindakan_pengobatan' => $riwayatSakit['tindakan_pengobatan'] ?? null,
            'status_penyakit' => $riwayatSakit['status_penyakit'] ?? 'Aktif',
        ]);
    }



    private function createRiwayatImunisasi(array $riwayatImunisasiArray, int $pemeriksaanAncId, int $kehamilanId): void
    {
        $imunisasiData = collect($riwayatImunisasiArray)->map(function ($imunisasi) use ($pemeriksaanAncId, $kehamilanId) {
            return [
                'kehamilan_id' => $kehamilanId,
                'pemeriksaan_anc_id' => $pemeriksaanAncId,
                'jenis_vaksin' => $imunisasi['jenis_vaksin'],
                'tanggal_pemberian' => $imunisasi['tanggal_pemberian'],
                'catatan_petugas' => $imunisasi['catatan_petugas'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        RiwayatImunisasi::insert($imunisasiData);
    }

    private function createResepObat(array $resepObatArray, int $pemeriksaanAncId): void
    {
        $resepObatData = collect($resepObatArray)->map(function ($resep) use ($pemeriksaanAncId) {
            return [
                'pemeriksaan_anc_id' => $pemeriksaanAncId,
                'obat_id' => $resep['obat_id'],
                'dosis' => $resep['dosis'] ?? null,
                'jumlah' => $resep['jumlah'] ?? null,
                'catatan' => $resep['catatan'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        ResepObatCheckup::insert($resepObatData);
    }

     // Create data janin if exists
        // if (!empty($data['data_janin'])) {
        //     $this->createDataJanin($data['data_janin'], $pemeriksaanAnc->id);
        // }

        // // Create media pemeriksaan if exists
        // if (!empty($data['media_pemeriksaan'])) {
        //     $this->createMediaPemeriksaan($data['media_pemeriksaan'], $pemeriksaanAnc->id);
        // }

        // // Create hasil lab if exists
        // if (!empty($data['hasil_lab'])) {
        //     $this->createHasilLab($data['hasil_lab'], $pemeriksaanAnc->id);
        // }

        // // Create riwayat imunisasi if exists
        // if (!empty($data['riwayat_imunisasi'])) {
        //     $this->createRiwayatImunisasi($data['riwayat_imunisasi'], $pemeriksaanAnc->id, $data['kehamilan_id']);
        // }

        // // Create resep obat if exists
        // if (!empty($data['resep_obat'])) {
        //     $this->createResepObat($data['resep_obat'], $pemeriksaanAnc->id);
        // }
}
