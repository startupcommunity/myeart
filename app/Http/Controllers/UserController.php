<?php

namespace App\Http\Controllers;

use App\Factories\UserFactory;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $resp;
    public $userfactory;

    public function __construct(UserFactory $userfactory, ResponseJson $resp)
    {
        $this->userfactory = $userfactory;
        $this->resp = $resp;
        // $this->authorizeResource(Artwork::class, 'id');
    }

    public function followArtist(Request $request): JsonResponse
    {
        // dd($request->following_id);
        $resp = $this->userfactory->followArtist($request);

        if (!$resp) {
            return $this->resp->json('Error al procesar la información', 500);
        }

        return $this->resp->json('artista seguido con éxito', 200);
    }
}
