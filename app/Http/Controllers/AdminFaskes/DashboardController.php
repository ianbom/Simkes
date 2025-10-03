<?php

namespace App\Http\Controllers\AdminFaskes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        return view('admin-faskes.dashboard.index');
    }
}
