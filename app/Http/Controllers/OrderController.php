<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Querys\OrderDB;
use App\Utils\ResponseJson;
use Exception;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function __construct(
        private OrderDB $db,
        private ResponseJson $resp,
    ) {
    }

    /**
     * Devuelve los items de una orden
     *
     * @param integer $id       ID de la orden
     * @return JsonResponse
     */
    public function getItems(int $id): JsonResponse
    {
        try {
            $this->authorize('getItems', $this->db->getOrder($id));
            $items = $this->db->getItems($id);
            return $this->resp->json($items, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
