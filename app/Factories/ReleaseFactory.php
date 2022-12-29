<?php

namespace App\Factories;

use App\Enums\ReleaseTypeEnum;
use App\Models\Comment;
use App\Models\FavoriteRelease;
use App\Models\ReleaseLike;
use App\Models\User;
use App\Models\UserRelease;
use App\Utils\AppStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReleaseFactory
{

  /**
   * Almacena una publicación del usuario logueado
   *
   * @param Request $request
   * @return UserRelease|null     el objeto creado de la publicación
   */
  public function store(Request $request): ?UserRelease
  {
    $release = DB::transaction(function () use ($request) {

      // data
      $user = auth()->user();
      $data = $request->only(['text', 'location']);
      $file = $request->file('image');
      $name = 'picture-' . '-' . date('Ymdhis');
      $path = config('storage.public.release_image');

      // save image
      $filename = AppStorage::saveFile($file, $name, $path);
      $data['image'] = $filename;

      // save publicación
      $data['type'] = $request->type ?? ReleaseTypeEnum::ARTIST;
      $release = $user->releases()->create($data);

      // save labels or friends
      if ($request->labels && $request->labels != 'null' && is_array($request->labels)) {
        foreach ($request->labels as $label) {
          $release->labels()->create(['friend_id' => $label]);
        }
      }

      return $release;
    });

    return $release;
  }

  /**
   * Actualiza una publicación del usuario logueado
   *
   * @param Request $request
   * @param integer $id
   * @return boolean
   */
  public function update(Request $request, int $id): bool
  {

    $updated = DB::transaction(function () use ($request, $id) {

      // data
      $filename = null;
      $data     = $request->only(['text', 'location']);
      $isFile   = $request->hasFile('image');
      $file     = $request->file('image');
      $name     = 'picture-' . '-' . date('Ymdhis');
      $path     = config('storage.public.release_image');

      // publicación
      $release = UserRelease::find($id);

      // update image
      if ($isFile) {
        $filename = AppStorage::updateFile($file, $release->image, $path, $name);
      }

      // update release
      $data['image'] = $isFile ? $filename : $release->image;
      $updated = $release->update($data);

      // update labels or friends
      if ($request->labels && $request->labels != 'null' && is_array($request->labels)) {
        // delete
        $release->labels()->delete();
        foreach ($request->labels as $label) {
          // create
          $release->labels()->create(['friend_id' => $label]);
        }
      }

      return $updated;
    });

    return $updated;
  }

  /**
   * Elimina una publicación del usuario logueado
   *
   * @param integer $id
   * @return boolean
   */
  public function delete(int $id): bool
  {
    $release = UserRelease::find($id);
    $deleted = $release->delete();

    // eliminar imagen
    if ($deleted) {
      $path = config('storage.public.release_image');
      AppStorage::deleteFile($release->image, $path);
    }

    // eliminar etiquetas
    $release->labels()->delete();

    return $deleted;
  }

  /**
   * Agrega un like a la publicación
   *
   * @param Request $request
   * @return null|ReleaseLike
   */
  public function like($request): ?ReleaseLike
  {
    $release = UserRelease::find($request->release_id);
    $liked = $release->likes()->where('user_id', $request->user_id)->first();

    // si ya el usuario dio like return false
    if ($liked) {
      return null;
    }

    // si no, crear like
    return $release->likes()->create(['user_id' => $request->user_id]);
  }

  /**
   * Elimina un like a la publicación
   *
   * @param Request $request
   * @return boolean
   */
  public function dislike($request): bool
  {
    $release = UserRelease::find($request->release_id);
    $liked = $release->likes()->where('user_id', $request->user_id)->first();

    // si no existe el like return false
    if (!$liked) {
      return false;
    }

    // si existe, eliminar like
    return $liked->delete();
  }

  /**
   * Agrega a favoritos una publicación
   *
   * @param Request $request
   * @return bool
   */
  public function addFavorite($request): bool|FavoriteRelease
  {
    $user = User::find($request->user_id);
    $isFav = $user->favoriteReleases()->where('release_id', $request->release_id)->first();

    // si ya el usuario la tiene en favoritos return false
    if ($isFav) {
      return false;
    }

    // si no, agregar a favoritos
    return $user->favoriteReleases()->create(['release_id' => $request->release_id]);
  }

  /**
   * elimina de favoritos una publicación
   *
   * @param Request $request
   * @return bool
   */
  public function removeFavorite($request): bool
  {
    $user = User::find($request->user_id);
    $isFav = $user->favoriteReleases()->where('release_id', $request->release_id)->first();

    // si no existe en favoritos return false
    if (!$isFav) {
      return false;
    }

    // si existe, eliminar de favoritos
    return $isFav->delete();
  }

  /**
   * Agrega un comentario a la publicación
   *
   * @param Request $request
   * @return null|Comment
   */
  public function storeComment($request): ?Comment
  {
    $release = UserRelease::find($request->release_id);
    $comment = $release->comments()->create([
      'user_id' => $request->user_id,
      'comment' => $request->comment
    ]);

    return $comment;
  }
}
