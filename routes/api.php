<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\Petugas\PemeriksaanAnakController;
use App\Http\Controllers\Petugas\PemeriksaanAncController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/pemeriksaan-hamil', [PemeriksaanAncController::class, 'store']);
Route::post('/pemeriksaan-anak', [PemeriksaanAnakController::class, 'store']);

Route::post('login', [AuthenticatedSessionController::class, 'loginApi']);
Route::get('me', [AuthenticatedSessionController::class, 'me'])->middleware('auth:sanctum');
// Route::post('chat', [ChatBotController::class, 'chat'])->middleware('auth');
