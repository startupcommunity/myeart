<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmOrdenRequest;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\JsonResponse;
use App\Factories\OrderFactory;
use App\Http\Requests\CancelItemOrderRequest;
use App\Http\Requests\ConfirmItemOrderRequest;
use Illuminate\Http\Request;
use App\Utils\ResponseJson;
use App\Querys\OrderDB;
use Exception;

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
     * Cancela un item de una orden
     *
     * @param CancelItemOrderRequest $request
     * @return JsonResponse
     */
    public function cancelItem(CancelItemOrderRequest $request): JsonResponse
    {
        try {
            $cancelled = $this->factory->cancelItem($request);
            $msj = $cancelled ? 'Articulo cancelado' : 'No se pudo cancelar el articulo';
            $status = $cancelled ? 200 : 204;
            return $this->resp->json($msj, $status);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Confirma un item de una orden
     *
     * @param ConfirmItemOrderRequest $request
     * @return JsonResponse
     */
    public function confirmItem(ConfirmItemOrderRequest $request): JsonResponse
    {
        try {
            $confirm = $this->factory->confirmItem($request);
            $msj = $confirm ? 'Articulo confirmado con éxito' : 'No se pudo confirmar el articulo';
            $status = $confirm ? 200 : 204;
            return $this->resp->json($msj, $status);
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

    /**
     * Descargar un certificado con los datos de la orden
     * formato pdf
     * @param integer $id       ID de la orden
     * @return
     */
    public function downloadPdf(int $id)
    {
        // obtiene la orden y sus items
        $order = $this->db->getItems($id);
        $pdf = PDF::loadView('pdf.orders.index', $order);
        return $pdf->stream('invoice.pdf');
    }

    /**
     * Devuelve todas las ventas de un usuario
     *
     * @param integer|null $id       ID del usuario
     * @return JsonResponse
     */
    public function getUserSales(?int $id = null): JsonResponse
    {
        try {
            $sales = $this->db->getUserSales($id);
            return $this->resp->json($sales, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
