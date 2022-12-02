<?php

namespace App\Http\Controllers;

use App\Factories\ReleaseFactory;
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
    public function getUserRelease(): JsonResponse
    {
        try {
            $data = $this->db->getUserRelease();
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserRelease  $userRelease
     * @return \Illuminate\Http\Response
     */
    public function edit(UserRelease $userRelease)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserRelease  $userRelease
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserRelease $userRelease)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserRelease  $userRelease
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserRelease $userRelease)
    {
        //
    }
}
