<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArtworkLike extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'artwork_likes';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * La obra perteneciente
     *
     * @return void
     */
    public function artwork()
    {
        $this->belongsTo(Artwork::class);
    }

    /**
     * El usuario que le dio like a la obra
     *
     * @return void
     */
    public function user()
    {
        $this->belongsTo(User::class);
    }
}
