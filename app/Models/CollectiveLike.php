<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CollectiveLike extends Model
{
    protected $table = 'collective_likes';

    protected $fillable = [
        'user_id',
        'collective_id',
    ];

    /**
     * Get the user that owns the CollectiveLike
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the collective that owns the CollectiveLike
     *
     * @return BelongsTo
     */
    public function collective(): BelongsTo
    {
        return $this->belongsTo(Collective::class);
    }
}
