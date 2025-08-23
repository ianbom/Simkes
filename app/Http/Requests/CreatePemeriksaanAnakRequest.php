<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePemeriksaanAnakRequest extends FormRequest
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
            // Pemeriksaan Anak (wajib - hanya satu data)
            'anak_id' => 'required|integer|exists:anak,id',
            'petugas_faskes_id' => 'required|integer|exists:users,id',
            'jenis_kunjungan' => 'required|in:Rutin,Sakit',
            'tanggal_pemeriksaan' => 'required|date',
            'usia_saat_periksa_bulan' => 'required|integer|min:0',

            // Data Antropometri (untuk kunjungan Rutin)
            'berat_badan_kg' => 'nullable|numeric|between:0,999.99',
            'tinggi_badan_cm' => 'nullable|numeric|between:0,999.9',
            'lingkar_kepala_cm' => 'nullable|numeric|between:0,99.9',
            'cara_ukur_tinggi' => 'nullable|in:Berbaring,Berdiri',

            // Data Tanda Vital (untuk kunjungan Sakit)
            'suhu_tubuh_celsius' => 'nullable|numeric|between:0,99.9',
            'frekuensi_napas_per_menit' => 'nullable|integer|min:0',
            'frekuensi_jantung_per_menit' => 'nullable|integer|min:0',
            'saturasi_oksigen_persen' => 'nullable|integer|min:0|max:100',

            // Data Perkembangan
            'perkembangan_motorik' => 'nullable|string',
            'perkembangan_kognitif' => 'nullable|string',
            'perkembangan_emosional' => 'nullable|string',
            'catatan_pemeriksaan' => 'nullable|string',

            // Skrining Perkembangan (array, bisa multiple)
            'skrining_perkembangan' => 'nullable|array',
            'skrining_perkembangan.*.metode_skrining' => 'nullable|string|max:255',
            'skrining_perkembangan.*.kelompok_usia_kpsp' => 'nullable|string|max:20',
            'skrining_perkembangan.*.jumlah_jawaban_ya' => 'nullable|integer|min:0',
            'skrining_perkembangan.*.hasil_skrining' => 'nullable|in:Sesuai,Meragukan,Penyimpangan',
            'skrining_perkembangan.*.rekomendasi_intervensi' => 'nullable|string',

            // Riwayat Imunisasi (array, bisa multiple)
            'riwayat_imunisasi' => 'nullable|array',
            'riwayat_imunisasi.*.jenis_vaksin' => 'required_with:riwayat_imunisasi|in:BCG,Polio,DPT-HB-Hib-1,Campak,Lainnya',
            'riwayat_imunisasi.*.tanggal_pemberian' => 'required_with:riwayat_imunisasi|date',
            'riwayat_imunisasi.*.catatan' => 'nullable|string',

            // Riwayat Obat (array, bisa multiple)
            'riwayat_obat' => 'nullable|array',
            'riwayat_obat.*.obat_id' => 'required_with:riwayat_obat|integer|exists:obat_master,id',
            'riwayat_obat.*.dosis' => 'nullable|string|max:255',
            'riwayat_obat.*.tanggal_pemberian' => 'required_with:riwayat_obat|date',

            // Riwayat Sakit (array, bisa multiple)
            'riwayat_sakit' => 'nullable|array',
            'riwayat_sakit.*.tanggal_sakit' => 'required_with:riwayat_sakit|date',
            'riwayat_sakit.*.diagnosis' => 'required_with:riwayat_sakit|string|max:255',
            'riwayat_sakit.*.gejala' => 'nullable|string',
            'riwayat_sakit.*.tindakan_pengobatan' => 'nullable|string',
            'riwayat_sakit.*.catatan' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'anak_id.required' => 'ID Anak wajib diisi',
            'anak_id.exists' => 'Data anak tidak ditemukan',
            'petugas_faskes_id.required' => 'Petugas Faskes wajib dipilih',
            'petugas_faskes_id.exists' => 'Data petugas tidak ditemukan',
            'jenis_kunjungan.required' => 'Jenis kunjungan wajib dipilih',
            'jenis_kunjungan.in' => 'Jenis kunjungan harus Rutin atau Sakit',
            'tanggal_pemeriksaan.required' => 'Tanggal pemeriksaan wajib diisi',
            'tanggal_pemeriksaan.date' => 'Format tanggal pemeriksaan tidak valid',
            'usia_saat_periksa_bulan.required' => 'Usia saat periksa wajib diisi',
            'usia_saat_periksa_bulan.integer' => 'Usia harus berupa angka bulat',
            'usia_saat_periksa_bulan.min' => 'Usia tidak boleh negatif',
            'berat_badan_kg.numeric' => 'Berat badan harus berupa angka',
            'tinggi_badan_cm.numeric' => 'Tinggi badan harus berupa angka',
            'lingkar_kepala_cm.numeric' => 'Lingkar kepala harus berupa angka',
            'cara_ukur_tinggi.in' => 'Cara ukur tinggi harus Berbaring atau Berdiri',
            'suhu_tubuh_celsius.numeric' => 'Suhu tubuh harus berupa angka',
            'saturasi_oksigen_persen.max' => 'Saturasi oksigen maksimal 100%',
            'riwayat_imunisasi.*.jenis_vaksin.required_with' => 'Jenis vaksin wajib diisi',
            'riwayat_imunisasi.*.jenis_vaksin.in' => 'Jenis vaksin tidak valid',
            'riwayat_imunisasi.*.tanggal_pemberian.required_with' => 'Tanggal pemberian vaksin wajib diisi',
            'riwayat_obat.*.obat_id.required_with' => 'Obat wajib dipilih',
            'riwayat_obat.*.obat_id.exists' => 'Data obat tidak ditemukan',
            'riwayat_obat.*.tanggal_pemberian.required_with' => 'Tanggal pemberian obat wajib diisi',
            'riwayat_sakit.*.tanggal_sakit.required_with' => 'Tanggal sakit wajib diisi',
            'riwayat_sakit.*.diagnosis.required_with' => 'Diagnosis wajib diisi',
        ];
    }


}
