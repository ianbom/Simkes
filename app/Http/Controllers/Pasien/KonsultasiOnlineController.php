<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateSesiKonsultasiRequest;
use App\Models\JadwalKetersediaan;
use App\Models\SesiKonsultasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class KonsultasiOnlineController extends Controller
{
    public function index()
    {
        $schedule = JadwalKetersediaan::with('petugas.faskes')->where('status_ketersediaan', 'Tersedia')->get();

        return Inertia::render('Pasien/Konsultasi/ConsultationPageRoute', [
            'schedule' => $schedule
        ]);
    }

    public function bookConsult(CreateSesiKonsultasiRequest $request, $id)
    {

        try {
            $data = $request->validated();
            $jadwal = JadwalKetersediaan::findOrFail($id);
            $jadwal->update(['status_ketersediaan' => 'Penuh']);

            $data['petugas_faskes_id'] = $jadwal->petugas_faskes_id;
            $data['jadwal_id'] = $id;
            $data['waktu_mulai_dijadwalkan'] = $jadwal->tanggal . ' ' . $jadwal->jam_mulai;
            $data['durasi'] = 60;
            $data['room_name'] = 'room-' . Str::random(10);
            $data['link_video_conference'] = 'https://meet.jit.si/' . $data['room_name'];
            $data['status_sesi'] = 'Dipesan';
            $data['pasien_user_id'] = Auth::id();

            $sesi = SesiKonsultasi::create($data);

            return redirect()->back()->with('success', 'Sesi konsultasi berhasil dipesan!');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Terjadi kesalahan');
        }
    }

    public function consultHistory()
    {
        $consultations = SesiKonsultasi::with('petugas.faskes', 'jadwal')->where('pasien_user_id', Auth::id())->get();
        return Inertia::render('Pasien/Riwayat/ConsultationHistoryPageRoute', [
            'consultations' => $consultations
        ]);
    }

    public function joinMeet($id)
    {
        $consultation = SesiKonsultasi::with('petugas.faskes', 'jadwal', 'pasien')->findOrFail($id);
        // return response()->json($consultation);
        return Inertia::render('Pasien/Konsultasi/ConsultationDetailPageRoute', [
            'consultation' => $consultation
        ]);
    }
}
