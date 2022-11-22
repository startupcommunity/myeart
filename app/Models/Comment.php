<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'comments';

    /**
     * Fillable
     */
    protected $fillable = [
        'comment',
        'user_id',
        'artwork_id',
    ];

    /**
     * Get the parent commentable model.
     *
     * comentarios de obras
     */
    public function commentable()
    {
        return $this->morphTo();
    }

    /**
     * Respuesta de un comentario
     */
    public function answer(): ?HasOne
    {
        return $this->hasOne(Answer::class, 'comment_id');
    }

    /**
     * Usuario que hace el comentario
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
