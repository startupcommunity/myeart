<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateNewsletterRequest;
use App\Factories\NewsletterFactory;
use Illuminate\Http\JsonResponse;
use App\Utils\ResponseJson;

class NewsletterController extends Controller
{
    public function __construct(
        private NewsletterFactory $factory,
        private ResponseJson $resp
    ) {
        //
    }

    /**
     * Suscribe a un usuario al newsletter
     *
     * @param CreateNewsletterRequest $request      Datos del usuario
     * @return JsonResponse
     */
    public function suscribe(CreateNewsletterRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->create($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
