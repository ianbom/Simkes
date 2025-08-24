<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [
      'id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function faskes() {
        return $this->belongsTo(Faskes::class);
    }
    public function riwayatMedis() {
        return $this->hasOne(RiwayatMedisUser::class);
    }
    public function kehamilan() {
        return $this->hasMany(Kehamilan::class);
    }
    public function anak() {
        return $this->hasManyThrough(Anak::class, Kelahiran::class);
    }
    public function notifikasi() {
        return $this->hasMany(Notifikasi::class);
    }
    public function jadwalKetersediaan() {
        return $this->hasMany(JadwalKetersediaan::class, 'petugas_faskes_id');
    }
    public function sesiKonsultasiSebagaiPasien() {
        return $this->hasMany(SesiKonsultasi::class, 'pasien_user_id');
    }
    public function sesiKonsultasiSebagaiPetugas() {
        return $this->hasMany(SesiKonsultasi::class, 'petugas_faskes_id');
    }
    public function kegiatan() {
        return $this->hasMany(KegiatanFaskes::class, 'user_id_pembuat');
    }
    public function langganan() {
        return $this->hasMany(LanggananFaskes::class);
    }
}
