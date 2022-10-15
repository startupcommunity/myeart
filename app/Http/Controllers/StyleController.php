<?php

namespace App\Http\Controllers;

use App\Models\Style;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StyleController extends Controller
{
    public function getStyles(): JsonResponse
    {
        try {
            $categories = Style::where('status', 1)->get();
            return response()->json($categories, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }
}
