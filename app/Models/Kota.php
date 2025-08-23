<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kota extends Model
{

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'kota';
    public function provinsi() {
        return $this->belongsTo(Provinsi::class);
    }

    public function kecamatan() {
        return $this->hasMany(Kecamatan::class);
    }
}
