<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Kehamilan;
use App\Models\PemeriksaanAnc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KehamilanController extends Controller
{
    public function viewPerkembanganKehamilan(){

        $pregnant = Kehamilan::where('user_id', Auth::id())
        ->where('status', 'Aktif')->first();

        $growth = PemeriksaanAnc::where('kehamilan_id', $pregnant->id)->get();

    }
}
