<?php

namespace App\Http\Controllers;

use App\Utils\AppStorage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
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
                    'message' => 'No se pudo actualizar la foto'
                ], 500);
            }

            return response()->json([
                'message' => 'Foto de portada actualizada'
            ], 200);
        }

        return response()->json([
            'message' => 'La imagen cargada no es válida'
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
                    'message' => 'No se pudo actualizar la foto'
                ], 500);
            }

            return response()->json([
                'message' => 'Foto de perfil actualizada'
            ], 200);
        }

        return response()->json([
            'message' => 'La imagen cargada no es válida'
        ], 500);
    }
}
