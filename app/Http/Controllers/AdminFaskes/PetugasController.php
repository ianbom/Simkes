<?php

namespace App\Http\Controllers\AdminFaskes;

use App\Http\Controllers\Controller;
use App\Services\PetugasService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PetugasController extends Controller
{

    protected $petugasService;

    public function __construct(PetugasService $petugasService)
    {
        $this->petugasService = $petugasService;
    }


    public function index(){
        $faskesId = Auth::user()->faskes_id;

        $petugas = $this->petugasService->getPetugasByFaskedId($faskesId);
        // return response()->json([
        //     'data' => $petugas
        // ]);
        return view('admin-faskes.petugas.index', [
            'petugas' => $petugas
        ]);
    }
}
