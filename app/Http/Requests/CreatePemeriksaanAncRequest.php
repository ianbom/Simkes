<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePemeriksaanAncRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

     public function rules(): array
    {
        return [
            //  PEMERIKSAAN ANC
            'kehamilan_id' => 'nullable|integer|exists:kehamilan,id',
            'petugas_faskes_id' => 'nullable|integer|exists:users,id',
            'jenis_pemeriksaan' => 'nullable|in:Rutin,Sakit',
            'tanggal_checkup' => 'nullable|date',
            // Data Ibu
            'berat_badan' => 'nullable|numeric|between:0,999.99',
            'tekanan_darah_sistolik' => 'nullable|integer|min:0',
            'tekanan_darah_diastolik' => 'nullable|integer|min:0',
            'lila' => 'nullable|numeric|between:0,99.9',
            'tinggi_fundus' => 'nullable|numeric|between:0,99.9',
            'status_bengkak_kaki' => 'nullable|in:Tidak Ada,Ringan,Berat',
            'keluhan' => 'nullable|string',
            // Vital Signs
            'suhu_tubuh_celsius' => 'nullable|numeric|between:0,99.9',
            'frekuensi_napas_per_menit' => 'nullable|integer|min:0',
            'frekuensi_jantung_per_menit' => 'nullable|integer|min:0',
            // Catatan
            'catatan_petugas' => 'nullable|string',
            'deteksi_resiko' => 'nullable|string',
            'saran_kunjungan_berikutnya' => 'nullable|date',
            //  RIWAYAT SAKIT KEHAMILAN
            'riwayat_sakit_kehamilan.kehamilan_id' => 'nullable|integer|exists:kehamilan,id',
            'riwayat_sakit_kehamilan.pemeriksaan_anc_id' => 'nullable|integer|exists:pemeriksaan_anc,id',
            'riwayat_sakit_kehamilan.tanggal_diagnosis' => 'nullable|date',
            'riwayat_sakit_kehamilan.diagnosis' => 'nullable|string',
            'riwayat_sakit_kehamilan.gejala' => 'nullable|string',
            'riwayat_sakit_kehamilan.tindakan_pengobatan' => 'nullable|string',
            'riwayat_sakit_kehamilan.status_penyakit' => 'nullable|in:Aktif,Sembuh,Terkontrol',
            //  DATA JANIN (multiple)
            'data_janin' => 'nullable|array',
            'data_janin.*.kehamilan_id' => 'nullable',
            'data_janin.*.urutan_janin' => 'nullable',
            'data_janin.*.posisi_deskriptif' => 'nullable|string|max:255',
            'data_janin.*.denyut_jantung_janin' => 'nullable|integer|min:0',
            'data_janin.*.posisi_janin' => 'nullable|in:Kepala,Sungsang,Lintang,Belum Terdefinisi',
            'data_janin.*.pergerakan_janin' => 'nullable|in:Aktif,Berkurang',
            'data_janin.*.taksiran_berat_janin' => 'nullable|integer|min:0',
            'data_janin.*.panjang_janin_cm' => 'nullable|numeric|between:0,999.99',
            //  MEDIA PEMERIKSAAN (multiple)
            'media_pemeriksaan' => 'nullable|array',
            'media_pemeriksaan.*.file_url' => 'nullable',
            //  HASIL LAB (multiple)
            'hasil_lab' => 'nullable|array',
            'hasil_lab.*.nama_tes' => 'nullable',
            'hasil_lab.*.hasil' => 'nullable',
            'hasil_lab.*.satuan' => 'nullable|string|max:20',
            'hasil_lab.*.status' => 'nullable',
        ];
    }
}
