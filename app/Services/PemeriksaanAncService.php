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
            // 1. Check existing pemeriksaan
            // $this->checkExistingPemeriksaan($data);

            // 2. Create main pemeriksaan ANC
            $pemeriksaanAnc = $this->createMainPemeriksaan($data);
            Log::info('jalan createMainPemeriksaan');

            // 3. Create related data
            $this->createRelatedData($data, $pemeriksaanAnc);

            DB::commit();

            return [
                'success' => true,
                'data' => [
                    'pemeriksaan_anc_id' => $pemeriksaanAnc->id,
                    'tanggal_checkup' => $pemeriksaanAnc->tanggal_checkup,
                    'jenis_pemeriksaan' => $pemeriksaanAnc->jenis_pemeriksaan
                ]
            ];

        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    // private function checkExistingPemeriksaan(array $data): void
    // {
    //     $existing = PemeriksaanAnc::where('kehamilan_id', $data['kehamilan_id'])
    //         ->where('tanggal_checkup', $data['tanggal_checkup'])
    //         ->where('jenis_pemeriksaan', $data['jenis_pemeriksaan'])
    //         ->exists();

    //     if ($existing) {
    //         throw new Exception(
    //             'Pemeriksaan ANC untuk kehamilan ini pada tanggal dan jenis yang sama sudah ada',
    //             409
    //         );
    //     }
    // }

    private function createMainPemeriksaan(array $data): PemeriksaanAnc
    {

        return

        PemeriksaanAnc::create([
            'kehamilan_id' => $data['kehamilan_id'],
            'petugas_faskes_id' => $data['petugas_faskes_id'],
            'jenis_pemeriksaan' => $data['jenis_pemeriksaan'],
            'tanggal_checkup' => $data['tanggal_checkup'],
            'berat_badan' => $data['berat_badan'],
            'tekanan_darah_sistolik' => $data['tekanan_darah_sistolik'],
            'tekanan_darah_diastolik' => $data['tekanan_darah_diastolik'],
            'lila' => $data['lila'] ?? null,
            'tinggi_fundus' => $data['tinggi_fundus'] ?? null,
            'status_bengkak_kaki' => $data['status_bengkak_kaki'] ?? null,
            'keluhan' => $data['keluhan'] ?? null,
            'suhu_tubuh_celsius' => $data['suhu_tubuh_celsius'] ?? null,
            'frekuensi_napas_per_menit' => $data['frekuensi_napas_per_menit'] ?? null,
            'frekuensi_jantung_per_menit' => $data['frekuensi_jantung_per_menit'] ?? null,
            'catatan_petugas' => $data['catatan_petugas'] ?? null,
            'deteksi_resiko' => $data['deteksi_resiko'] ?? null,
            'saran_kunjungan_berikutnya' => $data['saran_kunjungan_berikutnya'] ?? null,
        ]);


    }

    private function createRelatedData(array $data, PemeriksaanAnc $pemeriksaanAnc): void
    {
        // Create riwayat sakit if exists
        if (!empty($data['riwayat_sakit'])) {
            $this->createRiwayatSakit($data, $pemeriksaanAnc->id);
        }

        // Create data janin if exists
        if (!empty($data['data_janin'])) {
            $this->createDataJanin($data['data_janin'], $pemeriksaanAnc->id);
        }

        // Create media pemeriksaan if exists
        if (!empty($data['media_pemeriksaan'])) {
            $this->createMediaPemeriksaan($data['media_pemeriksaan'], $pemeriksaanAnc->id);
        }

        // Create hasil lab if exists
        if (!empty($data['hasil_lab'])) {
            $this->createHasilLab($data['hasil_lab'], $pemeriksaanAnc->id);
        }

        // Create riwayat imunisasi if exists
        if (!empty($data['riwayat_imunisasi'])) {
            $this->createRiwayatImunisasi($data['riwayat_imunisasi'], $pemeriksaanAnc->id, $data['kehamilan_id']);
        }

        // Create resep obat if exists
        if (!empty($data['resep_obat'])) {
            $this->createResepObat($data['resep_obat'], $pemeriksaanAnc->id);
        }
    }

      private function createRiwayatSakit(array $data, int $pemeriksaanAncId): void
    {
        $riwayatSakit = $data['riwayat_sakit'];

        if (!empty($riwayatSakit['diagnosis']) || !empty($riwayatSakit['gejala'])) {
            RiwayatSakitKehamilan::create([
                'kehamilan_id' => $data['kehamilan_id'],
                'pemeriksaan_anc_id' => $pemeriksaanAncId,
                'tanggal_diagnosis' => $riwayatSakit['tanggal_diagnosis'] ?? $data['tanggal_checkup'],
                'diagnosis' => $riwayatSakit['diagnosis'] ?? null,
                'gejala' => $riwayatSakit['gejala'] ?? null,
                'tindakan_pengobatan' => $riwayatSakit['tindakan_pengobatan'] ?? null,
                'status_penyakit' => $riwayatSakit['status_penyakit'] ?? 'Aktif',
            ]);
        }
    }

    private function createDataJanin(array $dataJaninArray, int $pemeriksaanAncId): void
    {
        foreach ($dataJaninArray as $dataJanin) {
            DataJanin::create([
                'pemeriksaan_anc_id' => $pemeriksaanAncId,
                'urutan_janin' => $dataJanin['urutan_janin'],
                'posisi_deskriptif' => $dataJanin['posisi_deskriptif'] ?? null,
                'denyut_jantung_janin' => $dataJanin['denyut_jantung_janin'] ?? null,
                'posisi_janin' => $dataJanin['posisi_janin'] ?? null,
                'pergerakan_janin' => $dataJanin['pergerakan_janin'] ?? null,
                'taksiran_berat_janin' => $dataJanin['taksiran_berat_janin'] ?? null,
                'indeks_cairan_ketuban' => $dataJanin['indeks_cairan_ketuban'] ?? null,
                'usg_bpd_mm' => $dataJanin['usg_bpd_mm'] ?? null,
                'usg_hc_mm' => $dataJanin['usg_hc_mm'] ?? null,
                'usg_ac_mm' => $dataJanin['usg_ac_mm'] ?? null,
                'usg_fl_mm' => $dataJanin['usg_fl_mm'] ?? null,
            ]);
        }
    }

    private function createMediaPemeriksaan(array $mediaPemeriksaanArray, int $pemeriksaanAncId): void
{
    foreach ($mediaPemeriksaanArray as $media) {
        $dataJaninId = null;

        if (!empty($media['data_janin_urutan'])) {
            $dataJanin = DataJanin::where('pemeriksaan_anc_id', $pemeriksaanAncId)
                ->where('urutan_janin', $media['data_janin_urutan'])
                ->first();
            $dataJaninId = $dataJanin?->id;
        }

        $filePath = null;
        if (!empty($media['file_url'])) {
            $filePath = $media['file_url']->store('media_pemeriksaan', 'public');
        }

        MediaPemeriksaan::create([
            'pemeriksaan_anc_id' => $pemeriksaanAncId,
            'data_janin_id' => $dataJaninId,
            'tipe_media' => $media['tipe_media'],
            'file_url' => $filePath,
            'deskripsi' => $media['deskripsi'] ?? null,
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
                'status' => $lab['status'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        HasilLab::insert($hasilLabData);
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
}
