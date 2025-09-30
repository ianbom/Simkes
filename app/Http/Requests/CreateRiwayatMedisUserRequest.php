<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRiwayatMedisUserRequest extends FormRequest
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
            // 'user_id'          => 'required|exists:users,id|unique:riwayat_medis_user,user_id',
            'golongan_darah'   => 'nullable|in:A,B,AB,O',
            'rhesus'           => 'nullable|in:+,-',
            'jumlah_keguguran' => 'nullable|integer|min:0',
            'riwayat_alergi'   => 'nullable|string|max:1000',
        ];
    }
}
