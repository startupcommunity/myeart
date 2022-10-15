<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function getCategories(): JsonResponse
    {
        try {
            $categories = Category::where('status', 1)->get();
            return response()->json($categories, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }
}
