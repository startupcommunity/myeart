<?php

namespace App\Models;

use App\Enums\ProfileTypeEnum;
use App\Enums\ReleaseTypeEnum;
use Illuminate\Database\Eloquent\Builder;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'profile_photo',
        'front_photo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userArtistic()
    {
        return $this->belongsToMany(Artistic_activitys::class);
    }

    /**
     * Devuelve los datos como artista
     *
     * @return HasMany
     */
    public function artistic(): HasMany
    {
        return $this->HasMany(Artistic_activitys::class);
    }

    /**
     * Devuelve los datos del perfil de usuario
     *
     * @return HasOne
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserInformations::class, 'user_id')->withDefault();
    }

    /**
     * Devuelve las redes sociales del artista
     *
     * @return HasOne
     */
    public function socialNetwork(): HasOne
    {
        return $this->hasOne(UserSocialNetwork::class, 'user_id')->withDefault([
            'facebook' => '',
            'instagram' => '',
            'twitter' => '',
            'youtube' => '',
            'behance' => '',
            'linkedin' => '',
            'pinterest' => '',
        ]);
    }

    /**
     * devuelve las obras creadas del usuario
     *
     * @return HasMany
     */
    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }

    /**
     * devuelve los artistas/usuarios seguidos
     *
     * @return HasMany
     */
    public function followingArtists(): HasMany
    {
        return $this->hasMany(FollowedArtist::class, 'follower_id');
    }

    /**
     * Devuelve las obras guardadas como favoritas por el usuario
     *
     * @return HasMany
     */
    public function favoriteArtworks(): HasMany
    {
        return $this->hasMany(FavoriteArtwork::class, 'user_id');
    }

    /**
     * devuelve los artistas/usuarios que siguen al usuario
     *
     * @return HasMany
     */
    public function followers(): HasMany
    {
        return $this->hasMany(FollowedArtist::class, 'following_id');
    }

    /**
     * devuelve los eventos creados por el usuario
     *
     * @return HasMany
     */
    public function events(): HasMany
    {
        return $this->hasMany(UserEvent::class);
    }

    /**
     * devuelve los colectivos creados por el usuario
     *
     * @return HasMany
     */
    public function collectives(): HasMany
    {
        return $this->hasMany(Collective::class);
    }

    /**
     * devuelve los colectivos seguidos o que ha
     * sido invitado por el usuario
     *
     * @return HasMany
     */
    public function guestCollectives(): HasMany
    {
        return $this->hasMany(GuestCollective::class);
    }

    /**
     * devuelve las publicaciones del usuario
     *
     * @return HasMany
     */
    public function releases(): HasMany
    {
        return $this->hasMany(UserRelease::class, 'user_id');
    }

    /**
     * Devuelve las publicaciones guardadas como favoritas
     *
     * @return HasMany
     */
    public function favoriteReleases(): HasMany
    {
        return $this->hasMany(FavoriteRelease::class, 'user_id');
    }

    /**
     * devuelve los eventos seguidos por el usuario
     *
     * @return HasMany
     */
    public function favoriteEvents(): HasMany
    {
        return $this->hasMany(FavoriteEvent::class, 'user_id');
    }

    /**
     * devuelve las direcciones de envío del usuario
     *
     * @return HasMany
     */
    public function shippingAddress(): HasMany
    {
        return $this->hasMany(ShippingAddress::class);
    }

    /**
     * devuelve el carrito de compras del usuario
     * junto a todas sus obras
     *
     * @return HasMany
     */
    public function shoppingCart(): HasMany
    {
        return $this->hasMany(ShoppingCart::class);
    }

    /**
     * devuelve las ordenes realizadas por el usuario
     *
     * @return HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * devuelve las invitaciones a colectivos
     * que ha recibido el usuario
     *
     * @return HasMany
     */
    public function collectiveInvitations(): HasMany
    {
        return $this->hasMany(CollectiveInvitation::class);
    }

    /**
     * Determina si el usuario tiene foto de perfil
     * @luisandev
     * @return boolean      true si posee
     */
    public function hasAProfilePhoto(): bool
    {
        return !is_null($this->profile_photo);
    }

    /**
     * Determina si el usuario tiene foto de portada
     * @luisandev
     * @return boolean      true si posee
     */
    public function hasAFrontPhoto(): bool
    {
        return !is_null($this->front_photo);
    }

    // ------------------------------------------------
    // ------------- Local Scopes ---------------------
    // ------------------------------------------------

    /**
     * Devuelve los usuario del tipo artista
     *
     * @param  Builder $query
     * @return Builder
     */
    public function scopeArtist($query)
    {
        return $query->whereHas(
            'profile',
            fn ($pro) => $pro->where('perfil', ProfileTypeEnum::ARTIST)
        );
    }

    /**
     * Filtra de no incluir el usuario indicado
     *
     * @param  Builder $query
     * @return Builder
     */
    public function scopeNotUser($query, $id)
    {
        return $query->where('id', '<>', $id);
    }

    /**
     * Filtra por las categorías de las obras de los artistas
     *
     * @param  Builder $query
     * @return Builder
     */
    public function scopeArtworkCategory($query, $cat = null, $sub = null, $label = null)
    {
        return $query->whereHas('artworks', fn ($art) => $art->category($cat, $sub, $label));
    }

    /**
     * Devuelve las publicaciones de los usuarios seguidos
     *
     * @param Builder $query
     * @return void
     */
    public function scopeFollowReleases($query)
    {
        return $query->whereHas('followingArtists', fn ($art) => $art->whereHas('following', fn ($rel) => $rel->releases()));
    }

    /**
     * Devuelve los artistas seguidos con sus publicaciones
     *
     * @param Builder $query
     * @return void
     */
    public function scopeFollowingArtistReleases($query, ?int $type = null)
    {
        $artists = $this->followingArtists();
        $releaseRelations = ['labels.user', 'likes.user', 'creator.artworks.categories', 'comments'];
        $type = $type ?? ReleaseTypeEnum::ARTIST;

        // indicar también el type del release
        $relations = [
            'following.releases' =>
            fn ($rel) => $rel->with($releaseRelations)->where('type', $type),
        ];

        return $artists->with($relations);
    }
}
