<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInformations extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_informations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'perfil',
        'fecha_nacimiento',
        'sexo',
        'pais_id',
        'asociacion_arte',
        'consejeria_ayuntamiento',
        'galeria',
        'asociacion_turismo',
        'lang',
        'country',
        'bio_title',
        'bio_content',
    ];
}
