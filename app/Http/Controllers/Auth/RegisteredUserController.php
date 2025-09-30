<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
{
    $request->validate([
        'provinsi_id' => 'required|exists:provinsi,id',
        'kota_id' => 'required|exists:kota,id',
        'kecamatan_id' => 'required|exists:kecamatan,id',
        'faskes_id' => 'nullable|exists:faskes,id',
        'name' => 'required|string|max:255',
        'nik' => 'required|string|size:16|unique:users,nik',
        'tanggal_lahir' => 'required|date',
        'kelamin' => 'required|in:L,P',
        'no_telp' => 'required|string|unique:users,no_telp',
        'alamat' => 'required|string',
        'email' => 'required|string|lowercase|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
        'provinsi_id' => $request->provinsi_id,
        'kota_id' => $request->kota_id,
        'kecamatan_id' => $request->kecamatan_id,
        'faskes_id' => $request->faskes_id,
        'name' => $request->name,
        'nik' => $request->nik,
        'tanggal_lahir' => $request->tanggal_lahir,
        'kelamin' => $request->kelamin,
        'no_telp' => $request->no_telp,
        'alamat' => $request->alamat,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));
    Auth::login($user);

    return redirect('/dashboard');
}
}
