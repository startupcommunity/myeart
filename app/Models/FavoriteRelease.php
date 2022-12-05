<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavoriteRelease extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'favorite_releases';

    protected $fillable = [
        'user_id',
        'release_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function release()
    {
        return $this->belongsTo(Release::class);
    }
}
