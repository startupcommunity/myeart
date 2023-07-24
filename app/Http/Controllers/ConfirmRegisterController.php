<?php

namespace App\Http\Controllers;

use App\Factories\UserFactory;
use App\Http\Requests\ConfirmRegisterToken;
use App\Models\UserConfirmRegister;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConfirmRegisterController extends Controller
{
    public function __construct(
        private UserFactory $userFactory,
        private ResponseJson $resp
    ) {
    }

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

        return $this->resp->json([
            'message' => 'Token no encontrado'
        ], 204);
    }

    /**
     * Enviar correo de verificación
     */
    public function sendRegisterConfirmationEmail(Request $request): JsonResponse
    {
        // crear token
        $this->userFactory->createTokenConfirmRegister($request->email);

        // send email
        $this->userFactory->sendEmailConfirmRegister($request->email);

        return $this->resp->json([
            'message' => 'Email enviado'
        ], 200);
    }
}
