<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePemeriksaanAncRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
     public function rules(): array
    {
        return [

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

            // Vital signs
            'suhu_tubuh_celsius' => 'nullable|numeric|between:0,99.9',
            'frekuensi_napas_per_menit' => 'nullable|integer|min:0',
            'frekuensi_jantung_per_menit' => 'nullable|integer|min:0',

            // Catatan
            'catatan_petugas' => 'nullable|string',
            'deteksi_resiko' => 'nullable|string',
            'saran_kunjungan_berikutnya' => 'nullable|date',

            // ===============================
            //  RIWAYAT SAKIT KEHAMILAN
            // ===============================
            'riwayat_sakit_kehamilan.kehamilan_id' => 'nullable|integer|exists:kehamilan,id',
            'riwayat_sakit_kehamilan.pemeriksaan_anc_id' => 'nullable|integer|exists:pemeriksaan_anc,id',
            'riwayat_sakit_kehamilan.tanggal_diagnosis' => 'nullable|date',
            'riwayat_sakit_kehamilan.diagnosis' => 'nullable|string',
            'riwayat_sakit_kehamilan.gejala' => 'nullable|string',
            'riwayat_sakit_kehamilan.tindakan_pengobatan' => 'nullable|string',
            'riwayat_sakit_kehamilan.status_penyakit' => 'nullable|in:Aktif,Sembuh,Terkontrol',
        ];
    }
}
