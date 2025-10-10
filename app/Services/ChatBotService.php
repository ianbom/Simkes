<?php

namespace App\Services;


use App\Models\Anak;
use App\Models\DataJanin;
use App\Models\HasilLab;
use App\Models\Kehamilan;
use App\Models\PemeriksaanAnak;
use App\Models\PemeriksaanAnc;
use App\Models\RiwayatMedisUser;
use App\Models\RiwayatSakitAnak;
use App\Models\RiwayatSakitKehamilan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatBotService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function resumeData(){
        $userId = Auth::id();
    $user = Auth::user();
    $riwayatMedis = RiwayatMedisUser::where('user_id', $userId)->get();
    $anak = Anak::where('orang_tua_id', $userId)->with([
        'pemeriksaanAnak',
        'riwayatSakitAnak'
    ])->get();

    $kehamilan = Kehamilan::where('user_id', $userId)->with([
        'pemeriksaanAnc.hasilLab',
        'dataJanin',
        'riwayatSakit'
    ])->get();

    $finalData = [
        'user' => $user,
        'riwayat_medis' => $riwayatMedis,
        'anak' => $anak->map(function ($anakItem) {
            return [
                'id' => $anakItem->id,
                'nama' => $anakItem->nama,
                'kelamin' => $anakItem->kelamin,
                'tanggal_lahir' => $anakItem->tanggal_lahir,
                'berat_lahir_gram' => $anakItem->berat_lahir_gram,
                'panjang_lahir_cm' => $anakItem->panjang_lahir_cm,
                'lingkar_kepala_cm' => $anakItem->lingkar_kepala_cm,
                'pemeriksaan_anak' => $anakItem->pemeriksaanAnak->map(function ($pemeriksaan) {
                    return [
                        'id' => $pemeriksaan->id,
                        'tanggal_pemeriksaan' => $pemeriksaan->tanggal_pemeriksaan,
                        'usia_saat_periksa_bulan' => $pemeriksaan->usia_saat_periksa_bulan,
                        'berat_badan_kg' => $pemeriksaan->berat_badan_kg,
                        'tinggi_badan_cm' => $pemeriksaan->tinggi_badan_cm,
                        'lingkar_kepala_cm' => $pemeriksaan->lingkar_kepala_cm,
                        'suhu_tubuh_celsius' => $pemeriksaan->suhu_tubuh_celsius,
                        'catatan_pemeriksaan' => $pemeriksaan->catatan_pemeriksaan
                    ];
                }),
                'riwayat_sakit_anak' => $anakItem->riwayatSakitAnak->map(function ($riwayatSakit) {
                    return [
                        'id' => $riwayatSakit->id,
                        'tanggal_sakit' => $riwayatSakit->tanggal_sakit,
                        'diagnosis' => $riwayatSakit->diagnosis,
                        'gejala' => $riwayatSakit->gejala,
                        'tindakan_pengobatan' => $riwayatSakit->tindakan_pengobatan,
                        'catatan' => $riwayatSakit->catatan
                    ];
                })
            ];
        }),
        'kehamilan' => $kehamilan->map(function ($kehamilanItem) {
            return [
                'id' => $kehamilanItem->id,
                'kehamilan_ke' => $kehamilanItem->kehamilan_ke,
                'hpht' => $kehamilanItem->hpht,
                'hpl' => $kehamilanItem->hpl,
                'status' => $kehamilanItem->status,
                'pemeriksaan_anc' => $kehamilanItem->pemeriksaanAnc->map(function ($pemeriksaan) {
                    return [
                        'id' => $pemeriksaan->id,
                        'tanggal_checkup' => $pemeriksaan->tanggal_checkup,
                        'jenis_pemeriksaan' => $pemeriksaan->jenis_pemeriksaan,
                        'berat_badan' => $pemeriksaan->berat_badan,
                        'tekanan_darah_sistolik' => $pemeriksaan->tekanan_darah_sistolik,
                        'tekanan_darah_diastolik' => $pemeriksaan->tekanan_darah_diastolik,
                        'tinggi_fundus' => $pemeriksaan->tinggi_fundus,
                        'keluhan' => $pemeriksaan->keluhan,
                        'catatan_petugas' => $pemeriksaan->catatan_petugas,
                        'hasil_lab' => $pemeriksaan->hasilLab->map(function ($lab) {
                            return [
                                'id' => $lab->id,
                                'nama_tes' => $lab->nama_tes,
                                'hasil' => $lab->hasil,
                                'satuan' => $lab->satuan,
                                'status' => $lab->status
                            ];
                        })
                    ];
                }),
                'janin' => $kehamilanItem->dataJanin->map(function ($janin) {
                    return [
                        'id' => $janin->id,
                        'urutan_janin' => $janin->urutan_janin,
                        'denyut_jantung_janin' => $janin->denyut_jantung_janin,
                        'posisi_janin' => $janin->posisi_janin,
                        'pergerakan_janin' => $janin->pergerakan_janin,
                        'taksiran_berat_janin' => $janin->taksiran_berat_janin,
                        'panjang_janin_cm' => $janin->panjang_janin_cm
                    ];
                }),
                'riwayat_sakit_kehamilan' => $kehamilanItem->riwayatSakitKehamilan->map(function ($riwayat) {
                    return [
                        'id' => $riwayat->id,
                        'tanggal_diagnosis' => $riwayat->tanggal_diagnosis,
                        'diagnosis' => $riwayat->diagnosis,
                        'gejala' => $riwayat->gejala,
                        'tindakan_pengobatan' => $riwayat->tindakan_pengobatan
                    ];
                })
            ];
        })
    ];
    return $finalData;
    }
}
