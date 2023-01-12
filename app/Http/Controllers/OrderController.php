<?php

namespace App\Http\Controllers;

use App\Factories\OrderFactory;
use App\Http\Requests\ConfirmOrdenRequest;
use Illuminate\Http\JsonResponse;
use App\Utils\ResponseJson;
use App\Querys\OrderDB;
use Exception;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        private OrderDB $db,
        private OrderFactory $factory,
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

    /**
     * Devuelve todas las ordenes del usuario logueado
     *
     * @param Request $request
     * @param integer|null $id       ID del usuario
     * @return JsonResponse
     */
    public function getUserOrders(Request $request, ?int $id = null): JsonResponse
    {
        try {
            $orders = $this->db->getUserOrders($request, $id);
            return $this->resp->json($orders, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Cancelar una orden
     *
     * @param integer $id       ID de la orden
     * @param Request $request  Request
     * @return JsonResponse
     */
    public function cancelOrders(Request $request, int $id): JsonResponse
    {
        try {
            $this->authorize('getItems', $this->db->getOrder($id));
            $this->factory->cancelOrders($request, $id);
            return $this->resp->json('Orden cancelada', 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Confirma una orden de compra
     *
     * @param ConfirmOrdenRequest $request
     * @return JsonResponse
     */
    public function confirmOrders(ConfirmOrdenRequest $request): JsonResponse
    {
        try {
            $this->factory->confirmOrders($request);
            return $this->resp->json('Orden confirmada', 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
