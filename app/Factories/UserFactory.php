<?php

namespace App\Factories;

use App\Enums\TypeNotificationEnum;
use App\Events\NotificationEvent;
use App\Mail\ConfirmRegisterEmail;
use App\Models\User;
use App\Models\UserConfirmRegister;
use App\Models\UserStripePayout;
use App\Querys\UserDB;
use App\Utils\Payment\Stripe;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use PhpParser\Node\Expr\Cast\Object_;

class UserFactory
{
  private $user;
  private $db;

  public function __construct(User $user, UserDB $db)
  {
    $this->user = $user;
    $this->db = $db;
  }

  /**
   * Sigue a un artista
   *
   * @param Request $request
   * @return boolean
   */
  public function followArtist($request): bool
  {
    $follower = auth()->user();

    // no se puede seguir a el mismo
    if ($follower->id === $request->following_id) {
      return false;
    }

    $created = $follower
      ->followingArtists()
      ->create(['following_id' => $request->following_id]);

    //Evento para Notificación de nuevo seguidor
    $data = [
      'user_id' => $follower->id,
      'notifiable_id' => $request->following_id,
      'url' => '',
      'message' => "Ha comenzado a seguirte",
      'type' => TypeNotificationEnum::FOLLOW //'new-follower'
    ];

    event(new NotificationEvent($data));

    return $created ? true : false;
  }

  /**
   * Deja de seguir a un artista
   *
   * @param Request $request
   * @return boolean
   */
  public function unfollowArtist($request): bool
  {
    $follower = auth()->user();

    // dejar de seguir al artista indicado
    $deleted = $follower->followingArtists()
      ->where('following_id', $request->following_id)
      ->delete();


    //Evento para Notificación dejo de seguir
    $data = [
      'user_id' => $follower->id,
      'notifiable_id' => $request->following_id,
      'url' => '',
      'message' => "Ha dejado de seguirte",
      'type' => TypeNotificationEnum::UNFOLLOW //'unfollow'
    ];

    event(new NotificationEvent($data));

    return $deleted;
  }

  /**
   * Agrega una obra a favoritos del usuario
   *
   * @param Request $request
   * @return boolean
   */
  public function addFavoriteArtwork($request): bool
  {
    $user = auth()->user();
    $artwork = $user->favoriteArtworks()->where('artwork_id', $request->artwork_id);

    // obras del usuario
    $userArtworks = $user->artworks()->pluck('id');

    // si la obra pertenece a el
    if ($userArtworks->contains($request->artwork_id)) {
      return false;
    }

    // si la obra ya está en favoritos, no se agrega
    if ($artwork->exists()) {
      return false;
    }


    // caso contrario, se agrega
    $user->favoriteArtworks()->create(['artwork_id' => $request->artwork_id]);

    return true;
  }

  /**
   * Elimina una obra de los favoritos del usuario
   *
   * @param Request $request
   * @return boolean
   */
  public function removeFavoriteArtwork($request): bool
  {
    $user = auth()->user();
    $artwork = $user->favoriteArtworks()->where('artwork_id', $request->artwork_id);

    // si la obra no está en favoritos, no se elimina
    if (!$artwork->exists()) {
      return false;
    }

    // caso contrario, se elimina
    return $artwork->delete();
  }

  /**
   * Envia un mail de confirmación de registro
   */
  public function sendEmailConfirmRegister(string $email)
  {
    $user = $this->user->where('email', $email)->first();
    $confirmEmail = new ConfirmRegisterEmail($user);
    return Mail::to($user->email)->send($confirmEmail);
  }

  /**
   * Crear token de confirmación de registro
   */
  public function createTokenConfirmRegister(string $email): UserConfirmRegister
  {
    // buscar user
    $user = $this->user->where('email', $email)->first();

    // verificar si ya tiene token de confirmación
    if ($user->userConfirmRegister()->exists()) {
      return $user->userConfirmRegister;
    }

    // crear token de confirmación
    return $user->userConfirmRegister()->create(['token' => Str::random(40)]);
  }

  /**
   * Crea un nuevo pago de stripe para retiro de fondos
   *
   * @param Request $request    datos del usuario a realizar el retiro
   */
  public function createUserPayout($request): array
  {
    $user = $this->db->getUser($request->user_id);

    if (!$user) {
      return [
        'message' => 'El usuario del retiro de fondos no se ha encontrado',
        'code' => 201,
        'data' => null
      ];
    }

    $charging = $user->getDefaultChargingMethod();

    if (!$charging) {
      return [
        'message' => 'El usuario no tiene un método de cobro predeterminado',
        'code' => 201,
        'data' => null
      ];
    }

    // usuario
    $stripe = new Stripe();
    $userBalance = $stripe->getBalanceConectedAccount($user->stripe_account_id)->toArray();
    // $getcc = $stripe->getConnectedAccount($user->stripe_account_id)->toArray();
    // dd($getcc);

    // restar el disponible - el pendiente
    // eliminar signo negativo si lo tiene el saldo pendiente
    $pending = $userBalance['pending'][0]['amount'];
    if ($pending < 0) {
      $pending = $pending * -1;
    }

    // restar
    $rest = $userBalance['available'][0]['amount'] - $pending;
    $amount = $userBalance['available'][0]['amount'];

    if ($rest <= 0) {
      return [
        'message' => 'El usuario no tiene fondos disponibles para retirar',
        'code' => 201,
        'data' => null
      ];
    }

    // dd($rest, $amount);
    // establecer el formato correcto para retirar fondos
    // $totalParcial = (int) floor($amount / 100);
    // tax stripe = 1.5% + 0.25€
    // $tax = (int) floor($amount * 0.015) + 25;
    // $totalParcial = (int) floor($amount - $tax);
    // $total = $totalParcial;
    // $total = $total * 100;
    // dd($amount, $total);
    // convertir saldo de euros a centavos

    // crear payout
    $payoutStripe = $stripe->createPayout([
      'amount' => $rest,
      'currency' => 'eur',
      'method' => 'standard',
      // 'destination' => $charging->stripe_bank_account_id,
      // 'source_type' => 'bank_account',
      'description' => 'Retiro de fondos para el usuario ' . $user->name,
      'statement_descriptor' => 'Retiro de fondos',
    ], ['stripe_account' => $user->stripe_account_id]);

    // guardar en la base de datos
    $payoutDB = $user->userStripePayouts()->create([
      'stripe_payout_id' => $payoutStripe->id,
      'destination' => $payoutStripe->destination,
      'amount' => $payoutStripe->amount,
      'method' => $payoutStripe->method,
      'currency' => $payoutStripe->currency,
      'arrival_date' => $payoutStripe->arrival_date,
      'created' => $payoutStripe->created,
      'description' => $payoutStripe->description,
      'automatic' => $payoutStripe->automatic,
      'statement_descriptor' => $payoutStripe->statement_descriptor,
      'failure_balance_transaction' => $payoutStripe->failure_balance_transaction,
      'failure_code' => $payoutStripe->failure_code,
      'failure_message' => $payoutStripe->failure_message,
      'original_payout' => $payoutStripe->original_payout,
      'reconciliation_status' => $payoutStripe->reconciliation_status,
      'reversed_by' => $payoutStripe->reversed_by,
      'source_type' => $payoutStripe->source_type,
      'type' => $payoutStripe->type,
      'status' => $payoutStripe->status,
    ]);

    return [
      'message' => 'El retiro de fondos se ha realizado correctamente',
      'data' => $payoutDB,
      'code'  => 200
    ];
  }
}
