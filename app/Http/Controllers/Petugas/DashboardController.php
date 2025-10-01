<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Models\PemeriksaanAnak;
use App\Models\PemeriksaanAnc;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService){
        $this->dashboardService = $dashboardService;
    }

    public function index(){

        $lastestPregnantPatients = $this->dashboardService->getLatestPregnantPatient();
        $lastestChildPatients = $this->dashboardService->getLatestChildPatient();
        $consulQueue = $this->dashboardService->getConsulQueue();


        return Inertia::render('Petugas/Dashboard/DashboardPageRoute', [
            'lastestPregnantPatients' => $lastestPregnantPatients,
            'lastestChildPatients' => $lastestChildPatients,
            'consulQueue' => $consulQueue
        ]);
    }
}
