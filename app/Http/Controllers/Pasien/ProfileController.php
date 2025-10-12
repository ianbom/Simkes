<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdateRiwayatMedisUserRequest;
use App\Models\Kecamatan;
use App\Models\Kota;
use App\Models\Provinsi;
use App\Models\RiwayatMedisUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function myProfile(){
    $user = Auth::user()->load('provinsi', 'kota', 'kecamatan', 'faskes');

    $provinsi = Provinsi::select('id', 'nama')->orderBy('nama')->get();
    $kota = Kota::select('id', 'nama', 'provinsi_id')->orderBy('nama')->get();
    $kecamatan = Kecamatan::select('id', 'nama', 'kota_id')->orderBy('nama')->get();

    $riwayatMedis = RiwayatMedisUser::where('user_id', $user->id)->first();

    return Inertia::render('Pasien/Profil/ProfilePageRoute', [
        'user' => $user,
        'provinsi' => $provinsi,
        'kota' => $kota,
        'kecamatan' => $kecamatan,
        'riwayatMedis' => $riwayatMedis,
    ]);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();

        try {
            if ($request->hasFile('profile_pic_url')) {
            if ($user->profile_pic_url && Storage::disk('public')->exists($user->profile_pic_url)) {
                Storage::disk('public')->delete($user->profile_pic_url);
            }
            $path = $request->file('profile_pic_url')->store('profile_pics', 'public');
            $data['profile_pic_url'] = $path;
        } else {
            $data['profile_pic_url'] = $user->profile_pic_url;
        }
        $user->update($data);

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
        } catch (\Throwable $th) {
        return response()->json(['error' => 'Terjadi kesalahan saat memperbarui profil.'], 500);
        }

    }

    public function updateRiwayatMedis(UpdateRiwayatMedisUserRequest $request){
    $user = Auth::user();
    $data = $request->validated();
    $riwayat = RiwayatMedisUser::updateOrCreate(
        ['user_id' => $user->id],
        [
            'golongan_darah' => $data['golongan_darah'] ?? null,
            'rhesus' => $data['rhesus'] ?? null,
            'jumlah_keguguran' => $data['jumlah_keguguran'],
            'riwayat_alergi' => $data['riwayat_alergi'] ?? null,
        ]
    );

    return back()->with('success', 'Riwayat medis berhasil diperbarui!');
}
}
