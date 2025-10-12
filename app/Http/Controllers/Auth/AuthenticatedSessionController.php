<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();
    $user = Auth::user();

    switch ($user->role) {
        case 'Warga':
            $redirect = '/pasien/dashboard';
            break;

        case 'Petugas Faskes':
            $redirect = '/petugas/dashboard';
            break;

        case 'Admin Faskes':
            $redirect = '/admin-faskes/dashboard';
            break;

        case 'Superadmin':
            $redirect = '/superadmin/dashboard';
            break;

        default:
            $redirect = '/dashboard'; // fallback umum
            break;
    }

    return redirect()->intended($redirect);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function loginApi(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }
        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('SIMKESIA-API')->plainTextToken;
        return response()->json([
            'status' => true,
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function me(){
        try {
           $user = Auth::user();
        return response()->json($user);
        } catch (\Throwable $th) {
        return response()->json($th->getMessage());
        }

    }
}
