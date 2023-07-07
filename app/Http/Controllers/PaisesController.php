<?php

namespace App\Http\Controllers;

use App\Models\Paises;
use Illuminate\Http\Request;

class PaisesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $paises_all = Paises::where('activo', 1)->get();

        return response()->json(['success' => true, 'data' => $paises_all], 200);
    }
}
