<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserFaskesRequest;
use App\Models\Faskes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FaskesUserController extends Controller
{
    public function index(){
        $users = User::whereIn('role', ['Petugas Faskes', 'Admin Faskes'])->orderBy('name', 'asc')->get();
        return view('superadmin.faskes_user.index', ['users' => $users]);
    }

    public function create(){
        $faskes = Faskes::orderBy('nama', 'asc')->get();
        return view('superadmin.faskes_user.create',
    ['faskes' => $faskes]);
    }

    public function store(CreateUserFaskesRequest $request){

        DB::beginTransaction();
        try {
            $data = $request->validated();
            $data['password'] = Hash::make($data['password']);

            User::create($data);
            DB::commit();
            // dd($data);
            return redirect()->route('superadmin.faskes-user.index')->with('success', 'Pengguna berhasil dibuat');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', $th->getMessage());
        }

    }
}
