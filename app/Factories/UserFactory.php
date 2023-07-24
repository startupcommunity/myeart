<?php

namespace App\Factories;

use App\Enums\TypeNotificationEnum;
use App\Events\NotificationEvent;
use App\Mail\ConfirmRegisterEmail;
use App\Models\User;
use App\Models\UserConfirmRegister;
use Illuminate\Mail\PendingMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserFactory
{
  private $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  /**
   * Sigue a un artista
   *
   * @param Request $request
   * @return boolean
   */
  public function followArtist($request): bool
  {
    $follower = auth()->user();

    // no se puede seguir a el mismo
    if ($follower->id === $request->following_id) {
      return false;
    }

    $created = $follower
      ->followingArtists()
      ->create(['following_id' => $request->following_id]);

    //Evento para Notificación de nuevo seguidor
    $data = [
      'user_id' => $follower->id,
      'notifiable_id' => $request->following_id,
      'url' => '',
      'message' => "Ha comenzado a seguirte",
      'type' => TypeNotificationEnum::FOLLOW //'new-follower'
    ];

    event(new NotificationEvent($data));

    return $created ? true : false;
  }

  /**
   * Deja de seguir a un artista
   *
   * @param Request $request
   * @return boolean
   */
  public function unfollowArtist($request): bool
  {
    $follower = auth()->user();

    // dejar de seguir al artista indicado
    $deleted = $follower->followingArtists()
      ->where('following_id', $request->following_id)
      ->delete();


    //Evento para Notificación dejo de seguir
    $data = [
      'user_id' => $follower->id,
      'notifiable_id' => $request->following_id,
      'url' => '',
      'message' => "Ha dejado de seguirte",
      'type' => TypeNotificationEnum::UNFOLLOW //'unfollow'
    ];

    event(new NotificationEvent($data));

    return $deleted;
  }

  /**
   * Agrega una obra a favoritos del usuario
   *
   * @param Request $request
   * @return boolean
   */
  public function addFavoriteArtwork($request): bool
  {
    $user = auth()->user();
    $artwork = $user->favoriteArtworks()->where('artwork_id', $request->artwork_id);

    // obras del usuario
    $userArtworks = $user->artworks()->pluck('id');

    // si la obra pertenece a el
    if ($userArtworks->contains($request->artwork_id)) {
      return false;
    }

    // si la obra ya está en favoritos, no se agrega
    if ($artwork->exists()) {
      return false;
    }


    // caso contrario, se agrega
    $user->favoriteArtworks()->create(['artwork_id' => $request->artwork_id]);

    return true;
  }

  /**
   * Elimina una obra de los favoritos del usuario
   *
   * @param Request $request
   * @return boolean
   */
  public function removeFavoriteArtwork($request): bool
  {
    $user = auth()->user();
    $artwork = $user->favoriteArtworks()->where('artwork_id', $request->artwork_id);

    // si la obra no está en favoritos, no se elimina
    if (!$artwork->exists()) {
      return false;
    }

    // caso contrario, se elimina
    return $artwork->delete();
  }

  /**
   * Envia un mail de confirmación de registro
   */
  public function sendEmailConfirmRegister(string $email)
  {
    $user = $this->user->where('email', $email)->first();
    $confirmEmail = new ConfirmRegisterEmail($user);
    return Mail::to($user->email)->send($confirmEmail);
  }

  /**
   * Crear token de confirmación de registro
   */
  public function createTokenConfirmRegister(string $email): UserConfirmRegister
  {
    // buscar user
    $user = $this->user->where('email', $email)->first();

    // verificar si ya tiene token de confirmación
    if ($user->userConfirmRegister()->exists()) {
      return $user->userConfirmRegister;
    }

    // crear token de confirmación
    return $user->userConfirmRegister()->create(['token' => Str::random(40)]);
  }
}
