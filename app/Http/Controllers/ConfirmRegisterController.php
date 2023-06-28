<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmRegisterToken;
use App\Models\UserConfirmRegister;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConfirmRegisterController extends Controller
{
    /**
     * Verificar token y validar usuario
     */
    public function verifyToken(ConfirmRegisterToken $request): JsonResponse
    {
        // obtener el token
        $token = $request->token;

        // verificar si el token existe
        $confirm = UserConfirmRegister::where('token', $token)->first();

        // si existe
        if ($confirm && !$confirm->is_confirm) {
            $user = $confirm->user;

            // validar usuario
            $user->email_verified_at = now();
            $user->save();

            // marcar el usuario como confirmado
            $confirm->is_confirm = true;
            $confirm->save();

            return response()->json([
                'message' => 'Usuario confirmado',
                'user' => $user
            ], 200);
        }

        return response()->json([
            'message' => 'Token no encontrado'
        ], 204);
    }
}
