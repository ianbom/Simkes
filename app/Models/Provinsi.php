<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    public function kota() {
        return $this->hasMany(Kota::class);
    }

    public function user() {
        return $this->hasMany(User::class);
    }
}
