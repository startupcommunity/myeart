<?php

namespace App\Http\Controllers;

use App\Factories\CollectiveFactory;
use App\Http\Requests\CreateCollectiveRequest;
use App\Querys\CollectiveDB;
use App\Utils\ResponseJson;
use Exception;
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
    public function store(CreateCollectiveRequest $request)
    {
        try {
            $data = $this->factory->store($request);
            return $this->resp->json($data, is_object($data) ? 201 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
