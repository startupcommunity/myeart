<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;

class SubCategoryController extends Controller
{
    private $resp;

    public function __construct(ResponseJson $resp)
    {
        $this->resp = $resp;
    }

    /**
     * Obtiene las subcategorias de una categoría enviada
     * por parámetro
     *
     * @param integer $id           id de la categoría
     * @return JsonResponse
     */
    public function getSubcategories(int $id): JsonResponse
    {
        $resp = SubCategory::with('labels')->where('category_id', $id)->get();

        if (!$resp) {
            return $this->resp->json('Error al obtener la información', 500);
        }

        return $this->resp->json($resp, 200);
    }
}
