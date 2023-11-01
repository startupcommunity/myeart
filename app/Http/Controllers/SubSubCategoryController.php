<?php

namespace App\Http\Controllers;

use App\Models\SubSubCategory;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;

class SubSubCategoryController extends Controller
{
    private $resp;

    public function __construct(ResponseJson $resp)
    {
        $this->resp = $resp;
    }

    /**
     * Devuelve las etiquetas de una categoría
     *
     * @param integer $category_id
     * @param integer $sub_category_id
     * @return JsonResponse
     */
    public function getLabels(int $category_id, int $sub_category_id): JsonResponse
    {
        $resp = SubSubCategory::where('category_id', $category_id)
            ->where('sub_category_id', $sub_category_id)
            ->get();

        if (!$resp) {
            return $this->resp->json('Error al obtener la información', 500);
        }

        return $this->resp->json($resp, 200);
    }
}
