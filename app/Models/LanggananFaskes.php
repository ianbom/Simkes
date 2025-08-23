<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LanggananFaskes extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'langganan_faskes';
     public function user() {
        return $this->belongsTo(User::class);
    }
    public function faskes() {
        return $this->belongsTo(Faskes::class);
    }
}
