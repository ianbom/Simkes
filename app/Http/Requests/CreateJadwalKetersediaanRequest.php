<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateJadwalKetersediaanRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'petugas_faskes_id' => 'nullable',
            'tanggal' => 'nullable',
            'jam_mulai' => 'nullable',
            'jam_selesai' => 'nullable',

        ];
    }
}
