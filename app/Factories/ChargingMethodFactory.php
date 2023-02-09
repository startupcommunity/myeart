<?php

namespace App\Factories;

use App\Models\ChargingMethod;
use App\Models\User;
use App\Utils\Payment\Stripe;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class ChargingMethodFactory
{
  private $stripeClient;

  public function __construct(
    private ChargingMethod $charging,
  ) {
    $this->stripeClient = new Stripe();
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

    $data = [
      'account_id' => $user->stripe_account_id,
      'account_holder_name' => $user->name,
      'account_number' => $request->account_number,
    ];

    // conecta con stripe
    // colocar el método de cobro como predeterminado en stripe
    $resp = $this->stripeClient->createBankAccount($data);

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
    $this->charging->where('user_id', $user_id)->get()->each(function ($item) {
      $item->update(['default' => 0]);
    });
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
    $this->charging
      ->where('user_id', $user_id)
      ->latest()
      ->first()
      ->update(['default' => 1]);
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
      $resp = $this->stripeClient->setDefaultBank(
        $charging->user->stripe_account_id,
        $charging->stripe_bank_account_id,
      );

      // si se actualizo el método de cobro en stripe
      if ($resp) {
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
   * @return array
   */
  public function deleteMethod(int $id): array
  {
    // obtiene la cuenta de banco
    $charging = $this->charging->find($id);
    $user = $charging->user;

    // verificar si el usuario tiene obras publicadas
    if ($user->hasPublishedArtworks() && $user->hasOnlyOneChargingMethod()) {
      return [
        'status' => 201,
        'msj' => 'No puede eliminar el método de cobro porque tiene obras publicadas, debe tener al menos un método de cobro registrado',
      ];
    }

    // obtiene la cuenta de banco de stripe
    $bankAccount = $this->stripeClient->getBankAccount(
      $charging->user->stripe_account_id,
      $charging->stripe_bank_account_id,
    );

    // si el método de cobro es predeterminado
    if ($bankAccount->default_for_currency) {

      // seleccionar los métodos de cobro del usuario de stripe
      $getBanks = $this->stripeClient->getBanks($charging->user->stripe_account_id);

      // si hay más de un método de cobro
      if (count($getBanks['data']) > 1) {
        // filtrar los métodos de cobro que no sean predeterminados
        $filterBanks = array_filter($getBanks['data'], fn ($bank) => !$bank['default_for_currency']);

        // seleccionar el primero de la lista
        $bankID = array_values($filterBanks)[0]['id'];

        // actualizar el default_for_currency en stripe a true
        $this->stripeClient->setDefaultBank(
          $charging->user->stripe_account_id,
          $bankID,
          true,
        );

        // eliminar el banco anterior de stripe
        $deleteBank = $this->stripeClient->deleteBank(
          $charging->user->stripe_account_id,
          $charging->stripe_bank_account_id,
        );

        if ($deleteBank) {
          // actualizar en la BD el banco predeterminado
          $this->setAllMethodsAsNotDefault($charging->user_id);
          $activeCharging = $this->charging->where('stripe_bank_account_id', $bankID)->first();
          $updated = $activeCharging ? $activeCharging->update(['default' => 1]) : false;

          // eliminar el método de cobro
          $deleted = $updated ? $charging->delete() : false;

          return $deleted ?
            ['msj' => 'Método de cobro eliminado', 'status' => 200] :
            ['msj' => 'No se pudo eliminar el método de cobro', 'status' => 201];
        }

        // no se puedo eliminar el método de cobro
        return ['msj' => 'No se pudo eliminar el método de cobro', 'status' => 201];
      }

      // en caso de solo haber un método de cobro
      // no se puede eliminar
      return ['msj' => 'Debe tener un método de cobro registrado', 'status' => 201];
    }

    // si el método de cobro no es predeterminado
    // eliminar el método de cobro de stripe
    $deleteBank = $this->stripeClient->deleteBank(
      $charging->user->stripe_account_id,
      $charging->stripe_bank_account_id,
    );

    // eliminar el método de cobro de la BD
    $deleteCharging = $deleteBank ? $charging->delete() : false;

    return $deleteCharging ?
      ['msj' => 'Método de cobro eliminado', 'status' => 200] :
      ['msj' => 'No se pudo eliminar el método de cobro', 'status' => 201];
  }

  /**
   * Actualizar método de cobro
   *
   * @param Request $request    Request
   * @param int $id             Id del método de cobro
   * @return bool
   */
  public function updateMethod(Request $request, int $id): bool
  {
    $charging = $this->charging->find($id);
    $user = $charging->user;

    // actualizar el método de cobro en stripe
    $resp = $this->stripeClient->updateBank(
      $user->stripe_account_id,
      $charging->stripe_bank_account_id,
      [
        'account_holder_name' => $request->account_holder_name,
        'account_number' => $request->account_number,
      ]
    );

    // si se actualizo el método de cobro en stripe
    if ($resp->id) {
      // actualizar el método de cobro en la base de datos
      return $charging->update([
        'account_holder_name' => $request->account_holder_name,
        'account_number' => $request->account_number,
      ]);
    }

    return false;
  }
}
