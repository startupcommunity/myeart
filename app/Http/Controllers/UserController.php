<?php

namespace App\Http\Controllers;

use App\Factories\UserFactory;
use App\Http\Requests\CreateFollowArtworkRequest;
use App\Querys\UserDB;
use App\Utils\ResponseJson;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // acceso a los datos
    private $db;

    // tipo de responde de la app
    private $resp;

    // lógica del negocio
    private $userfactory;

    public function __construct(
        UserFactory $userfactory,
        ResponseJson $resp,
        UserDB $db
    ) {
        $this->userfactory = $userfactory;
        $this->resp = $resp;
        $this->db = $db;
        // $this->authorizeResource(Artwork::class, 'id');
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
        } catch (Exception $th) {
            return $this->resp->json($th, 500);
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
}
