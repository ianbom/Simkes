<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeluargaAnggota extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'keluarga_anggota';

    public function keluarga(){
        return $this->belongsTo(Keluarga::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
