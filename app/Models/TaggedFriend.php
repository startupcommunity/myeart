<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
