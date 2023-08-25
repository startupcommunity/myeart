<?php

namespace App\Models;

use App\Models\Traits\UserScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Billable, UserScope;

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
        'stripe_account_id', // id de la cuenta de stripe del usuario - vendedor
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
     * devuelve los colectivos a los que pertenece el usuario
     *
     * @return HasMany
     */
    public function memberCollective(): HasMany
    {
        return $this->hasMany(MemberCollective::class);
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
     * devuelve los colectivos seguidos por el usuario
     *
     * @return HasMany
     */
    public function followedCollectives(): HasMany
    {
        return $this->hasMany(FollowCollective::class);
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
     * devuelve las calificaciones que ha recibido el usuario
     *
     * @return HasMany
     */
    public function ratings(): HasMany
    {
        return $this->hasMany(RatingOrder::class);
    }

    /**
     * devuelve los métodos de pago del usuario
     *
     * @return HasMany
     */
    public function paymentMethods(): HasMany
    {
        return $this->hasMany(PaymentMethod::class);
    }

    /**
     * devuelve los métodos de cobro del usuario
     *
     * @return HasMany
     */
    public function chargingMethods(): HasMany
    {
        return $this->hasMany(ChargingMethod::class);
    }

    /**
     * Devuelve los chat o conversaciones que ha tenido el usuario
     *
     * @return
     */
    public function conversations(): HasMany
    {
        // hacerlo como una relación hasMany
        return $this->hasMany(Conversation::class, 'init_user_id')
            ->where('init_user_id', $this->id)
            ->orWhere('resp_user_id', $this->id);
    }

    /**
     * Devuelve la relación del usuario con su password reset
     *
     * @return HasOne
     */
    public function userPasswordReset(): HasOne
    {
        return $this->hasOne(UserPasswordReset::class);
    }

    /**
     * Devuelve la relación con la confirmación de registro del usuario
     */
    public function userConfirmRegister(): HasOne
    {
        return $this->hasOne(UserConfirmRegister::class);
    }

    /**
     * Devuelve los pagos por medio de stripe al usuario
     */
    public function userStripePayouts(): HasMany
    {
        return $this->hasMany(UserStripePayout::class);
    }
}
