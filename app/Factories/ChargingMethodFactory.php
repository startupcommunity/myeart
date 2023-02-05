<?php

namespace App\Factories;

use App\Models\ChargingMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class ChargingMethodFactory
{
  private $stripeClient;

  public function __construct(
    private ChargingMethod $charging,
  ) {
    $this->stripeClient = new StripeClient(env('STRIPE_SECRET'));
  }

  /**
   * Agrega un método de cobro al usuario
   *
   * @param Request $request
   * @return null|ChargingMethod
   */
  public function addMethod(Request $request): ?ChargingMethod
  {
    // obtiene el usuario
    $user = User::find($request->user_id);

    // conecta con stripe
    // colocar el método de cobro como predeterminado en stripe
    $resp = $this->stripeClient->accounts->createExternalAccount(
      $user->stripe_account_id,
      [
        'external_account' => [
          'object' => 'bank_account',
          'country' => 'ES',
          'currency' => 'eur',
          'account_holder_name' => $user->name,
          'account_holder_type' => 'individual',
          'account_number' => $request->account_number,
        ],
        'default_for_currency' => true,
      ]
    );


    // si se creo la cuenta de banco
    if ($resp->object == 'bank_account') {
      $data = $request->all();
      $data['stripe_bank_account_id'] = $resp->id;
      $data['account_holder_name'] = $resp->account_holder_name;

      $this->setAllMethodsAsNotDefault($request->user_id);
      return $this->charging->create($data);
    }

    return null;
  }

  /**
   * Coloca todos los métodos de cobro del usuario como no predeterminados
   *
   * @param int $user_id
   * @return void
   */
  public function setAllMethodsAsNotDefault(int $user_id): void
  {
    $this->charging->where('user_id', $user_id)->update(['default' => 0]);
  }

  /**
   * Coloca el ultimo método de cobro que se agrego como predeterminado
   * del usuario indicado
   *
   * @param int $user_id
   * @return void
   */
  public function setLastMethodAsDefault(int $user_id): void
  {
    $this->charging->where('user_id', $user_id)
      ->latest()->first()->update(['default' => 1]);
  }

  /**
   * Coloca el método de cobro indicado como predeterminado
   * según el stripe_bank_account_id
   *
   * @param string $stripe_bank_account_id  Id del método de cobro en stripe
   * @return bool
   */
  public function setMethodAsDefault(string $stripe_bank_account_id): bool
  {
    // obtiene el método de cobro
    $charging = $this->charging->where('stripe_bank_account_id', $stripe_bank_account_id)->first();

    // si existe el método de cobro
    if ($charging) {
      // conecta con stripe
      $resp = $this->stripeClient->accounts->updateExternalAccount(
        $charging->user->stripe_account_id,
        $charging->stripe_bank_account_id,
        [
          'default_for_currency' => true,
        ]
      );

      // si se actualizo el método de cobro en stripe
      if ($resp->object == 'bank_account') {
        // actualiza el método de cobro en la base de datos
        $this->setAllMethodsAsNotDefault($charging->user_id);
        $charging->update(['default' => 1]);
        return true;
      }
    }

    return false;
  }

  /**
   * Elimina un método de cobro
   *
   * @param int $id   Id del método de pago
   * @return bool
   */
  public function deleteMethod(int $id): bool
  {
    // conectar con stripe
    $charging = $this->charging->find($id);
    $resp = $this->stripeClient->accounts->deleteExternalAccount(
      $charging->user->stripe_account_id,
      $charging->stripe_bank_account_id,
    );

    if ($resp->deleted) {
      // selecciona de stripe el método de cobro predeterminado
      $retrieve = $this->stripeClient->accounts->allExternalAccounts(
        $charging->user->stripe_account_id,
        [
          'object' => 'bank_account',
          'default_for_currency' => true,
        ]
      );

      // verificar cual esta predeterminado
      dd(
        $retrieve->data,
      );


      $deleted =  $charging->delete();

      // actualizar el predeterminado
      $this->setAllMethodsAsNotDefault($charging->user_id);
      $this->setLastMethodAsDefault($charging->user_id);
      return $deleted;
    }

    return false;
  }

  /**
   * Actualizar método de cobro
   *
   * @param Request $request
   * @return bool
   */
  public function updateMethod(Request $request): bool
  {
    $charging = $this->charging->find($request->id);
    $user = $charging->user;

    // conectar con stripe
    $resp = $this->stripeClient->accounts->updateExternalAccount(
      $user->stripe_account_id,
      $charging->stripe_bank_account_id,
      [
        'external_account' => [
          'object' => 'bank_account',
          'country' => 'ES',
          'currency' => 'eur',
          'account_holder_name' => $user->name,
          'account_holder_type' => 'individual',
          'account_number' => $request->account_number,
        ]
      ]
    );

    if ($resp->object == 'bank_account') {
      return $charging->update([
        'account_number' => $request->account_number,
        'account_holder_name' => $resp->account_holder_name,
      ]);
    }

    return false;
  }
}
