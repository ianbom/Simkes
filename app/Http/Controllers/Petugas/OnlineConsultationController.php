<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OnlineConsultationController extends Controller
{
     protected $dashboardService;

    public function __construct(DashboardService $dashboardService){
        $this->dashboardService = $dashboardService;
    }

    public function index(){

        $consulQueue = $this->dashboardService->getConsulQueue();

        return Inertia::render('Petugas/Konsultasi/ListConsultationPageRoute',
    ['consulQueue' => $consulQueue]);

    }
}
