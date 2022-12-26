<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProfilePhotoCollectiveRequest;
use App\Http\Requests\CreateFrontPhotoCollectiveRequest;
use App\Http\Requests\CreateCollectiveRequest;
use App\Factories\CollectiveFactory;
use Illuminate\Http\JsonResponse;
use App\Querys\CollectiveDB;
use Illuminate\Http\Request;
use App\Utils\ResponseJson;
use Exception;

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
     *
     * @param CreateCollectiveRequest $request
     * @return JsonResponse
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

    /**
     * Actualiza un colectivo
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(CreateCollectiveRequest $request, int $id): JsonResponse
    {
        try {
            $this->authorize('update', $this->db->getCollective($id));
            $resp = $this->factory->update($request, $id);
            return $this->resp->json($resp, $resp ? 200 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * actualiza la foto de perfil de un colectivo
     *
     * @param CreateProfilePhotoCollectiveRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateProfilePhoto(CreateProfilePhotoCollectiveRequest $request, int $id): JsonResponse
    {
        try {
            $this->authorize('update', $this->db->getCollective($id));
            $resp = $this->factory->updateProfilePhoto($request, $id);
            return $this->resp->json($resp, $resp ? 200 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * actualiza la foto de portada de un colectivo
     *
     * @param CreateFrontPhotoCollectiveRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateFrontPhoto(CreateFrontPhotoCollectiveRequest $request, int $id): JsonResponse
    {
        try {
            $this->authorize('update', $this->db->getCollective($id));
            $resp = $this->factory->updateFrontPhoto($request, $id);
            return $this->resp->json($resp, $resp ? 200 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
