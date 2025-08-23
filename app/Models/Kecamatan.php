<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'kecamatan';
    public function kota() {
        return $this->belongsTo(Kota::class);
    }

     public function faskes() {
        return $this->hasMany(Faskes::class);
    }

     public function user() {
        return $this->hasMany(User::class);
    }


}
