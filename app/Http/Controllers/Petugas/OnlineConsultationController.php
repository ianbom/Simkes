<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Models\SesiKonsultasi;
use App\Services\DashboardService;
use App\Services\OnlineConsultationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnlineConsultationController extends Controller
{
    protected $dashboardService, $onlineConsultationService;

    public function __construct(DashboardService $dashboardService, OnlineConsultationService $onlineConsultationService)
    {
        $this->dashboardService = $dashboardService;
        $this->onlineConsultationService = $onlineConsultationService;
    }

    public function index()
    {
        $consulQueue = $this->dashboardService->getConsulQueue();
        return Inertia::render(
            'Petugas/Konsultasi/ListConsultationPageRoute',
            ['consulQueue' => $consulQueue]
        );
    }

    public function joinMeet($id)
    {
        $sesiKonsultasi = $this->onlineConsultationService->getSesiKonsultasiById($id);
        $roomName = $sesiKonsultasi->room_name;
        $user = Auth::user();

        return Inertia::render('Petugas/Konsultasi/ConsultationPageRoute', [
            'sesiKonsultasi' => $sesiKonsultasi,
            'roomName' => $roomName,
            'user' => $user
        ]);
    }

    public function listSchedulePetugas()
    {

        $schedule = $this->onlineConsultationService->listSchedulePetugas();

        return Inertia::render('Petugas/JadwalKetersediaan/ListJadwalKetersediaanPageRoute', [
            'schedule' => $schedule
        ]);
    }
}
