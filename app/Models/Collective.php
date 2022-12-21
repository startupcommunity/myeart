<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Collective extends Model
{
    use SoftDeletes;

    protected $table = 'collectives';

    protected $fillable = [
        'user_id',
        'name',
        'category',
        'description',
    ];

    /**
     * Usuario perteneciente
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
