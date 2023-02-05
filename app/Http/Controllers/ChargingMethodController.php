<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateChargingMethodRequest;
use App\Factories\ChargingMethodFactory;
use Illuminate\Http\JsonResponse;
use App\Querys\ChargingMethodDB;
use Illuminate\Http\Request;
use App\Utils\ResponseJson;
use Exception;

class ChargingMethodController extends Controller
{
    public function __construct(
        private ChargingMethodDB $db,
        private ChargingMethodFactory $factory,
        private ResponseJson $resp
    ) {
    }

    /**
     * Muestra todos los métodos de cobro (bancos)
     *
     * @param  int  $id     id del usuario
     * @return json
     */
    public function getUserChargingMethods(int $id): JsonResponse
    {
        try {
            $data = $this->db->getUserChargingMethods($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Almacena un método de cobro
     *
     * @param  CreateChargingMethodRequest  $request
     * @return json
     */
    public function store(CreateChargingMethodRequest $request): JsonResponse
    {
        try {
            $chargingMethod = $this->factory->addMethod($request);
            $data = $chargingMethod ? $chargingMethod : 'No se pudo agregar el método de cobro';
            $status = $chargingMethod ? 200 : 204;
            return $this->resp->json($data, $status);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }


    /**
     * Actualiza un método de cobro
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * elimina un método de cobro
     *
     * @param int $id  id del método de cobro
     * @return json
     */
    public function delete(int $id): JsonResponse
    {
        try {
            $resp = $this->factory->deleteMethod($id);
            $msj = $resp ? 'Método de cobro eliminado' : 'No se pudo eliminar el método de cobro';
            $status = $resp ? 200 : 204;
            return $this->resp->json($msj, $status);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
