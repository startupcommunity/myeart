<?php

namespace App\Http\Controllers;

use App\Querys\PayoutDB;
use App\Utils\ResponseJson;
use Exception;
use Illuminate\Http\JsonResponse;

class PayoutController extends Controller
{
    public function __construct(
        private ResponseJson $resp,
        private PayoutDB $db
    ) {
    }

    /**
     * Devuelve los detalles de un pago
     */
    public function getPayoutDetails(string $payoutID): JsonResponse
    {
        try {
            $resp = $this->db->getPayoutDetails($payoutID);
            return $this->resp->json($resp, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
