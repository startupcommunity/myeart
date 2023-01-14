<?php

namespace App\Factories;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationFactory
{
  public function __construct()
  {
    //
  }

  /**
   * Marca todas las notificaciones del usuario como leídas
   *
   * @param Request $request
   */
  public function markAllAsRead(Request $request): ?bool
  {
    $user = User::find($request->user_id);

    // notificaciones del usuario sin leer
    // marcar todas como ledas
    $marked = DB::table('notifications')
      ->where('notifiable_id', $user->id)
      ->whereNull('read_at')
      ->update(['read_at' => now()]);

    return $marked;
  }
}
