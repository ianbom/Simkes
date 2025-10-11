<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Keluarga;
use App\Models\KeluargaAnggota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class KeluargaController extends Controller
{

    public function viewKeluarga(){

        $userId = Auth::id();
        $anggota = KeluargaAnggota::where('user_id', $userId)->first();
        $keluarga = null;
        $allAnggota = null;
        if ($anggota) {
        $keluarga = Keluarga::findOrFail($anggota->keluarga->id);
        $allAnggota = KeluargaAnggota::with('user.anak', 'user.kehamilan')->where('keluarga_id', $keluarga->id)->get();
        }

        return Inertia::render('Pasien/Keluarga/KeluargaPageRoute', [
            'keluarga' => $keluarga,
            'allAnggota' => $allAnggota
        ]);
    }

    public function createKeluarga(Request $request){
    $request->validate([
        'family_name' => 'required|string|max:100',
    ]);

    try {
        return DB::transaction(function () use ($request) {

            $user = Auth::user();
            $familyCode = 'FAM-' . strtoupper(Str::random(6));

            // 🔹 Buat data keluarga
            $keluarga = Keluarga::create([
                'family_code' => $familyCode,
                'family_name' => $request->family_name,
                'created_by' => $user->id,
            ]);

            KeluargaAnggota::create([
                'keluarga_id' => $keluarga->id,
                'user_id' => $user->id,
            ]);

            return redirect()->back()->with('success', 'Data dibuat');
        });
    } catch (\Throwable $th) {
        return redirect()->back()->with('error', 'Terjadi kesalahan');
    }

}

public function joinKeluarga(Request $request)
{
    $request->validate([
        'family_code' => 'required|string|exists:keluarga,family_code',
    ]);

    try {
        $user = Auth::user();
        $keluarga = Keluarga::where('family_code', $request->family_code)->first();
        $alreadyMember = KeluargaAnggota::where('keluarga_id', $keluarga->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($alreadyMember) {
            return response()->json([
                'status' => false,
                'message' => 'Anda sudah tergabung dalam keluarga ini.',
            ], 409);
        }

        KeluargaAnggota::create([
            'keluarga_id' => $keluarga->id,
            'user_id' => $user->id,
        ]);

     return redirect()->back()->with('success', 'Berhasil bergabung');
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => 'Gagal bergabung ke keluarga: ' . $th->getMessage(),
        ], 500);
    }
}

}
