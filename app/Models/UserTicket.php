<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserTicket extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_tickets';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_item_id',
        'user_id',
        'event_id'
    ];

    /**
     * El usuario al que pertenece
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * El evento al que pertenece
     *
     * @return BelongsTo
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(UserEvent::class);
    }

    /**
     * El item de la orden al que pertenece el ticket(donde fue comprado)
     *
     * @return BelongsTo
     */
    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }
}
