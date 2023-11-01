<?php

namespace App\Http\Controllers;

use App\Factories\PaymentMethodFactory;
use App\Http\Requests\CreatePaymentMethodRequest;
use App\Querys\PaymentMethodDB;
use Illuminate\Http\JsonResponse;
use App\Utils\ResponseJson;
use Exception;

class PaymentMethodController extends Controller
{
    public function __construct(
        private PaymentMethodFactory $factory,
        private PaymentMethodDB $db,
        private ResponseJson $resp,
    ) {
    }

    /**
     * Agrega un método de pago
     *
     * @param CreatePaymentMethodRequest $request
     * @return JsonResponse
     */
    public function addPaymentMethod(CreatePaymentMethodRequest $request): JsonResponse
    {
        try {
            $payment = $this->factory->addPaymentMethod($request);
            $msj = $payment ? 'método de pago agregado con éxito' : 'no se pudo agregar el método de pago';
            $status = $payment ? 200 : 204;
            return $this->resp->json($msj, $status);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Elimina un método de pago
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deletePaymentMethod(int $id): JsonResponse
    {
        try {
            $payment = $this->factory->deletePaymentMethod($id);
            $msj = $payment ? 'método de pago eliminado con éxito' : 'no se pudo eliminar el método de pago';
            $status = $payment ? 200 : 204;
            return $this->resp->json($msj, $status);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
