<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateFaskesRequest;
use App\Models\Faskes;
use App\Services\FaskesService;
use App\Services\LokasiService;
use Illuminate\Http\Request;

class FaskesController extends Controller
{

    protected $lokasiService;
    protected $faskesService;

    public function __construct(LokasiService $lokasiService, FaskesService $faskesService){
        $this->lokasiService = $lokasiService;
        $this->faskesService = $faskesService;
    }

    public function index(){
        $faskes = Faskes::orderBy('nama', 'asc')->get();
        return view('superadmin.faskes.index',[
            'faskes' => $faskes]);
    }

    public function store(CreateFaskesRequest $request)
    {
        try {
            $faskes = $this->faskesService->createFaskes($request->validated());

            return redirect()
                ->route('superadmin.faskes.index')
                ->with('success', 'Faskes berhasil dibuat');

        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal membuat faskes: ' . $e->getMessage());
        }
    }

      public function create()
    {
        $data = $this->faskesService->getCreateFormData();

        // return response()->json(['data' => $data]);

        return view('superadmin.faskes.create', $data);
    }

    public function show(Faskes $faskes){
        return view('superadmin.faskes.show', [
            'faskes' => $faskes
        ]);
    }
}
