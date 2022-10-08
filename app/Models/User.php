<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'profile_photo',
        'front_photo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userArtistic()
    {
        return $this->belongsToMany(Artistic_activitys::class);
    }

    public function profile()
    {
        return $this->hasOne(UserInformations::class, 'user_id');
    }

    /**
     * Determina si el usuario tiene foto de perfil
     * @luisandev
     * @return boolean      true si posee
     */
    public function hasAProfilePhoto(): bool
    {
        return !is_null($this->profile_photo);
    }

    /**
     * Determina si el usuario tiene foto de portada
     * @luisandev
     * @return boolean      true si posee
     */
    public function hasAFrontPhoto(): bool
    {
        return !is_null($this->front_photo);
    }
}
