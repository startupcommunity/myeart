<?php

namespace App\Http\Controllers;

use App\Models\Technique;
use Illuminate\Http\JsonResponse;

class TechniqueController extends Controller
{
    public function getTechniques(): JsonResponse
    {
        try {
            $categories = Technique::where('status', 1)->get();
            return response()->json($categories, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }
}
