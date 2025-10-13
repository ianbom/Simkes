<?php

namespace App\Http\Controllers\AdminFaskes;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateJadwalKetersediaanRequest;
use App\Models\JadwalKetersediaan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JadwalKetersediaanController extends Controller
{
    public function index()
{
    $user = Auth::user();
    if (!$user->faskes_id) {
        return redirect()->back()->with('error', 'Anda belum terdaftar pada fasilitas kesehatan manapun.');
    }

    $jadwalKetersediaan = JadwalKetersediaan::whereHas('petugas', function ($query) use ($user) {
            $query->where('faskes_id', $user->faskes_id);
        })
        ->with(['petugas:id,name,faskes_id']) // eager load nama petugas
        ->orderBy('tanggal', 'desc')
        ->orderBy('jam_mulai', 'desc')
        ->get();

    // return response()->json($jadwalKetersediaan);

    return view('admin-faskes.jadwal-ketersediaan.index', compact('jadwalKetersediaan'));
}

    public function create(){

        $user = Auth::user();
        $petugasFaskes = User::where('role', 'Petugas Faskes')->where('faskes_id', $user->faskes_id)->get();


        return view('admin-faskes.jadwal-ketersediaan.create', compact('petugasFaskes'));
    }

    public function store(CreateJadwalKetersediaanRequest $request){
        $data = $request->validated();
        $data['status_ketersediaan'] = 'Tersedia';

        try {
           JadwalKetersediaan::create($data);

        return redirect()->route('admin.jadwal-ketersediaan.index')->with('success', 'Data berhasil disimpan');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Terjadi kesalahan');
        }




    }

}
