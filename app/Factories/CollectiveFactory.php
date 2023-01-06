<?php

namespace App\Factories;

use App\Models\Collective;
use App\Utils\AppStorage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CollectiveFactory
{
  /**
   * Crea un nuevo colectivo para el usuario autenticado
   */
  public function store(Request $request): ?Collective
  {
    $tran = DB::transaction(function () use ($request) {
      $user = auth()->user();

      $data = $request->only([
        'name',
        'type',
        'location',
        'description',
      ]);

      // convertir categorias en array valido para createMany
      $request->categories = array_map(function ($item) {
        return ['category_id' => $item];
      }, $request->categories);

      $collective =  $user->collectives()->create($data);

      if ($collective) {
        $collective->categories()->createMany($request->categories);
      }

      return $collective;
    });

    return $tran;
  }

  /**
   * Actualiza un colectivo
   * @param Request $request
   * @param int $id
   * @return bool
   */
  public function update(Request $request, int $id): ?bool
  {
    $tran = DB::transaction(function () use ($request, $id) {
      $user = auth()->user();

      $data = $request->only([
        'name',
        'type',
        'location',
        'description',
      ]);

      // convertir categorias en array valido para createMany
      $request->categories = array_map(function ($item) {
        return ['category_id' => $item];
      }, $request->categories);

      $collective = $user->collectives()->find($id);

      if ($collective) {
        $collective->update($data);
        $collective->categories()->delete();
        $collective->categories()->createMany($request->categories);
      }

      return true;
    });

    return $tran;
  }

  /**
   * actualiza la foto de perfil de un colectivo
   * @param Request $request
   * @param int $id
   * @return bool
   */
  public function updateProfilePhoto(Request $request, int $id): ?bool
  {
    $tran = DB::transaction(function () use ($request, $id) {
      $isFile = $request->hasFile('profile_image');

      if (!$isFile) {
        return false;
      }

      $collective = Collective::find($id);
      $croppedFile = $request->file('profile_image');
      $name = 'profile-photo-' . date('Ymdhis');

      // actualizar imagen del storage
      $filename = AppStorage::updateFile(
        $croppedFile,
        $collective->profile?->profile_image,
        config('storage.public.collective_profile_photo'),
        $name,
      );

      // crea o actualiza la imagen del perfil
      $updated = $collective->profile()->updateOrCreate(
        ['collective_id' => $collective->id],
        ['profile_image' => $filename]
      );

      return is_object($updated);
    });

    return $tran;
  }

  /**
   * actualiza la foto de portada de un colectivo
   * @param Request $request
   * @param int $id
   * @return bool
   */
  public function updateFrontPhoto(Request $request, int $id): ?bool
  {
    $tran = DB::transaction(function () use ($request, $id) {
      $isFile = $request->hasFile('front_image');

      if (!$isFile) {
        return false;
      }

      $collective = Collective::find($id);
      $croppedFile = $request->file('front_image');
      $name = 'front-photo-' . date('Ymdhis');

      // actualizar imagen del storage
      $filename = AppStorage::updateFile(
        $croppedFile,
        $collective->profile?->front_image,
        config('storage.public.collective_front_photo'),
        $name,
      );

      // crea o actualiza la imagen del perfil
      $updated = $collective->profile()->updateOrCreate(
        ['collective_id' => $collective->id],
        ['front_image' => $filename]
      );

      return is_object($updated);
    });

    return $tran;
  }

  /**
   * Envía una invitación a un usuario para unirse a un colectivo
   *
   * @param Request $request
   * @return bool
   */
  public function sendInvitation(Request $request): ?bool
  {
    $tran = DB::transaction(function () use ($request) {
      $data = $request->only(['user_id']);
      $collective = Collective::find($request->collective_id);

      // si el usuario no es el dueño del colectivo
      if (!($collective->isCreator())) {
        return false;
      }

      // si el creador ya invito a este usuario
      $invitation = $collective->invitations()
        ->where('user_id', $request->user_id)
        ->first();

      if ($invitation) {
        return false;
      }

      // crear invitación
      $collective->invitations()->create($data);

      return true;
    });

    return $tran;
  }

  /**
   * Elimina un miembro del colectivo
   *
   * @param Request $request
   * @return bool
   */
  public function removeMember(Request $request): ?bool
  {
    $tran = DB::transaction(function () use ($request) {
      $collective = Collective::find($request->collective_id);

      // si el usuario no es el dueño del colectivo
      if (!($collective->isCreator())) {
        return false;
      }

      // eliminar miembro
      return $collective
        ->members()
        ->where('user_id', $request->user_id)
        ->delete();
    });

    return $tran;
  }

  /**
   * Agrega un like a un colectivo
   *
   * @param Request $request
   * @return bool
   */
  public function addLike(Request $request): ?bool
  {
    $tran = DB::transaction(function () use ($request) {
      $collective = Collective::find($request->collective_id);

      // si el usuario ya dio like
      $like = $collective->likes()
        ->where('user_id', $request->user_id)
        ->first();

      if ($like) {
        return false;
      }

      // crear like
      $collective->likes()->create($request->only(['user_id']));

      return true;
    });

    return $tran;
  }

  /**
   * Elimina un like a un colectivo
   *
   * @param Request $request
   * @return bool
   */
  public function removeLike(Request $request): ?bool
  {
    $tran = DB::transaction(function () use ($request) {
      $collective = Collective::find($request->collective_id);

      // eliminar like
      return $collective
        ->likes()
        ->where('user_id', $request->user_id)
        ->delete();
    });

    return $tran;
  }

  /**
   * Sigue a un colectivo, si es el creador no lo puede seguir
   *
   * @param Request $request
   * @return bool
   */
  public function followCollective(Request $request): ?bool
  {
    $tran = DB::transaction(function () use ($request) {
      $collective = Collective::find($request->collective_id);

      // si el usuario es el creador del colectivo
      if ($collective->isCreator($request->user_id)) {
        return false;
      }

      // si el usuario ya sigue al colectivo
      $follow = $collective->followers()
        ->where('user_id', $request->user_id)
        ->first();

      if ($follow) {
        return false;
      }

      // crear follow
      $collective->followers()->create($request->only(['user_id']));

      return true;
    });

    return $tran;
  }

  /**
   * Deja de seguir a un colectivo
   *
   * @param Request $request
   * @return bool
   */
  public function unfollowCollective(Request $request): ?bool
  {
    $tran = DB::transaction(function () use ($request) {
      $collective = Collective::find($request->collective_id);

      // eliminar follow
      return $collective
        ->followers()
        ->where('user_id', $request->user_id)
        ->delete();
    });

    return $tran;
  }
}
