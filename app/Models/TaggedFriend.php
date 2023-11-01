<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaggedFriend extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tagged_friends';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Devuelve la publicación a la que pertenece
     *
     * @return BelongsTo
     */
    public function release(): BelongsTo
    {
        return $this->belongsTo(UserRelease::class, 'release_id');
    }

    /**
     * Devuelve el usuario etiquetado
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
}
