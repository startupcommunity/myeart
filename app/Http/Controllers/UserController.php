<?php

namespace App\Http\Controllers;

use App\Factories\UserFactory;
use App\Querys\UserDB;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

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
        } catch (Throwable $th) {
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
        } catch (Throwable $th) {
            return $this->resp->json($th, 500);
        }
    }

    /**
     * Devuelve todos los artistas de la app, excluyendo
     * el usuario logueado y los eliminados
     *
     * @return JsonResponse
     */
    public function getArtists(): JsonResponse
    {
        try {
            $resp = $this->db->getArtists();
            return $this->resp->json($resp, 200);
        } catch (Throwable $th) {
            return $this->resp->json($th, 500);
        }
    }
}
