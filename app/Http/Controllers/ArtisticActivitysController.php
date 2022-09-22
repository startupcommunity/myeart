<?php

namespace App\Http\Controllers;

use App\Models\Artistic_activitys;
use Illuminate\Http\Request;

class ArtisticActivitysController extends Controller
{
    /**
     * Show items
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        $item_all = Artistic_activitys::select('id as id','nombre as nombre','icon')
        ->where('activo',1)
        ->get();

        return response()->json(['success' => true, 'data' => $item_all ], 200);
    }
}
