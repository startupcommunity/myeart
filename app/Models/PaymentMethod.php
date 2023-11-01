<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentMethod extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'payment_methods';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',          // int
        'bank_id',          // int
        'card_type',        // varchar
        'card_number',      // varchar
        'card_expiration',  // varchar
        'card_cvv',         // varchar
        'account_number',   // varchar
        'fullname',         // varchar
        'bank_name',        // varchar
        'status',           // tinyint
        'default',          // tinyint
    ];

    /**
     * Get the user that owns the payment method.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
