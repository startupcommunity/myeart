<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommentLike extends Model
{
    protected $table = 'comment_likes';

    protected $fillable = [
        'user_id',
        'comment_id',
    ];

    /**
     * comentario al que pertenece el like
     *
     * @return BelongsTo
     */
    public function comment(): ?BelongsTo
    {
        return $this->belongsTo(Comment::class);
    }

    /**
     * usuario que dio like al comentario
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
