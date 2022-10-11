<?php

namespace App\Http\Controllers;

use App\Querys\ArtworkDB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArtworkController extends Controller
{
    /**
     * Devuelve las obras del usuario logueado
     *
     * @return JsonResponse
     */
    public function getArtworks(): JsonResponse
    {
        $data = ArtworkDB::getUserArtworks();

        return response()->json($data, 200);
    }

    /**
     * elimina una obra de manera soft de la vista del usuario
     *
     * @param integer $id           El id de la obra
     * @return JsonResponse
     */
    public function deleteArtworks(int $id): JsonResponse
    {
        $res = ArtworkDB::softDelete($id);

        if ($res) {
            return response()->json($res, 200);
        }

        return response()->json($res, 500);
    }
}
