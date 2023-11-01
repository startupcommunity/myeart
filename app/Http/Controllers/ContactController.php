<?php

namespace App\Http\Controllers;

use App\Factories\ContactFactory;
use App\Http\Requests\CreateContactRequest;
use Illuminate\Http\JsonResponse;
use App\Utils\ResponseJson;
use Exception;

class ContactController extends Controller
{
    public function __construct(
        private ContactFactory $factory,
        private ResponseJson $resp
    ) {
    }

    /**
     * Envía un mensaje de contacto
     *
     * @param CreateContactRequest $request      Request
     * @return JsonResponse
     */
    public function send(CreateContactRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->create($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
