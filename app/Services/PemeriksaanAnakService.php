<?php

namespace App\Services;

use App\Models\PemeriksaanAnak;
use App\Models\RiwayatImunisasiAnak;
use App\Models\RiwayatObatAnak;
use App\Models\RiwayatSakitAnak;
use App\Models\SkriningPerkembangan;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PemeriksaanAnakService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

        private function checkExistingPemeriksaan(array $data): void
    {
        $existing = PemeriksaanAnak::where('anak_id', $data['anak_id'])
            ->where('tanggal_pemeriksaan', $data['tanggal_pemeriksaan'])
            ->where('jenis_kunjungan', $data['jenis_kunjungan'])
            ->exists();

        if ($existing) {
            throw new Exception(
                'Pemeriksaan anak untuk tanggal dan jenis kunjungan yang sama sudah ada',
                409
            );
        }
    }

    public function createPemeriksaanAnak(array $data): array
    {
        DB::beginTransaction();

        try {
            $pemeriksaanAnak = $this->createMainPemeriksaan($data);
            $this->createRelatedData($data, $pemeriksaanAnak);
            DB::commit();
            return [
                'success' => true,
                'data' => [
                    'pemeriksaan_anak_id' => $pemeriksaanAnak->id,
                    'tanggal_pemeriksaan' => $pemeriksaanAnak->tanggal_pemeriksaan,
                    'jenis_kunjungan' => $pemeriksaanAnak->jenis_kunjungan,
                    'usia_saat_periksa_bulan' => $pemeriksaanAnak->usia_saat_periksa_bulan
                ]
            ];

        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }
    }



   private function createMainPemeriksaan(array $data): PemeriksaanAnak
{
    return PemeriksaanAnak::create([
        'anak_id' => $data['anak_id'],
        'petugas_faskes_id' => Auth::id(), // ambil otomatis dari user login
        'jenis_kunjungan' => $data['jenis_kunjungan'],
        'tanggal_pemeriksaan' => $data['tanggal_pemeriksaan'],
        'usia_saat_periksa_bulan' => $data['usia_saat_periksa_bulan'] ?? null,

        // Data Antropometri
        'berat_badan_kg' => $data['berat_badan_kg'] ?? null,
        'tinggi_badan_cm' => $data['tinggi_badan_cm'] ?? null,
        'lingkar_kepala_cm' => $data['lingkar_kepala_cm'] ?? null,
        'cara_ukur_tinggi' => $data['cara_ukur_tinggi'] ?? null,

        // Data Tanda Vital
        'suhu_tubuh_celsius' => $data['suhu_tubuh_celsius'] ?? null,
        'frekuensi_napas_per_menit' => $data['frekuensi_napas_per_menit'] ?? null,
        'frekuensi_jantung_per_menit' => $data['frekuensi_jantung_per_menit'] ?? null,
        'saturasi_oksigen_persen' => $data['saturasi_oksigen_persen'] ?? null,

        // Data Perkembangan
        'perkembangan_motorik' => $data['perkembangan_motorik'] ?? null,
        'perkembangan_kognitif' => $data['perkembangan_kognitif'] ?? null,
        'perkembangan_emosional' => $data['perkembangan_emosional'] ?? null,
        'catatan_pemeriksaan' => $data['catatan_pemeriksaan'] ?? null,
    ]);
}

private function createRelatedData(array $data, PemeriksaanAnak $pemeriksaanAnak): void
{
    // ✅ Hanya buat satu riwayat sakit
    if (!empty($data['riwayat_sakit']) && is_array($data['riwayat_sakit'])) {
        $this->createRiwayatSakit($data['riwayat_sakit'], $pemeriksaanAnak->id, $data['anak_id']);
    }
}

private function createRiwayatSakit(array $sakit, int $pemeriksaanAnakId, int $anakId)
{
    if (empty($sakit['diagnosis']) && empty($sakit['tanggal_sakit'])) {
        return;
    }

    RiwayatSakitAnak::create([
        'anak_id' => $anakId,
        'pemeriksaan_anak_id' => $pemeriksaanAnakId,
        'tanggal_sakit' => $sakit['tanggal_sakit'] ?? null,
        'diagnosis' => $sakit['diagnosis'] ?? null,
        'gejala' => $sakit['gejala'] ?? null,
        'tindakan_pengobatan' => $sakit['tindakan_pengobatan'] ?? null,
        'catatan' => $sakit['catatan'] ?? null,
    ]);
}

    private function createSkriningPerkembangan(array $skriningArray, int $pemeriksaanAnakId): void
    {
        $skriningData = collect($skriningArray)->map(function ($skrining) use ($pemeriksaanAnakId) {
            return [
                'pemeriksaan_anak_id' => $pemeriksaanAnakId,
                'metode_skrining' => $skrining['metode_skrining'] ?? 'KPSP',
                'kelompok_usia_kpsp' => $skrining['kelompok_usia_kpsp'] ?? null,
                'jumlah_jawaban_ya' => $skrining['jumlah_jawaban_ya'] ?? null,
                'hasil_skrining' => $skrining['hasil_skrining'] ?? null,
                'rekomendasi_intervensi' => $skrining['rekomendasi_intervensi'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        SkriningPerkembangan::insert($skriningData);
    }

    private function createRiwayatImunisasi(array $imunisasiArray, int $pemeriksaanAnakId, int $anakId): void
    {
        $imunisasiData = collect($imunisasiArray)->map(function ($imunisasi) use ($pemeriksaanAnakId, $anakId) {
            return [
                'anak_id' => $anakId,
                'pemeriksaan_anak_id' => $pemeriksaanAnakId,
                'jenis_vaksin' => $imunisasi['jenis_vaksin'],
                'tanggal_pemberian' => $imunisasi['tanggal_pemberian'],
                'catatan' => $imunisasi['catatan'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        RiwayatImunisasiAnak::insert($imunisasiData);
    }

    private function createRiwayatObat(array $obatArray, int $pemeriksaanAnakId, int $anakId): void
    {
        $obatData = collect($obatArray)->map(function ($obat) use ($pemeriksaanAnakId, $anakId) {
            return [
                'anak_id' => $anakId,
                'obat_id' => $obat['obat_id'],
                'pemeriksaan_anak_id' => $pemeriksaanAnakId,
                'dosis' => $obat['dosis'] ?? null,
                'tanggal_pemberian' => $obat['tanggal_pemberian'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        RiwayatObatAnak::insert($obatData);
    }




}
