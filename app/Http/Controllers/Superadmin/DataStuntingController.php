<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Faskes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataStuntingController extends Controller
{

   public function dataStuntingAnak() {
   $stuntingAnak = Faskes::select('faskes.id', 'faskes.nama', 'faskes.alamat', 'faskes.latitude', 'faskes.longitude')
    ->leftJoin('users', 'users.faskes_id', '=', 'faskes.id')
    ->leftJoinSub(
        DB::table('pemeriksaan_anak as pa1')
            ->select('pa1.*')
            ->whereRaw('pa1.tanggal_pemeriksaan = (
                SELECT MAX(pa2.tanggal_pemeriksaan)
                FROM pemeriksaan_anak pa2
                WHERE pa2.anak_id = pa1.anak_id
            )'),
        'pemeriksaan_anak',
        'pemeriksaan_anak.petugas_faskes_id',
        '=',
        'users.id'
    )
    ->selectRaw("
        COUNT(
            DISTINCT CASE
                WHEN (pemeriksaan_anak.tinggi_badan_cm < 70 AND pemeriksaan_anak.usia_saat_periksa_bulan < 12)
                  OR (pemeriksaan_anak.tinggi_badan_cm < 80 AND pemeriksaan_anak.usia_saat_periksa_bulan BETWEEN 12 AND 24)
                THEN pemeriksaan_anak.anak_id
            END
        ) AS jumlah_stunting
    ")
    ->groupBy('faskes.id', 'faskes.nama', 'faskes.alamat')
    ->get();

    return view('superadmin.data-stunting.data-balita', compact('stuntingAnak'));
}

public function dataStuntingJanin()
{
    $janinTidakNormal = Faskes::select(
            'faskes.id',
            'faskes.nama',
            'faskes.alamat',
            'faskes.latitude',
            'faskes.longitude'
        )
        ->leftJoin('users', 'users.faskes_id', '=', 'faskes.id')
        ->leftJoinSub(
            DB::table('pemeriksaan_anc as anc1')
                ->select('anc1.*')
                ->whereRaw('anc1.tanggal_checkup = (
                    SELECT MAX(anc2.tanggal_checkup)
                    FROM pemeriksaan_anc anc2
                    WHERE anc2.kehamilan_id = anc1.kehamilan_id
                )'),
            'pemeriksaan_anc',
            'pemeriksaan_anc.petugas_faskes_id',
            '=',
            'users.id'
        )
        ->leftJoin('data_janin', 'data_janin.pemeriksaan_anc_id', '=', 'pemeriksaan_anc.id')
        ->selectRaw("
            COUNT(
                DISTINCT CASE
                    WHEN
                        (data_janin.taksiran_berat_janin IS NOT NULL AND data_janin.taksiran_berat_janin < 2500)
                        OR (data_janin.panjang_janin_cm IS NOT NULL AND data_janin.panjang_janin_cm < 45)
                        OR (data_janin.denyut_jantung_janin IS NOT NULL AND
                            (data_janin.denyut_jantung_janin < 110 OR data_janin.denyut_jantung_janin > 160))
                    THEN data_janin.id
                END
            ) AS jumlah_janin_tidak_normal
        ")
        ->groupBy('faskes.id', 'faskes.nama', 'faskes.alamat', 'faskes.latitude', 'faskes.longitude')
        ->get();

    // return response()->json($janinTidakNormal);

    return view('superadmin.data-stunting.data-janin', compact('janinTidakNormal'));
}



}
