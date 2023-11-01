<?php

namespace App\Http\Controllers;

use App\Factories\NotificationFactory;
use Illuminate\Support\Facades\DB;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class NotificationController extends Controller
{

    public function __construct(
        private ResponseJson $resp,
        private NotificationFactory $factory
    ) {
    }

    /**
     * Cambia el estatus de la notificacion como leída
     *
     * @param id $request
     * @return JsonResponse
     */
    public function markAsRead($id): JsonResponse
    {
        $notification = DB::table('notifications')
            ->where('id', '=', $id)
            ->update(['read_at' => Carbon::now()]);

        if (!$notification) {
            return $this->resp->json(0, 400);
        }

        return $this->resp->json($notification, 200);
    }

    /**
     * Marca todas las notificaciones como leídas
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        try {
            $resp = $this->factory->markAllAsRead($request);
            return $this->resp->json($resp ? 1 : 0, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
