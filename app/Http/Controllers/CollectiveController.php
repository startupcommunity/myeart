<?php

namespace App\Http\Controllers;

use App\Factories\CollectiveFactory;
use App\Http\Requests\CreateCollectiveRequest;
use App\Querys\CollectiveDB;
use App\Utils\ResponseJson;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CollectiveController extends Controller
{
    public function __construct(
        private CollectiveFactory $factory,
        private CollectiveDB $db,
        private ResponseJson $resp
    ) {
    }

    /**
     * Crea u nuevo colectivo para el usuario autenticado
     */
    public function store(CreateCollectiveRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->store($request);
            return $this->resp->json($data, is_object($data) ? 201 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * devuelve un colectivo
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getCollective(int $id): JsonResponse
    {
        try {
            $data = $this->db->getCollective($id);
            return $this->resp->json($data, is_object($data) ? 200 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
