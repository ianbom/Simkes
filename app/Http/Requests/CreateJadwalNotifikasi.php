<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateJadwalNotifikasi extends FormRequest
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
            'user_id' => ['nullable', 'exists:users,id'],
            'tanggal_dijadwalkan' => ['nullable', 'date', 'after_or_equal:today'],
            'judul' => ['nullable', 'string', 'max:255'],
            'konten' => ['nullable', 'string'],
            'tipe' => ['nullable', 'string', 'max:50'],
        ];
    }
}
