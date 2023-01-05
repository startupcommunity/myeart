<?php

namespace App\Querys;

use App\Enums\ReleaseTypeEnum;
use App\Models\Collective;
use App\Models\User;
use App\Models\UserRelease;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class CollectiveDB
{
  public function __construct(
    private Collective $model,
    private User $user,
  ) {
  }

  /**
   * Devuelve todas las relaciones de los colectivos
   *
   * @return array
   */
  public function getAllCollectiveRelations(): array
  {
    return [
      'categories.category',
      'profile',
      'user',
      'members.user'
    ];
  }

  /**
   * Devuelve todos las relaciones de las publicaciones
   *
   * @return array
   */
  public function getAllReleaseRelations(): array
  {
    return [
      'labels.user',
      'likes.user',
      'creator.artworks.categories',
      'comments'
    ];
  }

  /**
   * devuelve un colectivo
   *
   * @param int $id       id del colectivo
   * @param bool $with    relaciones
   * @return Collective
   */
  public function getCollective(int $id, bool $with = true): Collective
  {
    $relations = $with ? $this->getAllCollectiveRelations() : [];
    return $this->model->with($relations)->findOrFail($id);
  }

  /**
   * Devuelve los miembros de un colectivo
   *
   * @param int $id       id del colectivo
   * @return Collection
   */
  public function getMembers(int $id): Collection
  {
    $collective = $this->getCollective($id, false);
    $members = $collective->members()->with(['user.artworks.categories', 'user.profile'])->get();

    return $members;
  }

  /**
   * Devuelve las obras de un colectivo
   *
   * @param int $id       id del colectivo
   * @return Collection
   */
  public function getArtworks(int $id): Collection
  {
    // colectivo
    $collective = $this->getCollective($id, false);

    // ids de los miembros del colectivo y el creador
    $members = $collective->members()->pluck('user_id')->toArray();
    $members[] = $collective->user_id;

    // obtener las obras de los miembros y del creador del colectivo
    return ArtworkDB::getArtworksByUsers($members, $id);
  }

  /**
   * Devuelve las obras de un colectivo filtradas por usuario
   * o por opción
   *
   * @param int $id             id del colectivo
   * @param Request $request    datos del filtro
   * @return Collection
   */
  public function getFilterArtworks(Request $request, int $id): Collection
  {
    // datos del filtro
    $data = $request->only(['option', 'user_id']);
    $option = intval($data['option']);
    $user_id = intval($data['user_id']);

    // verificar que el usuario pertenezca al colectivo
    // o que sea el creador
    $collective = $this->getCollective($id, false);
    $isMember = $collective->isMember($user_id);
    $isCreator = $collective->isCreator($user_id);

    // devolver vacío si no pertenece al colectivo
    if (!$isMember && !$isCreator) {
      return new Collection();
    }

    // opción 1: todas las obras
    if ($option === 1) {
      return $this->getArtworks($id);
    }

    // opción 2: obras del usuario indicado
    if ($option === 2) {
      return ArtworkDB::getArtworksByUsers([$user_id], $id);
    }

    // opción 3: obras de los miembros del colectivo
    if ($option === 3) {
      // ids de los miembros del colectivo
      $members = $collective->members()->pluck('user_id')->toArray();

      // obtener las obras de los miembros
      return ArtworkDB::getArtworksByUsers($members, $id);
    }
  }

  /**
   * Devuelve todos los colectivos del usuario
   * Ya sean creados o por invitación
   *
   * @param integer    id del usuario
   * @return array
   */
  public function getUserCollective(?int $id = null): array
  {
    $relations = $this->getAllCollectiveRelations();
    $relationsGuest = ['collective.categories.category', 'collective.profile', 'collective.user'];
    $user = $id ? $this->user->find($id) : auth()->user();

    // primero obtener los colectivos creados
    $collectives = $user->collectives()->with($relations)->get();

    // luego obtener los colectivos a los que pertenece
    $guests = $user->guestCollectives()->with($relationsGuest)->get();

    // unir los colectivos
    $collectives = $collectives->merge($guests);

    return $collectives->toArray();
  }

  /**
   * Devuelve las publicaciones de un colectivo y la de sus miembros
   * se filtra por type (collective) y collective_id
   *
   * @param integer    id del colectivo
   * @return Collection
   */
  public function getReleaseCollective(int $id): Collection
  {
    $relations = $this->getAllCollectiveRelations();
    $releaseRelations = $this->getAllReleaseRelations();
    $collective = $this->model->with($relations)->find($id);

    // ids de los miembros del colectivo y el creador
    $members = $collective->members()->pluck('user_id')->toArray();
    $members[] = $collective->user_id;

    // obtener las publicaciones de todos
    return UserRelease::whereIn('user_id', $members)
      ->with($releaseRelations)
      ->where('type', ReleaseTypeEnum::COLLECTIVE)
      ->where('collective_id', $id)
      ->orderByDesc('created_at')
      ->get();
  }

  /**
   * Devuelve las publicaciones de un colectivo
   * filtradas por la opción indicada
   *
   * @param Request    request
   * @param integer    id del colectivo
   * @return Collection
   */
  public function getReleaseCollectiveByOption(Request $request, int $id): Collection
  {
    $option = intval($request->option ?? 0);
    $creatorID = intval($request->creatorID ?? 0);

    // publicaciones de un colectivo
    $releases = $this->getReleaseCollective($id);

    // filtrar todos
    if ($option === 1) {
      return $releases;
    }

    // filtrar solo las del creador
    if ($option === 2) {
      return $releases->where('user_id', $creatorID);
    }

    // filtrar la de los miembros
    if ($option === 3) {
      return $releases->where('user_id', '!=', $creatorID);
    }

    return new Collection();
  }
}
