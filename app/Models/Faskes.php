<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faskes extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
     public function kecamatan() {
        return $this->belongsTo(Kecamatan::class);
    }

     public function users() {
        return $this->hasMany(User::class);
    }
    public function kegiatan() {
        return $this->hasMany(KegiatanFaskes::class);
    }
    public function langganan() {
        return $this->hasMany(LanggananFaskes::class);
    }
}
