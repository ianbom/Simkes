<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSesiKonsultasiRequest extends FormRequest
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
            'pasien_user_id' => 'nullable|integer|exists:users,id',
            'anak_id' => 'nullable|integer|exists:anak,id',
            'kehamilan_id' => 'nullable|integer|exists:kehamilan,id',
            'petugas_faskes_id' => 'nullable|integer|exists:users,id',
            'jadwal_id' => 'nullable|integer|exists:jadwal_ketersediaan,id',
            'waktu_mulai_dijadwalkan' => 'nullable|date|after_or_equal:now',
            'durasi_menit' => 'nullable|integer|min:5|max:180',
            'link_video_conference' => 'nullable|string|url|unique:sesi_konsultasi,link_video_conference',
            'room_name' => 'nullable|string|max:255|unique:sesi_konsultasi,room_name',
            'status_sesi' => 'nullable|in:Dipesan,Dikonfirmasi,Berlangsung,Selesai,Batal,Tidak Hadir',
            'ringkasan_konsultasi' => 'nullable|string',
            'rekomendasi_petugas' => 'nullable|string',
        ];
    }
}
