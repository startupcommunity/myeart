<?php

namespace App\Factories;

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
}
