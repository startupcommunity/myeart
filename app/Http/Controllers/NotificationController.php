<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class NotificationController extends Controller
{

    public function __construct(
        private ResponseJson $resp
    ) {
    }

    /**
     * Cambia el estatus de la notificacion como leida
     *
     * @param id $request
     * @return JsonResponse
     */
    public function markAsRead($id): JsonResponse
    {
        $notification = DB::table('notifications')
        ->where('id', '=', $id)
        ->update(['read_at' => Carbon::now()]);

        return $this->resp->json($notification, 200);
    }
}
