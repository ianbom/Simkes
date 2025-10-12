<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Kehamilan;
use App\Models\PemeriksaanAnc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KehamilanController extends Controller
{
    public function viewPerkembanganKehamilan($id)
    {
        $pregnant = Kehamilan::with('user', 'janin')->findOrFail($id);
        $growth = PemeriksaanAnc::with('hasilLab', 'petugas.faskes', 'riwayatSakitKehamilan')->where('kehamilan_id', $pregnant->id)->get();
        return Inertia::render('Pasien/Grafik/PregnancyGraphPageRoute', [
            'pregnant' => $pregnant,
            'growth' => $growth
        ]);
    }
    public function pregnancyCheckupHistory()
    {
        $user = Auth::user();

        $checkupHistory = PemeriksaanAnc::with([
            'kehamilan',
            'petugas.faskes',
            'dataJanin',
            'media',
            'hasilLab',
            'imunisasi',
            'resep',
        ])
            ->whereHas('kehamilan', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest('tanggal_checkup')
            ->get();

        $checkupHistory = $checkupHistory->map(function ($record) {
            return array_merge($record->toArray(), [
                'hasilLab' => $record->hasilLab,
                'dataJanin' => $record->dataJanin,
                'media' => $record->media,
                'imunisasi' => $record->imunisasi,
                'resep' => $record->resep,
            ]);
        });

        return Inertia::render('Pasien/Riwayat/PregnancyCheckupHistoryPageRoute', [
            'checkupHistory' => $checkupHistory,
        ]);
    }
}
