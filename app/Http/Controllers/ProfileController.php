<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrUpdateUserRequest;
use App\Models\UserInformations;
use App\Models\UserSocialNetwork;
use App\Utils\AppStorage;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;

class ProfileController extends Controller
{
    private $resp;

    public function __construct(ResponseJson $resp)
    {
        $this->resp = $resp;
        // $this->authorizeResource(Artwork::class, 'id');
    }

    /**
     * Actualiza la foto de portada del usuario
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateFrontPhoto(Request $request): JsonResponse
    {
        $request->validate([
            'croppedFile' => 'required|file|max:6000|mimes:jpg,webp,png',
        ]);

        // la imagen recortada
        $isFile = request()->hasFile('croppedFile');

        if ($isFile) {
            $user = auth()->user();
            $croppedFile = request()->file('croppedFile');
            $name = 'front-photo-' . date('Ymdhis');

            // actualizar imagen del storage
            $filename = AppStorage::updateFile(
                $croppedFile,
                $user->front_photo,
                config('storage.public.front_photo'),
                $name,
            );

            // actualizar el nombre en la bd
            $updated = $user->update(['front_photo' => $filename]);

            if (!$updated) {
                return response()->json([
                    'message' => Lang::get('No se pudo actualizar la foto')
                ], 500);
            }

            return response()->json([
                'message' => Lang::get('Foto de portada actualizada')
            ], 200);
        }

        return response()->json([
            'message' => Lang::get('La imagen cargada no es válida')
        ], 500);
    }

    /**
     * Actualiza la foto de perfil del usuario
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateProfilePhoto(Request $request): JsonResponse
    {
        $request->validate([
            'croppedFile' => 'required|file|max:2000|mimes:jpg,webp,png',
        ]);

        // la imagen recortada
        $isFile = request()->hasFile('croppedFile');

        if ($isFile) {
            $user = auth()->user();
            $croppedFile = request()->file('croppedFile');
            $name = 'profile-photo-' . date('Ymdhis');

            // actualizar imagen del storage
            $filename = AppStorage::updateFile(
                $croppedFile,
                $user->profile_photo,
                config('storage.public.profile_photo'),
                $name,
            );

            // actualizar el nombre en la bd
            $updated = $user->update(['profile_photo' => $filename]);

            if (!$updated) {
                return response()->json([
                    'message' => Lang::get('No se pudo actualizar la foto')
                ], 500);
            }

            return response()->json([
                'message' => Lang::get('Foto de perfil actualizada')
            ], 200);
        }

        return response()->json([
            'message' => Lang::get('La imagen cargada no es válida')
        ], 500);
    }

    /**
     * Actualiza los datos del usuario logueado
     *
     * @param CreateOrUpdateUserRequest $request        los datos validados
     * @return JsonResponse
     */
    public function updateProfile(CreateOrUpdateUserRequest $request): JsonResponse
    {
        $db = DB::transaction(function () use ($request) {
            $data = $request;
            $user = auth()->user();

            // actualizar user
            $user->update(['name' => $data->name]);

            // actualizar datos del perfil
            $dataProfile = collect($data)
                ->except(['_method', 'name', 'facebook', 'instagram', 'linkedin', 'behance'])
                ->toArray();

            UserInformations::updateOrCreate(['user_id' => $user->id], $dataProfile);

            $dataSocial = collect($data)
                ->only(['facebook', 'instagram', 'linkedin', 'behance'])
                ->toArray();
            UserSocialNetwork::updateOrCreate(['user_id' => $user->id], $dataSocial);

            return true;
        });

        if (!$db) {
            return $this->resp->json(['message' => Lang::get('Error al actualizar los datos')], 500);
        }

        return $this->resp->json(['message' => Lang::get('Datos actualizados con éxito')], 200);
    }
}
