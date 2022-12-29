<?php

/**
 * Gestión de querys/consultas sobre el modulo Usuario
 * @luisandev
 */

namespace App\Querys;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class UserDB
{
    private const PAGINATE_ARTIST = 8;
    private const PAGINATE_ALL_ARTIST = 999999;

    /**
     * Devuelve un usuario por su id
     * @param int $id
     * @return User|null
     */
    public function getUser(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * Devuelve los artistas seguidos por el usuario logueado
     *
     * @param int|null $userID
     * @return Collection
     */
    public function getFollowArtists(int $userID = null): ?Collection
    {
        $user = $userID ? $this->getUser($userID) : auth()->user();
        $data = $user->load([
            'followingArtists.following.profile',
            'followingArtists.following.artworks.categories'
        ]);

        return $data['followingArtists'];
    }

    /**
     * devuelve los artistas seguidos por el usuario logueado
     * per con información reducida
     *
     * @param Int|null $userID
     * @return Collection
     */
    public function getFollowArtistsShortInfo(int $userID = null): ?Collection
    {
        $user = $userID ? $this->getUser($userID) : auth()->user();
        $data = $user->load(['followingArtists.following']);
        return $data['followingArtists'];
    }

    /**
     * Devuelve todos los artistas de la app, excluyendo  los eliminados
     * y los que no tengan obras subidas
     *
     * @return Collection
     */
    public function getArtists(array $filters): LengthAwarePaginator
    {
        $data = $filters;
        $cat = isset($data['category']) ? $data['category'] : null;
        $sub = isset($data['subcategory']) ? $data['subcategory'] : null;
        $label = isset($data['label']) ? $data['label'] : null;
        $all = isset($data['all']) ? $data['all'] : null;

        // query
        $query = User::with(['userArtistic', 'profile', 'artworks.gallery', 'artworks.categories'])
            ->withCount('artworks')
            ->having('artworks_count', '>', 0);

        // si se recibe algunas de las categorías
        if ($cat || $sub || $label) {
            $query->artworkCategory($cat, $sub, $label);
        }

        // si se desea todos los artistas
        if ($all) {
            return $query->paginate(self::PAGINATE_ALL_ARTIST, '*', 'page', $data['page']);
        }

        return $query->paginate(self::PAGINATE_ARTIST, '*', 'page', $data['page']);
    }

    /**
     * Devuelve los artistas seguidos por el usuario logueado
     * de forma random
     *
     * @return Collection
     */
    public function getRandomArtists(): Collection
    {
        $query = User::with(['profile', 'artworks.categories'])
            ->withCount('artworks')
            ->having('artworks_count', '>', 0)
            ->inRandomOrder()
            ->notUser(auth()->user()->id)
            ->limit(10);

        return $query->get();
    }

    /**
     * Devuelve los datos de un artista
     *
     * @param int $id
     * @return User
     */
    public function getArtist(int $id): ?User
    {
        return User::with([
            'profile', 'artworks.gallery', 'socialNetwork'
        ])
            ->withCount('artworks')
            ->withCount('followingArtists')
            ->withCount('followers')
            ->find($id);
    }

    /**
     * Devuelve los obras guardadas como favoritos
     * por el usuario logueado
     *
     * @return Collection
     */
    public function getFollowArtworks(): Collection
    {
        // user
        $user = auth()->user();

        // load relations
        $data = $user->load([
            'favoriteArtworks.artwork.gallery',
            'favoriteArtworks.artwork.categories',
            'favoriteArtworks.artwork.labels',
            'favoriteArtworks.artwork.likes',
            'favoriteArtworks.artwork.user.profile',
        ]);

        // return especific data
        return $data['favoriteArtworks']
            ->map(fn ($item) => $item->artwork);
    }

    /**
     * Devuelve los publicaciones guardadas como favoritos
     * por el usuario logueado
     *
     * @return Collection|SupportCollection
     */
    public function getFollowReleases(): Collection|SupportCollection
    {
        // user
        $user = auth()->user();

        // load relations
        $data = $user->load([
            'favoriteReleases.release.likes.user',
            'favoriteReleases.release.creator.artworks.categories',
            'favoriteReleases.release.comments',
            'favoriteReleases.release.labels.user',
        ]);

        // return especific data
        return $data['favoriteReleases']
            ->map(fn ($item) => $item->release);
    }

    /**
     * Devuelve los eventos guardados de un usuario
     *
     * @return Collection
     */
    public function getFollowEvents(): Collection
    {
        // user
        $user = auth()->user();

        // load relations
        $data = $user->load([
            'favoriteEvents.event.likes.user',
            'favoriteEvents.event.user.artworks.categories',
        ]);

        // return especific data
        return $data['favoriteEvents']
            ->map(fn ($item) => $item->event);
    }
}
