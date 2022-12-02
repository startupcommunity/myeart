<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

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
}
