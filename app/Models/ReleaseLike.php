<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReleaseLike extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'release_likes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'release_id',
        'user_id',
    ];

    /**
     * Devuelve el usuario que dio like a la publicación
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Devuelve la publicación a la que se le dio like
     */
    public function release(): BelongsTo
    {
        return $this->belongsTo(UserRelease::class, 'release_id');
    }
}
