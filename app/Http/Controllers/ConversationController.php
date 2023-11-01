<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateConversationMessageRequest;
use App\Http\Requests\CheckConversationRequest;
use App\Factories\ConversationFactory;
use Illuminate\Http\JsonResponse;
use App\Querys\ConversationDB;
use App\Utils\ResponseJson;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function __construct(
        private ConversationFactory $factory,
        private ConversationDB $db,
        private ResponseJson $resp
    ) {
    }

    /**
     * Verifica si dos usuarios tienen una conversación activa
     */
    public function check(CheckConversationRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->check($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Envía un nuevo mensaje a una conversación
     */
    public function sendMessage(CreateConversationMessageRequest $request): JsonResponse
    {
        try {
            $data = $this->factory->sendMessage($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Obtiene los mensajes de una conversación
     *
     * @param int $id   id de la conversación
     */
    public function getMessages(int $id): JsonResponse
    {
        try {
            $data = $this->db->getMessages($id);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }

    /**
     * Marca todos los mensajes de un usuario como Leidos
     *
     * @param Request $request
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        try {
            $data = $this->factory->markAllAsRead($request);
            return $this->resp->json($data, 200);
        } catch (Exception $e) {
            return $this->resp->json($e, 500);
        }
    }
}
