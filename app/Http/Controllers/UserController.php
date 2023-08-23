<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFollowArtworkRequest;
use Illuminate\Http\JsonResponse;
use App\Factories\UserFactory;
use App\Querys\CollectiveDB;
use Illuminate\Http\Request;
use App\Utils\ResponseJson;
use App\Querys\UserDB;
use Exception;

class UserController extends Controller
{
    public function __construct(
        private UserFactory $userfactory,
        private ResponseJson $resp,
        private UserDB $db,
        private CollectiveDB $collectiveDB
    ) {
    }

    /**
     * Sigue a un artista indicado por request
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function followArtist(Request $request): JsonResponse
    {
        try {
            $this->userfactory->followArtist($request);
            return $this->resp->json('artista seguido con éxito', 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Deja de seguir a un artista indicado por request
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function unfollowArtist(Request $request): JsonResponse
    {
        try {
            $this->userfactory->unfollowArtist($request);
            return $this->resp->json('el artista se ha dejado de seguir con éxito', 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devuelve los artistas seguidos por el usuario logueado
     *
     * @return JsonResponse
     */
    public function getFollowArtists(): JsonResponse
    {
        try {
            $resp = $this->db->getFollowArtists();
            return $this->resp->json($resp, 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devuelve los artistas seguidos por el usuario,
     * solo la info corta y básica de los artistas,
     * como el nombre, el id...
     *
     * @return JsonResponse
     */
    public function getFollowArtistsShortInfo(): JsonResponse
    {
        try {
            $resp = $this->db->getFollowArtistsShortInfo();
            return $this->resp->json($resp, 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devuelve todos los artistas de la app, excluyendo los eliminados
     *
     * @return JsonResponse
     */
    public function getArtists(Request $request): JsonResponse
    {
        try {
            $resp = $this->db->getArtists($request->all());
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve todos los artistas de la app, excluyendo los eliminados
     * de forma random
     *
     * @return JsonResponse
     */
    public function getRandomArtists(Request $request): JsonResponse
    {
        try {
            $resp = $this->db->getRandomArtists($request->all());
            return $this->resp->json($resp, 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devuelve los datos de un artista
     *
     * @return JsonResponse
     */
    public function getArtist(int $id): JsonResponse
    {
        try {
            $resp = $this->db->getArtist($id);

            if (!$resp) {
                return $this->resp->json('artista no encontrado', 404);
            }

            return $this->resp->json($resp, 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devuelve los obras guardadas por el usuario
     *
     * @return JsonResponse
     */
    public function getFollowArtworks(): JsonResponse
    {
        try {
            $resp = $this->db->getFollowArtworks();
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve los publicaciones guardadas por el usuario
     *
     * @return JsonResponse
     */
    public function getFollowReleases(): JsonResponse
    {
        try {
            $resp = $this->db->getFollowReleases();
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve los eventos guardados por el usuario
     *
     * @return JsonResponse
     */
    public function getFollowEvents(): JsonResponse
    {
        try {
            $resp = $this->db->getFollowEvents();
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve los colectivos seguidos por el usuario
     *
     * @return JsonResponse
     */
    public function getFollowCollectives(): JsonResponse
    {
        try {
            $resp = $this->collectiveDB->getFollowedCollectives();
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Agregar a favoritos una obra
     *
     * @param CreateFollowArtworkRequest $request
     * @return JsonResponse
     */
    public function addFavoriteArtwork(CreateFollowArtworkRequest $request): JsonResponse
    {
        try {
            $add = $this->userfactory->addFavoriteArtwork($request);

            if (!$add) {
                return $this->resp->json('Hubo un problema al guardar la obra', 204);
            }

            return $this->resp->json('obra agregada a favoritos con éxito', 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Agregar a favoritos una obra
     *
     * @param CreateFollowArtworkRequest $request
     * @return JsonResponse
     */
    public function removeFavoriteArtwork(CreateFollowArtworkRequest $request): JsonResponse
    {
        try {
            $remove = $this->userfactory->removeFavoriteArtwork($request);

            if (!$remove) {
                return $this->resp->json('Hubo un problema al eliminar la obra', 204);
            }

            return $this->resp->json('obra removida a favoritos con éxito', 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devolver las calificaciones de un usuario
     *
     * @param int $id           id del usuario
     * @return JsonResponse
     */
    public function getUserRatings(int $id): JsonResponse
    {
        try {
            $resp = $this->db->getUserRatings($id);
            return $this->resp->json($resp, 200);
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devuelve los métodos de pago del artista
     *
     * @param int $id           id del usuario
     * @return JsonResponse
     */
    public function getUserPaymentMethods(int $id): JsonResponse
    {
        try {
            $resp = $this->db->getUserPaymentMethods($id);
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve los métodos de cobro del artista
     *
     * @param int $id           id del usuario
     * @return JsonResponse
     */
    public function getUserChargingMethods(int $id): JsonResponse
    {
        try {
            $resp = $this->db->getUserChargingMethods($id);
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * obtiene el balance del usuario
     */
    public function getUserBalance(int $id): JsonResponse
    {
        try {
            $resp = $this->db->getUserBalance($id);
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * obtiene el balance del usuario
     */
    public function getUserPayout(int $id): JsonResponse
    {
        try {
            $resp = $this->db->getUserPayout($id);
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Crea un nuevo pago de stripe para retiro de fondos
     */
    public function createUserPayout(Request $request): JsonResponse
    {
        try {
            $resp = $this->userfactory->createUserPayout($request);
            return $this->resp->json([
                'message' => $resp['message'],
                'data' => $resp['data']
            ], $resp['code']);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
