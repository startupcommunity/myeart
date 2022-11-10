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
    private $resp;
    private $userfactory;
    private $db;

    public function __construct(UserFactory $userfactory, ResponseJson $resp, UserDB $db)
    {
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
        $resp = $this->userfactory->followArtist($request);

        if (!$resp) {
            return $this->resp->json('Error al procesar la información', 500);
        }

        return $this->resp->json('artista seguido con éxito', 200);
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
            return $this->resp->json($th, 200);
        }
    }
}
