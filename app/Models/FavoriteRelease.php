<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FavoriteRelease extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'favorite_releases';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'release_id',
    ];

    /**
     * Get the user that owns the favorite release.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the release that owns the favorite release.
     *
     * @return BelongsTo
     */
    public function release(): BelongsTo
    {
        return $this->belongsTo(UserRelease::class, 'release_id');
    }
}
