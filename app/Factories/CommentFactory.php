<?php

namespace App\Factories;

use App\Models\Answer;
use App\Models\Artwork;
use App\Models\Comment;

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
}
