<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserEventFavoriteRequest;
use App\Http\Requests\CreateUserEventLikeRequest;
use App\Http\Requests\CreateUserEventRequest;
use Illuminate\Http\JsonResponse;
use App\Factories\EventFactory;
use Illuminate\Http\Request;
use App\Utils\ResponseJson;
use App\Querys\EventDB;
use Exception;

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
    public function all(Request $request): JsonResponse
    {
        try {
            $events = $this->db->all($request);
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

    /**
     * agrega a favoritos
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function addFavorite(CreateUserEventFavoriteRequest $request): JsonResponse
    {
        try {
            $event = $this->factory->addFavorite($request);
            return $this->resp->json($event, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * elimina de favoritos
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function removeFavorite(CreateUserEventFavoriteRequest $request): JsonResponse
    {
        try {
            $event = $this->factory->removeFavorite($request);
            return $this->resp->json($event, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Agrega un like
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function addLike(CreateUserEventLikeRequest $request): JsonResponse
    {
        try {
            $event = $this->factory->addLike($request);
            return $this->resp->json($event, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Elimina un like
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function removeLike(CreateUserEventLikeRequest $request): JsonResponse
    {
        try {
            $event = $this->factory->removeLike($request);
            return $this->resp->json($event, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Muestra el detalle de un evento
     *
     * @param  integer  $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $event = $this->db->find($id);
            return $this->resp->json($event, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
