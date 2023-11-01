<?php

namespace App\Http\Controllers;

use App\Factories\ReleaseFactory;
use App\Http\Requests\CreateFavoriteRelease;
use App\Http\Requests\CreateReleaseCommentRequest;
use App\Http\Requests\CreateReleaseLike;
use App\Http\Requests\CreateUserReleaseRequest;
use App\Models\UserRelease;
use App\Querys\ReleaseDB;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class UserReleaseController extends Controller
{
    public function __construct(
        private ResponseJson $resp,
        private ReleaseFactory $factory,
        private ReleaseDB $db,
    ) {
    }

    /**
     * Guarda una publicación del usuario logueado
     *
     * @param CreateUserReleaseRequest $request
     * @return JsonResponse
     */
    public function store(CreateUserReleaseRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->store($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Devuelve todas las publicaciones del usuario logueado
     *
     * @return JsonResponse
     */
    public function getUserRelease(int $id = null): JsonResponse
    {
        try {
            $data = $this->db->getUserRelease($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Devuelve todas las publicaciones de la app
     *
     * @return JsonResponse
     */
    public function getAllReleases(): JsonResponse
    {
        try {
            $data = $this->db->getAllReleases();
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserRelease  $userRelease
     * @return \Illuminate\Http\Response
     */
    public function show(UserRelease $userRelease)
    {
        //
    }

    /**
     * Actualiza una publicación del usuario logueado
     *
     * @param  Request  $request
     * @param  UserRelease  $userRelease
     * @return Response
     */
    public function update(CreateUserReleaseRequest $request, int $id): JsonResponse
    {
        try {
            $data = $this->factory->update($request, $id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Elimina una publicación del usuario logueado
     *
     * @param  UserRelease  $userRelease
     * @return Response
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $data = $this->factory->delete($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Devuelve todas las publicaciones de los artistas seguidos
     * por el usuario logueado
     *
     * @return Response
     */
    public function getReleaseFollowArtists(Request $request): JsonResponse
    {
        try {
            $data = $this->db->getReleaseFollowArtists($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Agrega un like a la publicación
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function like(CreateReleaseLike $request): JsonResponse
    {
        try {
            $data = $this->factory->like($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * elimina un like a la publicación
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function dislike(CreateReleaseLike $request): JsonResponse
    {
        try {
            $data = $this->factory->dislike($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Agrega a favoritos una publicación
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addFavorite(CreateFavoriteRelease $request): JsonResponse
    {
        try {
            $data = $this->factory->addFavorite($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Elimina de favoritos una publicación
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function removeFavorite(CreateFavoriteRelease $request): JsonResponse
    {
        try {
            $data = $this->factory->removeFavorite($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve los comentarios de una publicación
     *
     * @param Int $id           Id de la publicación
     * @return JsonResponse
     */
    public function getComments(int $id): JsonResponse
    {
        try {
            $data = $this->db->getComments($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve los comentarios de una publicación
     * por medio del slug
     *
     * @param Int $id           Id de la publicación
     * @return JsonResponse
     */
    public function getCommentsSlug(string $slug): JsonResponse
    {
        try {
            $data = $this->db->getComments($slug);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Agrega un nuevo comentario a una publicación
     *
     * @param CreateReleaseCommentRequest $request
     * @return JsonResponse
     */
    public function storeComment(CreateReleaseCommentRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->storeComment($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
