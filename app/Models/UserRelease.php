<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class UserRelease extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_releases';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    // boot
    protected static function boot()
    {
        parent::boot();

        // crear slug cuando se crea una nueva publicación
        static::creating(function ($release) {
            $release->slug = Str::slug($release->text);
        });
    }

    /**
     * Devuelve los usuarios etiquetados
     *
     * @return HasMany
     */
    public function labels(): HasMany
    {
        return $this->hasMany(TaggedFriend::class, 'release_id');
    }

    /**
     * Devuelve los likes de la publicación
     *
     * @return HasMany
     */
    public function likes(): HasMany
    {
        return $this->hasMany(ReleaseLike::class, 'release_id');
    }

    /**
     * Devuelve los comentarios de la publicación
     *
     * @return MorphMany
     */
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    /**
     * Devuelve el dueño de la publicación
     *
     * @return BelongsTo
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
