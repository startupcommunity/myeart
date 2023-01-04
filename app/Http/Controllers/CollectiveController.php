<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProfilePhotoCollectiveRequest;
use App\Http\Requests\RemoveMemberFromCollectiveRequest;
use App\Http\Requests\CreateFrontPhotoCollectiveRequest;
use App\Http\Requests\SendInvitationCollectiveRequest;
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

    /**
     * devuelve todos los colectivos del usuario autenticado
     * o indicado por el parámetro
     * incluye los colectivos creados e invitado
     *
     * @param int|null $id
     * @return JsonResponse
     */
    public function getUserCollective(?int $id = null): JsonResponse
    {
        try {
            $data = $this->db->getUserCollective($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * devuelve todos las publicaciones del colectivo
     * tanto de los miembros como del creador
     *
     * @param int $id           id del colectivo
     * @return JsonResponse
     */
    public function getReleaseCollective(int $id): JsonResponse
    {
        try {
            $data = $this->db->getReleaseCollective($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * devuelve las publicaciones del colectivo
     * filtradas por la opción indicada
     *
     * @param int $id           id del colectivo
     * @return JsonResponse
     */
    public function getReleaseCollectiveByOption(Request $request, int $id): JsonResponse
    {
        try {
            $data = $this->db->getReleaseCollectiveByOption($request, $id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Envía una invitación a un usuario para unirse al colectivo
     *
     * @param SendInvitationCollectiveRequest $request
     * @return JsonResponse
     */
    public function sendInvitation(SendInvitationCollectiveRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->sendInvitation($request);
            return $this->resp->json($data, $data ? 201 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * devuelve los miembros de un colectivo
     *
     * @param int $id           id del colectivo
     * @return JsonResponse
     */
    public function getMembers(int $id): JsonResponse
    {
        try {
            $data = $this->db->getMembers($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * elimina un miembro del colectivo
     *
     * @param RemoveMemberFromCollectiveRequest $request
     * @return JsonResponse
     */
    public function removeMember(RemoveMemberFromCollectiveRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->removeMember($request);
            return $this->resp->json($data, $data ? 200 : 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * devuelve las obras de un colectivo
     *
     * @param int $id           id del colectivo
     * @return JsonResponse
     */
    public function getArtworks(int $id): JsonResponse
    {
        try {
            $data = $this->db->getArtworks($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
