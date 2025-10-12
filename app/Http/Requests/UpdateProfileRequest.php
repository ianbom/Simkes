<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',

            ],
            'nik' => [
                'nullable',
                'digits:16',

            ],
            'tanggal_lahir' => ['nullable', 'date', 'before_or_equal:today'],
            'kelamin' => ['nullable'],
            'no_telp' => [
                'nullable',
                'string',
                'regex:/^[0-9+\-\s]+$/',
                'min:10',

            ],
            'alamat' => ['nullable', 'string', 'max:500'],
            'provinsi_id' => ['nullable', 'exists:provinsi,id'],
            'kota_id' => ['nullable', 'exists:kota,id'],
            'kecamatan_id' => ['nullable', 'exists:kecamatan,id'],
            'faskes_id' => ['nullable', 'exists:faskes,id'],
            'profile_pic_url' => ['nullable'],
            'status_user' => ['nullable'],
            'tanggal_meninggal' => ['nullable', 'date', 'after_or_equal:tanggal_lahir'],
        ];
    }
}
