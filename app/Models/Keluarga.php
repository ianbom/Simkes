<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keluarga extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'keluarga';

    public function anggota(){
        return $this->hasMany(KeluargaAnggota::class);
    }
}
