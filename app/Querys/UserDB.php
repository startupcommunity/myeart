<?php

/**
 * Gestión de querys/consultas sobre el modulo Usuario
 * @luisandev
 */

namespace App\Querys;

use App\Models\User;
use App\Utils\Payment\Stripe;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class UserDB
{
    private const PAGINATE_ARTIST = 8;
    private const PAGINATE_ALL_ARTIST = 1000000;

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
        $data = $user->load(['followingArtists.following.collectiveInvitations']);
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
        $paginate = $all ? self::PAGINATE_ALL_ARTIST : self::PAGINATE_ARTIST;
        $relations = ['userArtistic', 'profile', 'artworks.gallery', 'artworks.categories', 'ratings'];

        // query
        $query = User::with($relations)
            ->whereHas('artworks', fn ($art) => $art->typeArtist())
            ->withCount('artworks')
            ->having('artworks_count', '>', 0);

        // si se recibe algunas de las categorías
        if ($cat || $sub || $label) {
            $query->artworkCategory($cat, $sub, $label);
        }

        return $query->paginate($paginate, '*', 'page', $data['page']);
    }

    /**
     * Devuelve los artistas seguidos por el usuario logueado
     * de forma random
     *
     * @return Collection
     */
    public function getRandomArtists(): Collection
    {
        $authUserID = auth()->id();
        $request = request()->all();
        $all = isset($request['all']) ? $request['all'] : null;

        $query = User::with(['profile', 'artworks.categories', 'ratings'])
            ->withCount('artworks')
            ->having('artworks_count', '>', 0)
            ->inRandomOrder()
            ->limit(10);

        if ($all) {
            return $query->get();
        }

        return $query->notUser($authUserID)->get();
    }

    /**
     * Devuelve los datos de un artista
     *
     * @param int $id
     * @return User
     */
    public function getArtist(int $id): ?User
    {
        $user = User::with([
            'profile', 'artworks.gallery', 'socialNetwork', 'ratings','followingArtists.following','followers.follower',
        ])
            ->withCount('artworks')
            ->withCount('followingArtists')
            ->withCount('followers')
            ->find($id);

        foreach($user->followers as $follower){
            $follower["user"] = $follower["follower"];
        }
        foreach($user->followingArtists as $following){
            $following["user"] = $following["following"];
        }
        return $user;
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
        $releases = $data['favoriteReleases']
            ->map(fn ($item) => $item->release)
            ->filter(fn ($item) => $item);

        return $releases;
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

    /**
     * Devolver las calificaciones de un usuario
     *
     * @param int $id       id del usuario
     * @return SupportCollection
     */
    public function getUserRatings(int $id): SupportCollection
    {
        $user = $this->getUser($id);

        // devolver id, rating, comment y fecha de creación
        return $user->ratings()
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'rating' => $item->rating,
                'comment' => $item->comment,
                'created_at' => $item->created_at,
            ]);
    }

    /**
     * Devuelve los métodos de pagos del artista
     *
     * @param int $id       id del usuario
     * @return Collection
     */
    public function getUserPaymentMethods(int $id): Collection
    {
        $user = $this->getUser($id);

        return $user->paymentMethods;
    }

    /**
     * Devuelve todos los métodos de cobro del artista
     *
     * @param int $id
     * @return Collection
     */
    public function getUserChargingMethods(int $id): Collection
    {
        $user = $this->getUser($id);

        return $user->chargingMethods;
    }

    /**
     * Devuelve el balance del usuario
     */
    public function getUserBalance(int $id): array
    {
        $user = $this->getUser($id);

        if (!$user) {
            abort(404, 'Usuario no encontrado');
        }

        // cuenta conectada
        $stripe = new Stripe();
        $conected = $stripe->getBalanceConectedAccount($user->stripe_account_id);

        // obtener el balance de la cuenta
        return $conected->toArray();
    }

    /**
     * Devuelve los pagos realizados al usuario
     */
    public function getUserPayout(int $id): array
    {
        $user = $this->getUser($id);

        if (!$user) {
            abort(404, 'Usuario no encontrado');
        }

        // los pagos
        $payouts = $user->getStripePayouts();

        return $payouts->toArray();
    }
}
