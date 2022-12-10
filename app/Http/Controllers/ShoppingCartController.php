<?php

namespace App\Http\Controllers;

use App\Factories\ShoppingCartFactory;
use App\Querys\ShoppingCartDB;
use App\Utils\ResponseJson;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{
    public function __construct(
        private ShoppingCartFactory $factory,
        private ShoppingCartDB $db,
        private ResponseJson $resp,
    ) {
    }

    /**
     * Agrega un item al carrito de compras
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addItem(Request $request): JsonResponse
    {
        try {
            $cart = $this->factory->addItemToCart($request);

            if ($cart) {
                return $this->resp->json($cart, 200);
            }

            return $this->resp->json('La obra no se encuentra disponible', 204);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Obtiene los items del carrito de compras
     * del usuario logueado
     *
     * @return JsonResponse
     */
    public function getItems(): JsonResponse
    {
        try {
            $items = $this->db->getItemsOfAuthUser();
            return $this->resp->json($items, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Elimina un item del carrito de compras
     *
     * @param integer $id
     * @return JsonResponse
     */
    public function deleteItem(int $id): JsonResponse
    {
        try {
            $item = $this->factory->deleteItem($id);
            return $this->resp->json($item, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), $e->getCode());
        }
    }
}
