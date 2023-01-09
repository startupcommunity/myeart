<?php

namespace App\Querys;

use Illuminate\Database\Eloquent\Collection;
use App\Enums\ReleaseTypeEnum;
use Illuminate\Http\Request;
use App\Models\UserRelease;
use App\Models\Collective;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class CollectiveDB
{
  public function __construct(
    private Collective $model,
    private User $user,
  ) {
  }

  /**
   * Devuelve todas las relaciones partiendo de model Collective
   *
   * @return array
   */
  public function getAllCollectiveRelations(): array
  {
    return [
      'categories.category',
      'members.user.artworks.categories',
      'followers',
      'artworks.user',
      'artworks.gallery',
      'artworks.categories',
      'artworks.labels',
      'releases.creator',
      'releases.likes',
      'releases.labels.user',
      'releases.comments',
      'profile',
      'user',
      'likes',
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
   * Devuelve las relaciones del colectivo desde otro modelo
   * relacionado con model Collective
   *
   * @return array
   */
  public function getCollectiveRelFromAnotherModel(): array
  {
    return [
      'collective.categories.category',
      'collective.members.user',
      'collective.followers',
      'collective.artworks',
      'collective.profile',
      'collective.user',
      'collective.likes',
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
   * Devuelve todos los colectivos del usuario
   * Ya sean creados o por invitación
   *
   * @param integer    id del usuario
   * @return array
   */
  public function getUserCollective(?int $id = null): array
  {
    $user = $id ? $this->user->find($id) : auth()->user();
    $relations = $this->getAllCollectiveRelations();
    $relationsGuest = $this->getCollectiveRelFromAnotherModel();

    // primero obtener los colectivos creados
    $collectives = $user->collectives()->with($relations)->get();

    // luego obtener los colectivos a los que pertenece
    $data = $user->memberCollective()->with($relationsGuest)->get();
    $member = $data->map(fn ($item) => $item->collective);

    // unir los colectivos
    $collectives = $collectives->merge($member);

    return $collectives->toArray();
  }

  /**
   * Devuelve todos los colectivos de la app
   *
   * @return Builder
   */
  public function getAllCollectives(): Builder
  {
    $relations = $this->getAllCollectiveRelations();
    return $this->model->with($relations);
  }

  /**
   * Devuelve los colectivos seguidos por el usuario
   *
   * @param integer|null    id del usuario
   */
  public function getFollowedCollectives(?int $id = null): array
  {
    $user = $id ? $this->user->find($id) : auth()->user();
    $relations = $this->getCollectiveRelFromAnotherModel();

    return $user->followedCollectives()
      ->with($relations)
      ->get()
      ->toArray();
  }

  /**
   * Devuelve los colectivos de la app
   * filtrados por algún parámetro y paginados
   *
   * @param Request $request
   * @return LengthAwarePaginator
   */
  public function getAllCollectivesFilter(Request $request): LengthAwarePaginator
  {
    $collectives = $this->getAllCollectives();
    $type = intval($request->type);
    $category = intval($request->category);
    $sortBy = intval($request->sortBy);

    // filtrar por Categoria
    if ($request->has('category') && $category) {
      $collectives = $collectives->whereHas('categories', function ($query) use ($request) {
        $query->where('category_id', intval($request->category));
      });
    }

    // filtrar por tipo
    if ($request->has('type') && $type) {
      $collectives = $collectives->where('type', intval($request->type));
    }

    // ordenar por fecha de creación
    if ($request->has('sortBy') && $sortBy === 1) {
      $collectives = $collectives->orderByDesc('id');
    }

    // ordenar por orden alfabético
    if ($request->has('sortBy') && $sortBy === 2) {
      $collectives = $collectives->orderBy('name');
    }

    return $collectives->paginate(12, '*', 'page', $request->page ?? 1);
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
    return $collective->members()
      ->with(['user.artworks.categories', 'user.profile'])
      ->get();
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
