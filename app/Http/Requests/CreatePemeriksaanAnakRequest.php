<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePemeriksaanAnakRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
         return [
            // ✅ Pemeriksaan Anak (data utama)
            'anak_id' => 'nullable|integer|exists:anak,id',
            'petugas_faskes_id' => 'nullable|integer|exists:users,id',
            'jenis_kunjungan' => 'nullable|in:Rutin,Sakit',
            'tanggal_pemeriksaan' => 'nullable|date',
            'usia_saat_periksa_bulan' => 'nullable|integer|min:0',

            // ✅ Data Antropometri
            'berat_badan_kg' => 'nullable|numeric|between:0,999.99',
            'tinggi_badan_cm' => 'nullable|numeric|between:0,999.9',
            'lingkar_kepala_cm' => 'nullable|numeric|between:0,99.9',
            'cara_ukur_tinggi' => 'nullable|string|max:255',

            // ✅ Data Tanda Vital
            'suhu_tubuh_celsius' => 'nullable|numeric|between:0,99.9',
            'frekuensi_napas_per_menit' => 'nullable|integer|min:0',
            'frekuensi_jantung_per_menit' => 'nullable|integer|min:0',
            'saturasi_oksigen_persen' => 'nullable|integer|min:0|max:100',

            // ✅ Data Perkembangan
            'perkembangan_motorik' => 'nullable|string',
            'perkembangan_kognitif' => 'nullable|string',
            'perkembangan_emosional' => 'nullable|string',
            'catatan_pemeriksaan' => 'nullable|string',

            // ✅ Riwayat Sakit (hanya satu data)
            'riwayat_sakit.tanggal_sakit' => 'nullable|date',
            'riwayat_sakit.diagnosis' => 'nullable|string|max:255',
            'riwayat_sakit.gejala' => 'nullable|string',
            'riwayat_sakit.tindakan_pengobatan' => 'nullable|string',
            'riwayat_sakit.catatan' => 'nullable|string',

            // ✅ Media Pemeriksaan Anak (multiple upload)
            'media_pemeriksaan_anak' => 'nullable|array',
            'media_pemeriksaan_anak.*' => 'file|mimes:jpg,jpeg,png,mp4,pdf,doc,docx|max:5120', // maks 5 MB per file
        ];
    }

    public function messages(): array
    {
        return [
            // Pemeriksaan Anak
            'anak_id.required' => 'ID Anak wajib diisi',
            'anak_id.exists' => 'Data anak tidak ditemukan',
            'petugas_faskes_id.required' => 'Petugas Faskes wajib dipilih',
            'petugas_faskes_id.exists' => 'Data petugas tidak ditemukan',
            'jenis_kunjungan.required' => 'Jenis kunjungan wajib dipilih',
            'jenis_kunjungan.in' => 'Jenis kunjungan harus Rutin atau Sakit',
            'tanggal_pemeriksaan.required' => 'Tanggal pemeriksaan wajib diisi',
            'tanggal_pemeriksaan.date' => 'Format tanggal pemeriksaan tidak valid',

            // Riwayat Sakit
            'riwayat_sakit.tanggal_sakit.date' => 'Format tanggal sakit tidak valid',
            'riwayat_sakit.diagnosis.string' => 'Diagnosis harus berupa teks',
            'riwayat_sakit.diagnosis.max' => 'Diagnosis maksimal 255 karakter',
        ];
    }
}
