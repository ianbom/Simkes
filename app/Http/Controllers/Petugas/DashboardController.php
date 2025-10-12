<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateKehamilanRequest;
use App\Models\Anak;
use App\Models\Kehamilan;
use App\Models\PemeriksaanAnak;
use App\Models\PemeriksaanAnc;
use App\Models\User;
use App\Services\DashboardService;
use App\Services\NotifikasiService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $dashboardService;
    protected $notifikasiService;

    public function __construct(DashboardService $dashboardService, NotifikasiService $notifikasiService){
        $this->dashboardService = $dashboardService;
        $this->notifikasiService = $notifikasiService;
    }



    public function index(Request $request){

        $lastestPregnantPatients = $this->dashboardService->getLatestPregnantPatient();
        $lastestChildPatients = $this->dashboardService->getLatestChildPatient();
        $consulQueue = $this->dashboardService->getConsulQueue();
        $patient = null;
        $childPatient = null;
        $patientPregnant = null;

        if($request->has('patient_nik')){
            $patient = $this->dashboardService->getPatientByNik($request->patient_nik);

            if ($patient != null) {
            $childPatient = Anak::where('orang_tua_id', $patient->id)->get();
            $patientPregnant = Kehamilan::where('user_id', $patient->id)->get();
            }
        }

        return Inertia::render('Petugas/Dashboard/DashboardPageRoute', [
            'lastestPregnantPatients' => $lastestPregnantPatients,
            'lastestChildPatients' => $lastestChildPatients,
            'consulQueue' => $consulQueue,
            'childPatient' => $childPatient,
            'patientPregnant' => $patientPregnant,
            'patient' => $patient
        ]);
    }

    public function createKehamilan(CreateKehamilanRequest $request)
    {
        try {
            $kehamilan = $this->dashboardService->createKehamilan($request->validated());
            $jadwalNotifikasi = $this->notifikasiService->createJadwalNotifikasiKehamilan($request['hpht'], $request['user_id']);

            return redirect()->route('petugas.dashboard.index')->with('success', 'Data kehamilan berhasil ditambahkan.');
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

}
