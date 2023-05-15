<?php

/**
 * Gestión de la contraseña del usuario
 * recuperar contraseña y gestionar el token
 *
 * @author luisandev <https://luisan.dev>
 */


namespace App\Factories;

use App\Mail\UserPasswordResetMail;
use App\Models\User;
use App\Models\UserPasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class UserPasswordResetFactory
{
  public function __construct(
    private User $user,
    private UserPasswordReset $userPasswordReset
  ) {
  }

  /**
   * Genera un token para el usuario
   * de 8 dígitos
   *
   * @return int
   */
  public function generateToken(): int
  {
    return rand(10000000, 99999999);
  }

  /**
   * Almacena el token en la bd
   * y envía el correo al usuario
   */
  public function storeToken(User $user): UserPasswordReset
  {
    $token = $this->generateToken();

    return $user->userPasswordReset()->create([
      'token' => $token,
      'email' => $user->email,
      'expires_at' => now()->addMinutes(60), // 1 hora
    ]);
  }

  /**
   * Envía el email con el código
   * de verificación
   *
   * @return void
   */
  public function sendEmail(User $user): void
  {
    $email = new UserPasswordResetMail($user);
    Mail::to($user->email)->send($email);
  }

  /**
   * Verifica si el usuario existe en la bd
   * si es asi genera el token y envía el correo
   * si no existe retorna false
   *
   * @param Request $request
   * @return boolean
   */
  public function verifyUserAndSendToken(Request $request): bool
  {
    return DB::transaction(function () use ($request) {
      //buscar el usuario
      $user = $this->user->where('email', $request->email)->first();

      // si existe el usuario
      if ($user) {
        $this->storeToken($user);
        $this->sendEmail($user);
        return true;
      }

      return false;
    });
  }

  /**
   * Ver tiempo restante de un token
   * buscando por el correo
   *
   * @param Request $request
   * @return int|null
   */
  public function tokenRemainingTime(Request $request): ?int
  {
    $token = $this->userPasswordReset->where('email', $request->email)->first();

    if ($token) {
      // devolver el tiempo restante
      // calcular
      $now = now();
      $expiresAt = $token->expires_at;
      return $now->diffInMinutes($expiresAt);
    }

    return null;
  }

  /**
   * Verificar el token indicado
   *
   * @param Request $request
   * @return boolean
   */
  public function verifyToken(Request $request): bool
  {
    $token = $this->userPasswordReset->where('token', $request->token)->first();

    if ($token) {
      // verificar si el token ha expirado
      $now = now();
      $expiresAt = $token->expires_at;

      if ($now->diffInMinutes($expiresAt) > 0) {

        // verificar si el token pertenece al usuario
        $user = $this->user->where('email', $request->email)->first();

        if ($user) {
          if ($user->id === $token->user_id) {
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Cambiar contraseña
   *
   * @param Request $request
   * @return boolean
   */
  public function changePassword(Request $request): bool
  {
    return DB::transaction(function () use ($request) {
      // buscar el usuario
      $user = $this->user->where('email', $request->email)->first();

      if ($user) {
        // cambiar la contraseña
        $user->password = bcrypt($request->pass);
        $user->save();

        // eliminar el token
        $user->userPasswordReset()->delete();

        return true;
      }

      return false;
    });
  }
}
