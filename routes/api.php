<?php

use App\Http\Controllers\Petugas\PemeriksaanAnakController;
use App\Http\Controllers\Petugas\PemeriksaanAncController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/pemeriksaan', [PemeriksaanAncController::class, 'store']);
Route::post('/bom', [PemeriksaanAnakController::class, 'store']);
