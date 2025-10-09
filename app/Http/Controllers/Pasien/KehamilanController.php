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
    public function viewPerkembanganKehamilan()
    {

        $pregnant = Kehamilan::where('user_id', Auth::id())
            ->where('status', 'Aktif')->first();

        $growth = PemeriksaanAnc::where('kehamilan_id', $pregnant->id)->get();
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
            ->get(); // ✅ Ambil SEMUA data sekaligus

        return Inertia::render('Pasien/Riwayat/PregnancyCheckupHistoryPageRoute', [
            'checkupHistory' => $checkupHistory,
        ]);
    }
}
