<?php

namespace App\Factories;

use App\Models\Answer;
use App\Models\Artwork;
use App\Models\Comment;
use App\Models\CommentLike;

class CommentFactory
{
  /**
   * Crea un comentario de una obra
   */
  public function createArtworkComment($request): Comment
  {
    $art = Artwork::find($request->artwork_id);
    $data = $request->only(['comment', 'user_id']);
    return $art->comments()->create($data);
  }

  /**
   * Devuelve los comentarios de una obra
   */
  public function getArtworkComments(int $id): array
  {
    $art = Artwork::find($id);
    return $art->comments()
      ->with(['user', 'answer'])
      ->orderBy('id', 'DESC')
      ->get()
      ->toArray();
  }

  /**
   * Crea una respuesta a un comentario de una obra
   *
   * @param Collection $request
   * @return Answer
   */
  public function createArtworkAnswer($request): Answer
  {
    $comment = Comment::find($request->comment_id);
    $data = $request->only(['answer', 'user_id']);
    return $comment->answer()->create($data);
  }

  /**
   * Agrega un like a un comentario de una publicación
   *
   * @param Collection $request
   * @return CommentLike|null
   */
  public function addReleaseLike($request): ?CommentLike
  {
    $comment = Comment::find($request->comment_id);
    $data = $request->only(['user_id']);

    // si ya le dio like al comentario, no se agrega
    if ($comment->likes()->where('user_id', $request->user_id)->exists()) {
      return null;
    }

    return $comment->likes()->create($data);
  }

  /**
   * Elimina un like a un comentario de una publicación
   *
   * @param Collection $request
   * @return bool|null
   */
  public function deleteReleaseLike($request): ?bool
  {
    $comment = Comment::find($request->comment_id);

    // si no le dio like al comentario, no se elimina
    if (!$comment->likes()->where('user_id', $request->user_id)->exists()) {
      return null;
    }

    return $comment->likes()->where('user_id', $request->user_id)->delete();
  }

  /**
   * Agrega una respuesta a un comentario de una publicación
   *
   * @param Request $request
   * @return Answer
   */
  public function addReleaseAnswer($request): Answer
  {
    $comment = Comment::find($request->comment_id);
    $data = $request->only(['answer', 'user_id']);
    return $comment->answer()->create($data);
  }
}
