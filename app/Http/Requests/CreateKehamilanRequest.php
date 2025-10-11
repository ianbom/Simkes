<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateKehamilanRequest extends FormRequest
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
            'kehamilan_ke' => 'nullable|integer|min:1',
            'hpht' => 'nullable|date',
            'hpl' => 'nullable|date|after:hpht',
            'tinggi_badan_awal' => 'nullable|numeric|min:100|max:250',
            'jumlah_janin' => 'nullable|integer|min:1|max:5',
            'status' => 'nullable|in:Aktif,Selesai,Keguguran',
            'user_id' => 'nullable|exists:users,id',
        ];
    }
}
