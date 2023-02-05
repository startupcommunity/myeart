<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChargingMethod extends Model
{

    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'charging_methods';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',                  // int
        'stripe_bank_account_id',   // varchar
        'country',                  // varchar  (ES)
        'currency',                 // varchar  (EUR)
        'routing_number',           // varchar  (optional)
        'account_name',             // varchar  (optional)
        'account_number',           // varchar  (number of account)
        'account_holder_name',      // varchar  (full name)
        'account_holder_type',      // varchar  (individual)
        'default',                  // tinyint  (1)
    ];

    /**
     * El usuario creador de la cuenta
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
