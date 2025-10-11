<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAnakRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'orang_tua_id'       => 'nullable',
            'kelahiran_id'       => 'nullable|exists:kelahiran,id',
            'nama'               => 'nullable|string|max:255',
            'nik'               => 'nullable|string|max:255',
            'kelamin'            => 'required|in:L,P',
            'status_hidup'       => 'required|in:Hidup,Meninggal',
            'tanggal_lahir'      => 'nullable|date',
            'tanggal_meninggal'  => 'nullable|date|after_or_equal:tanggal_lahir',
            'berat_lahir_gram'   => 'nullable|integer|min:500|max:7000',
            'panjang_lahir_cm'   => 'nullable|numeric|min:20|max:70',
            'lingkar_kepala_cm'  => 'nullable|numeric|min:10|max:60',
            'urutan_kelahiran'   => 'nullable|integer|min:1|max:20',
            'kondisi'            => 'nullable|string|max:255',
        ];
    }


}
