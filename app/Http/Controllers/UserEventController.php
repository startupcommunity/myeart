<?php

namespace App\Http\Controllers;

use App\Factories\EventFactory;
use App\Http\Requests\CreateUserEventRequest;
use App\Models\UserEvent;
use App\Querys\EventDB;
use App\Utils\ResponseJson;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserEventController extends Controller
{
    public function __construct(
        private EventFactory $factory,
        private EventDB $db,
        private ResponseJson $resp
    ) {
    }

    /**
     * obtiene todos los eventos
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        try {
            $events = $this->db->all();
            return $this->resp->json($events, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Crea un nuevo evento
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(CreateUserEventRequest $request): JsonResponse
    {
        try {
            $event = $this->factory->store($request);
            return $this->resp->json($event, 201);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
