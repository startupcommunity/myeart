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
        $paises_all = Paises::select('paises.id as id','paises.nombre as nombre')
        ->where('paises.activo',1)
        ->get();

        return response()->json(['success' => true, 'data' => $paises_all ], 200);
    }
}
