<?php

namespace App\Models;

use App\Models\Traits\CollectiveTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Collective extends Model
{
    use SoftDeletes, CollectiveTrait;

    protected $table = 'collectives';

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'location',
        'description',
    ];

    /**
     * crear slug
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($col) {
            $col->slug = Str::slug($col->name);
        });
    }

    /**
     * Usuario perteneciente
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Categorías del colectivo
     */
    public function categories(): HasMany
    {
        return $this->hasMany(CollectiveCategory::class);
    }

    /**
     * Devuelve los eventos que pertenezcan a el collectivo
     *
     * @return HasMany
     */
    public function events(): HasMany
    {
        return $this->hasMany(UserEvent::class);
    }

    /**
     * Perfil del colectivo
     */
    public function profile(): HasOne
    {
        return $this->hasOne(CollectiveProfile::class);
    }

    /**
     * Devuelve los colectivos a los cuales el usuario pertenece
     */
    // public function guests(): HasMany
    // {
    //     return $this->hasMany(GuestCollective::class);
    // }

    /**
     * Devuelve los miembros del colectivo
     */
    public function members(): HasMany
    {
        return $this->hasMany(MemberCollective::class);
    }

    /**
     * Devuelve las invitaciones al colectivo
     */
    public function invitations(): HasMany
    {
        return $this->hasMany(CollectiveInvitation::class);
    }

    /**
     * Devolver las obras del colectivo
     */
    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }

    /**
     * Devuelve las publicaciones del colectivo
     */
    public function releases(): HasMany
    {
        return $this->hasMany(UserRelease::class);
    }

    /**
     * Devuelve los likes del colectivo
     */
    public function likes(): HasMany
    {
        return $this->hasMany(CollectiveLike::class);
    }

    /**
     * Devuelve los seguidores del colectivo
     *
     * @return HasMany
     */
    public function followers(): HasMany
    {
        return $this->hasMany(FollowCollective::class);
    }
}
