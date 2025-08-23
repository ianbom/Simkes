<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Provinsi;
use Illuminate\Http\Request;

class ProvinsiController extends Controller
{
    public function index(){
        $provinsi = Provinsi::orderBy('nama', 'asc')->get();
        return view('superadmin.provinsi.index',[
            'provinsi' => $provinsi
        ]);
    }
     public function edit(Provinsi $provinsi){

        return view('superadmin.provinsi.index',[
            'provinsi' => $provinsi
        ]);
    }
}
