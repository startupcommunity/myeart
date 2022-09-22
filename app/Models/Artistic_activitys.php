<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artistic_activitys extends Model
{
    use HasFactory;

    public function artisticsUsers()
    {
        return $this->belongsToMany(User::class);
    }
}
