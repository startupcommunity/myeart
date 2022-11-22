<?php

namespace App\Http\Controllers;

use App\Factories\CommentFactory;
use App\Http\Requests\CreateArtworkAnswerCommentRequest;
use App\Http\Requests\CreateArtworkCommentRequest;
use App\Utils\ResponseJson;
use Exception;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    private $factory;
    private $resp;

    public function __construct(CommentFactory $factory, ResponseJson $resp)
    {
        $this->factory = $factory;
        $this->resp = $resp;
    }

    /**
     * Agrega un comentario/pregunta a una obra
     *
     * @param CreateArtworkCommentRequest $request
     * @return JsonResponse
     */
    public function saveCommentArtwork(CreateArtworkCommentRequest $request): JsonResponse
    {
        try {
            $comment = $this->factory->createArtworkComment($request);
            return $this->resp->json($comment, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Devuelve la lista de comentarios de una obra
     *
     * @param $id
     * @return JsonResponse
     */
    public function artworkList(int $id): JsonResponse
    {
        try {
            $comments = $this->factory->getArtworkComments($id);
            return $this->resp->json($comments, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }

    /**
     * Guardar la respuesta de un comentario/pregunta de una obra
     *
     * @param CreateArtworkAnswerCommentRequest $request
     * @return JsonResponse
     */
    public function saveAnswer(CreateArtworkAnswerCommentRequest $request): JsonResponse
    {
        try {
            $answer = $this->factory->createArtworkAnswer($request);
            return $this->resp->json($answer, 200);
        } catch (Exception $e) {
            return $this->resp->json($e->getMessage(), 500);
        }
    }
}
