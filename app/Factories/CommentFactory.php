<?php

namespace App\Factories;

use App\Enums\TypeNotificationEnum;
use App\Events\NotificationEvent;
use App\Models\Answer;
use App\Models\Artwork;
use App\Models\Comment;
use App\Models\CommentLike;
use App\Models\User;
use App\Models\UserRelease;
use App\Utils\AppNotification;

class CommentFactory
{
  /**
   * Crea un comentario de una obra
   */
  public function createArtworkComment($request): Comment
  {
    $art = Artwork::find($request->artwork_id);
    $data = $request->only(['comment', 'user_id']);

    //Evento para Notificación de nuevo comentario
    $noty = [
      'user_id' => $request->user_id,
      'notifiable_id' => $art->user_id,
      'url' => '/obras/' . $art->id,
      'message' => "Realizó una pregunta sobre tu obra",
      'type' => TypeNotificationEnum::QUESTION //'new-question'
    ];

    event(new NotificationEvent($noty));

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

    //Evento para Notificación de respuesta a comentario
    if ($comment->commentable_type == 'App\Models\Artwork') {
      $url = '/obras/' . $comment->commentable_id;
    } else {
      $url = '/comunidad';
    }

    //Respuesta a comentario de una obra
    $noty = [
      'user_id' => $request->user_id,
      'notifiable_id' => $comment->user_id,
      'url' => $url,
      'message' => "Ha respondido su pregunta",
      'type' => TypeNotificationEnum::ANSWER //'new-answer'
    ];
    event(new NotificationEvent($noty));

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

    //Evento para Notificación de Like a comentario de publicación
    if ($request->user_id != $comment->user_id) {
      $noty = [
        'user_id' => $request->user_id,
        'notifiable_id' => $comment->user_id,
        'url' => '/usuario/perfil/' . $comment->user_id . '/pub',
        'message' => "Le gustó tu comentario",
        'type' => TypeNotificationEnum::LIKE_COMMENT //'new-like-comment'
      ];
      event(new NotificationEvent($noty));
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

    //Evento para Notificación de respuesta a comentario
    if ($comment->commentable_type == 'App\Models\Artwork') {
      $url = '/obras/' . $comment->commentable_id;
    } else {
      $release = UserRelease::where('slug', $request->slug)->first();
      if ($release) {
        $url = '/publicaciones/slug/' . $release->slug;
      } else {
        $url = '/comunidad';
      }
    }

    // enviar la notificacion al usuario
    AppNotification::sendNoty([
      'user_id' => $request->user_id,
      'notifiable_id' => $comment->user_id,
      'url' => $url,
      'msj' => "Ha respondido su comentario",
      'type' => TypeNotificationEnum::ANSWER,
    ]);

    return $comment->answer()->create($data);
  }
}
