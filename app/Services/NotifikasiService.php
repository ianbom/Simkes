<?php

namespace App\Services;

use App\Models\JadwalNotifikasi;
use Carbon\Carbon;

class NotifikasiService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function createJadwalNotifikasiKehamilan($tglHpht, $userId) {
    $hpht = Carbon::parse($tglHpht);
    $jadwalTrimester = [
        [
            'minggu' => 6,
            'judul' => 'Pemeriksaan Trimester 1 - Awal Kehamilan',
            'konten' => 'Waktunya pemeriksaan pertama untuk memastikan kondisi janin dan ibu dalam keadaan sehat.',
            'tipe' => 'Trimester 1',
        ],
        [
            'minggu' => 12,
            'judul' => 'Pemeriksaan Trimester 1 - Akhir Trimester',
            'konten' => 'Segera lakukan pemeriksaan trimester pertama untuk memantau pertumbuhan janin.',
            'tipe' => 'Trimester 1',
        ],
        [
            'minggu' => 24,
            'judul' => 'Pemeriksaan Trimester 2',
            'konten' => 'Jangan lupa kontrol kehamilan untuk pemeriksaan tekanan darah dan perkembangan janin.',
            'tipe' => 'Trimester 2',
        ],
        [
            'minggu' => 30,
            'judul' => 'Pemeriksaan Trimester 3 - Awal Trimester',
            'konten' => 'Pemeriksaan trimester ketiga penting untuk memantau posisi dan kondisi janin.',
            'tipe' => 'Trimester 3',
        ],
        [
            'minggu' => 34,
            'judul' => 'Pemeriksaan Trimester 3 - Persiapan Persalinan',
            'konten' => 'Pastikan kondisi ibu dan janin optimal menjelang persalinan.',
            'tipe' => 'Trimester 3',
        ],
        [
            'minggu' => 38,
            'judul' => 'Pemeriksaan Trimester 3 - Menjelang Persalinan',
            'konten' => 'Lakukan pemeriksaan akhir menjelang hari perkiraan lahir (HPL).',
            'tipe' => 'Trimester 3',
        ],
    ];

    foreach ($jadwalTrimester as $jadwal) {
        $tanggal = $hpht->copy()->addWeeks($jadwal['minggu']);

        JadwalNotifikasi::create([
            'user_id' => $userId,
            'tanggal_dijadwalkan' => $tanggal->format('Y-m-d'),
            'judul' => $jadwal['judul'],
            'konten' => $jadwal['konten'],
            'tipe' => $jadwal['tipe'],
        ]);
    }

    return true;
}

public function createJadwalNotifikasiAnak($tglLahir, $userId)
{
    $tanggalLahir = Carbon::parse($tglLahir);
    for ($bulan = 1; $bulan <= 60; $bulan++) {
    JadwalNotifikasi::create([
        'user_id' => $userId,
        'tanggal_dijadwalkan' => $tanggalLahir->copy()->addMonths($bulan)->format('Y-m-d'),
        'judul' => "Pemeriksaan Anak Usia {$bulan} Bulan",
        'konten' => "Waktunya pemeriksaan rutin anak usia {$bulan} bulan.",
        'tipe' => 'Pemeriksaan Anak',
    ]);
}


    return true;
}
}
