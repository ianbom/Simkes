<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelahiran extends Model
{

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
        public function kehamilan() {
        return $this->belongsTo(Kehamilan::class);
    }
    public function faskes() {
        return $this->belongsTo(Faskes::class);
    }
    public function anak() {
        return $this->hasMany(Anak::class);
    }
}
