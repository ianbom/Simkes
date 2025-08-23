<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFaskesRequest extends FormRequest
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
            'nama' => [
                'required',
                'string',
                'max:255',
                'unique:faskes,nama'
            ],
            'tipe_faskes' => [
                'required',
                'in:Puskesmas,Klinik,RSIA,RSUD,Posyandu'
            ],
            'alamat' => [
                'nullable',
                'string',
                'max:1000'
            ],
            'provinsi_id' => [
                'required',
                'integer',
                'exists:provinsi,id'
            ],
            'kota_id' => [
                'required',
                'integer',
                'exists:kota,id'
            ],
            'kecamatan_id' => [
                'required',
                'integer',
                'exists:kecamatan,id'
            ],
            'profile_pic' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:2048' // 2MB
            ],
            'deskripsi' => [
                'nullable',
                'string',
                'max:2000'
            ]
        ];
    }
}
