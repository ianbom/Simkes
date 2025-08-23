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
            // Pemeriksaan ANC (wajib)
            'kehamilan_id' => 'required|integer|exists:kehamilan,id',
            'petugas_faskes_id' => 'required|integer|exists:users,id',
            'jenis_pemeriksaan' => 'required|in:Rutin,Sakit',
            'tanggal_checkup' => 'required|date',
            'berat_badan' => 'required|numeric|between:0,999.99',
            'tekanan_darah_sistolik' => 'required|integer|min:0',
            'tekanan_darah_diastolik' => 'required|integer|min:0',
            'lila' => 'nullable|numeric|between:0,99.9',
            'tinggi_fundus' => 'nullable|numeric|between:0,99.9',
            'status_bengkak_kaki' => 'nullable|in:Tidak Ada,Ringan,Berat',
            'keluhan' => 'nullable|string',
            'suhu_tubuh_celsius' => 'nullable|numeric|between:0,99.9',
            'frekuensi_napas_per_menit' => 'nullable|integer|min:0',
            'frekuensi_jantung_per_menit' => 'nullable|integer|min:0',
            'catatan_petugas' => 'nullable|string',
            'deteksi_resiko' => 'nullable|string',
            'saran_kunjungan_berikutnya' => 'nullable|date',

            // Riwayat Sakit (opsional, hanya sekali)
            'riwayat_sakit.tanggal_diagnosis' => 'nullable|date',
            'riwayat_sakit.diagnosis' => 'nullable|string',
            'riwayat_sakit.gejala' => 'nullable|string',
            'riwayat_sakit.tindakan_pengobatan' => 'nullable|string',
            'riwayat_sakit.status_penyakit' => 'nullable|in:Aktif,Sembuh,Terkontrol',

            // Data Janin (array, bisa multiple)
            'data_janin' => 'nullable|array',
            'data_janin.*.urutan_janin' => 'required_with:data_janin|integer|min:1',
            'data_janin.*.posisi_deskriptif' => 'nullable|string|max:255',
            'data_janin.*.denyut_jantung_janin' => 'nullable|integer|min:0',
            'data_janin.*.posisi_janin' => 'nullable|in:Kepala,Sungsang,Lintang,Belum Terdefinisi',
            'data_janin.*.pergerakan_janin' => 'nullable|in:Aktif,Berkurang',
            'data_janin.*.taksiran_berat_janin' => 'nullable|integer|min:0',
            'data_janin.*.indeks_cairan_ketuban' => 'nullable|numeric|between:0,99.9',
            'data_janin.*.usg_bpd_mm' => 'nullable|numeric|between:0,999.9',
            'data_janin.*.usg_hc_mm' => 'nullable|numeric|between:0,999.9',
            'data_janin.*.usg_ac_mm' => 'nullable|numeric|between:0,999.9',
            'data_janin.*.usg_fl_mm' => 'nullable|numeric|between:0,999.9',

            // Media Pemeriksaan (array, bisa multiple)
            'media_pemeriksaan' => 'nullable|array',
            'media_pemeriksaan.*.tipe_media' => 'required_with:media_pemeriksaan|in:USG,Fisik,Lainnya',
            'media_pemeriksaan.*.file_url' => 'nullable|string',
            'media_pemeriksaan.*.deskripsi' => 'nullable|string',
            'media_pemeriksaan.*.data_janin_urutan' => 'nullable|integer|min:1',

            // Hasil Lab (array, bisa multiple)
            'hasil_lab' => 'nullable|array',
            'hasil_lab.*.nama_tes' => 'required_with:hasil_lab|in:Hb,Protein Urin,Gula Darah,HIV,HBsAg,Sifilis',
            'hasil_lab.*.hasil' => 'required_with:hasil_lab|string|max:50',
            'hasil_lab.*.satuan' => 'nullable|string|max:20',
            'hasil_lab.*.status' => 'nullable|in:Normal,Tidak Normal,Perlu Tindak Lanjut',

            // Riwayat Imunisasi (array, bisa multiple)
            'riwayat_imunisasi' => 'nullable|array',
            'riwayat_imunisasi.*.jenis_vaksin' => 'required_with:riwayat_imunisasi|in:TT-1,TT-2,TT-3,TT-4,TT-5,Tdap,Influenza',
            'riwayat_imunisasi.*.tanggal_pemberian' => 'required_with:riwayat_imunisasi|date',
            'riwayat_imunisasi.*.catatan_petugas' => 'nullable|string',

            // Resep Obat (array, bisa multiple)
            'resep_obat' => 'nullable|array',
            'resep_obat.*.obat_id' => 'required_with:resep_obat|integer|exists:obat_master,id',
            'resep_obat.*.dosis' => 'nullable|string|max:50',
            'resep_obat.*.jumlah' => 'nullable|integer|min:0',
            'resep_obat.*.catatan' => 'nullable|string',
        ];
    }
}
