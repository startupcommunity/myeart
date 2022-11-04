<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArtworkView extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'artwork_views';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
}
