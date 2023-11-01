<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSocialNetwork extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_social_networks';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
}
