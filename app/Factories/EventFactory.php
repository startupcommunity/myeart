<?php

namespace App\Factories;

use App\Enums\TypeNotificationEnum;
use App\Models\FavoriteEvent;
use App\Models\User;
use App\Models\UserEvent;
use App\Utils\AppNotification;
use App\Utils\AppStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventFactory
{

  /**
   * Almacena un nuevo evento
   *
   * @param Request $data
   * @return UserEvent
   */
  public function store(Request $data): UserEvent
  {
    $db = DB::transaction(function () use ($data) {
      $user = auth()->user();
      $file = $data->file('image');
      $name = 'picture-' . '-' . date('Ymdhis');
      $path = config('storage.public.event_image');
      $data = $data->only(['name', 'description', 'location', 'init_date', 'init_time', 'mode', 'phone_number','collective_id','pay','price','stock']);

      // primero se debe guardar la imagen
      $filename = AppStorage::saveFile($file, $name, $path);
      $data['image'] = $filename;

      // luego se guarda el evento
      return $user->events()->create($data);
    });


    return $db;
  }

  /**
   * agrega a favoritos un evento
   *
   * @param Request $request
   * @return bool|FavoriteEvent
   */
  public function addFavorite(Request $request): bool|FavoriteEvent
  {
    $user = User::find($request->user_id);
    $isFav = $user->favoriteEvents()->where('event_id', $request->event_id)->first();

    // si ya el usuario la tiene en favoritos return false
    if ($isFav) {
      return false;
    }

    // si no, agregar a favoritos
    return $user->favoriteEvents()->create(['event_id' => $request->event_id]);
  }

  /**
   * elimina de favoritos un evento
   *
   * @param Request $request
   * @return bool
   */
  public function removeFavorite(Request $request): bool
  {
    $user = User::find($request->user_id);
    $isFav = $user->favoriteEvents()->where('event_id', $request->event_id)->first();

    // si no la tiene en favoritos return false
    if (!$isFav) {
      return false;
    }

    // si la tiene, eliminar de favoritos
    return $isFav->delete();
  }

  /**
   * agrega un like a un evento
   *
   * @param Request $request
   * @return bool
   */
  public function addLike(Request $request): bool
  {
    $event = UserEvent::find($request->event_id);
    $liked = $event->likes()->where('user_id', $request->user_id)->first();

    // si ya le dio like return false
    if ($liked) {
      return false;
    }

    // si no, agregar like
    $created = $event->likes()->create(['user_id' => $request->user_id]);

    if ($created) {
      // enviar la notificacion al usuario
      AppNotification::sendNoty([
        'user_id' => $request->user_id,
        'notifiable_id' => $event->user_id,
        'url' => 'eventos/show/' . $event->id,
        'msj' => 'Le ha gustado tu evento',
        'type' => TypeNotificationEnum::LIKE_EVENT,
      ]);
    }

    return is_object($created);
  }

  /**
   * elimina un like
   * @param Request $request
   * @return bool
   */
  public function removeLike(Request $request): bool
  {
    $event = UserEvent::find($request->event_id);
    $liked = $event->likes()->where('user_id', $request->user_id)->first();

    // si no le dio like return false
    if (!$liked) {
      return false;
    }

    // si le dio like, eliminar like
    return $liked->delete();
  }
}
