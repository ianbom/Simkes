<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Faskes;

class FaskesController extends Controller
{
    public function index()
    {
        $faskes = Faskes::with('kecamatan', 'kota', 'provinsi')->get();
        return Inertia::render('Pasien/Faskes/FaskesPageRoute', [
            'faskes' => $faskes
        ]);
    }
    public function show($id)
    {
        $faskesDetail = Faskes::with('kecamatan', 'kota', 'provinsi')->findOrFail($id);
        return Inertia::render('Pasien/Faskes/DetailFaskesPageRoute', [
            'faskesDetail' => $faskesDetail
        ]);
    }
    public function mapFaskes()
    {
        $faskes = Faskes::select('id', 'nama', 'latitude', 'longitude', 'tipe_faskes', 'alamat', 'profile_pic_url')->get();
        return Inertia::render('Pasien/Faskes/MapFaskesPageRoute', [
            'faskes' => $faskes,
        ]);
    }
}
