<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePasswordResetRequest;
use App\Factories\UserPasswordResetFactory;
use App\Http\Requests\CreateNewUserPassword;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Utils\ResponseJson;
use Exception;

class UserPasswordResetController extends Controller
{
    public function __construct(
        private UserPasswordResetFactory $service,
        private ResponseJson $resp
    ) {
    }

    /**
     * Verifica y envía un nuevo token para el usuario
     *
     * @param CreatePasswordResetRequest $request
     * @return JsonResponse
     */
    public function sendToken(CreatePasswordResetRequest $request): JsonResponse
    {
        try {
            $verify = $this->service->verifyUserAndSendToken($request);

            if (!$verify) {
                return $this->resp->json('El usuario no existe', 204);
            }

            return $this->resp->json('Se ha enviado un correo con el código de verificación', 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Ver tiempo restante del token
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function tokenRemainingTime(Request $request): JsonResponse
    {
        try {
            $timeLeft = $this->service->tokenRemainingTime($request);

            if (!$timeLeft) {
                return $this->resp->json('El token no existe', 204);
            }

            return $this->resp->json($timeLeft, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Verificar el token y el email
     *
     * @param CreatePasswordResetRequest $request
     * @return JsonResponse
     */
    public function verifyToken(CreatePasswordResetRequest $request): JsonResponse
    {
        try {
            $verify = $this->service->verifyToken($request);

            if (!$verify) {
                return $this->resp->json('El token no existe', 204);
            }

            return $this->resp->json('El token es válido', 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Cambiar la contraseña
     *
     * @param CreateNewUserPassword $request
     * @return JsonResponse
     */
    public function changePassword(CreateNewUserPassword $request): JsonResponse
    {
        try {
            $change = $this->service->changePassword($request);

            if (!$change) {
                return $this->resp->json('No se pudo cambiar las contraseña', 204);
            }

            return $this->resp->json('La contraseña se ha cambiado correctamente', 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
