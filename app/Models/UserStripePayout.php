<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserStripePayout extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_stripe_payouts';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Generar un nuevo numero de transacción
     * cuando se registre un nuevo pago
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->number_transaction = date('dmY') . random_int(1000000000, 9999999999);
        });
    }

    /**
     * Relación con usuario
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
