<?php

namespace App\Http\Controllers;

use App\Factories\ShippingAddressFactory;
use App\Http\Requests\ShippingAddressRequest;
use App\Querys\ShippingAddressDB;
use App\Utils\ResponseJson;
use Illuminate\Http\JsonResponse;

class ShippingAddressController extends Controller
{
    private $resp;
    private $db;
    private $shipping;

    public function __construct(ResponseJson $resp, ShippingAddressFactory $shipping, ShippingAddressDB $db)
    {
        $this->resp = $resp;
        $this->shipping = $shipping;
        $this->db = $db;
    }

    /**
     * Devuelve las direcciones de envío del usuario logueado
     *
     * @return JsonResponse
     */
    public function getUserShippingAddress(): JsonResponse
    {
        $data = $this->db->getUserShippingAddress();

        return $this->resp->json($data, 200);
    }

    /**
     * Crea una nueva dirección de envío del usuario
     * logueado
     *
     * @param ShippingAddressRequest $request
     * @return JsonResponse
     */
    public function save(ShippingAddressRequest $request): JsonResponse
    {
        $data = $request->validated();

        // actualizar los registros por default a 0
        $this->shipping->updateDefaultField();

        // crear
        $created = $this->shipping->save($data);

        // si hubo algún error
        abort_if(!$created, 500, 'error al guardar los datos');

        return $this->resp->json($created, 201);
    }

    /**
     * actualiza una dirección de envío del usuario
     * logueado
     *
     * @param ShippingAddressRequest $request
     * @return JsonResponse
     */
    public function update(ShippingAddressRequest $request, int $id): JsonResponse
    {
        $data = $request->validated();

        // actualizar
        $updated = $this->shipping->update($data, $id);

        // si hubo algún error
        abort_if(!$updated, 500, 'error al actualizar los datos');

        return $this->resp->json('Actualización correcta', 201);
    }

    /**
     * Elimina una dirección
     *
     * @param integer $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        // soft delete
        $deleted = $this->shipping->delete($id);

        // si hubo algún error
        abort_if(!$deleted, 500, 'error al eliminar los datos');

        return $this->resp->json('Eliminación correcta', 200);
    }
}
