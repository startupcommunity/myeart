<?php

namespace App\Utils\Payment;

use Illuminate\Http\Request;
use Stripe\Account;
use Stripe\BankAccount;
use Stripe\PaymentIntent;
use Stripe\StripeClient;
use Stripe\Transfer;

class Stripe
{

  public $stripeClient;

  public function __construct()
  {
    $this->stripeClient = new StripeClient(env('STRIPE_SECRET'));
  }


  /**
   * Devuelve el balance de la cuenta
   *
   * @return array
   */
  public function getBalance(): array
  {
    return $this->stripeClient->balance->retrieve()->toArray();
  }

  /**
   * Obtiene un intento de pago
   *
   * @param string $paymentIntentId
   * @return PaymentIntent
   */
  public function getPaymentIntent($paymentIntentId): PaymentIntent
  {
    return $this->stripeClient->paymentIntents->retrieve($paymentIntentId);
  }

  /**
   * Ejecutar una transferencia
   *
   * @param array $data
   * @return Transfer
   */
  public function createTransfer(array $data): Transfer
  {
    $arr = [
      'amount' => $data['amount'],
      'currency' => 'eur',
      'destination' => $data['destination'],
      'transfer_group' => $data['transfer_group'],
      'source_transaction' => $data['source_transaction'],
    ];

    if ($arr['source_transaction'] === null) {
      unset($arr['source_transaction']);
    }

    return $this->stripeClient->transfers->create($arr);
  }

  /**
   * Crear cuenta de usuario
   *
   * @param array $data
   * @return Account
   */
  public function createAccount(array $data): Account
  {
    return $this->stripeClient->accounts->create($data);
  }

  /**
   * Setear los datos del usuario por default
   *
   * @param Request $request
   * @return array
   */
  public function setDefaultAccountData(Request $request): array
  {
    return [
      'country' => 'ES',
      'type' => 'custom',
      'capabilities' => [
        'card_payments' => ['requested' => true],
        'transfers' => ['requested' => true],
      ],

      // tipo de negocio
      'business_type' => 'individual',
      'business_profile' => [
        'url' => env('APP_URL'),
        'mcc' => '5971',
      ],

      'individual' => [

        // datos personales
        'email' => $request->email,
        'first_name' => $request->name,
        'last_name' => date('dmY'),
        'phone' => '+34 616 97 97 31',

        // fecha de nacimiento
        'dob' => [
          'day' => 1,
          'month' => 1,
          'year' => 1990,
        ],

        // address
        'address' => [
          'city' => 'Madrid',
          'country' => 'ES',
          'line1' => 'Dirección 1',
          'line2' => 'Dirección 2',
          'postal_code' => '28001',
          'state' => 'M',
        ],
      ],

      // agregar cuenta bancaria
      'external_account' => [
        'object' => 'bank_account',
        'country' => 'ES',
        'currency' => 'eur',
        'account_holder_name' => $request->name,
        'account_holder_type' => 'individual',
        'account_number' => 'ES9121000418450200051332',
      ],

      // aprobar los términos de servicio
      'tos_acceptance' => [
        'date' => time(),
        'ip' => $request->ip() ?? '127.0.0.1',
      ],
    ];
  }

  /**
   * Crear una cuenta bancaria
   *
   * @param array $data
   * @return BankAccount
   */
  public function createBankAccount(array $data): BankAccount
  {
    return $this->stripeClient->accounts->createExternalAccount(
      $data['account_id'],
      [
        'external_account' => [
          'object' => 'bank_account',
          'country' => 'ES',
          'currency' => 'eur',
          'account_holder_name' => $data['account_holder_name'],
          'account_holder_type' => 'individual',
          'account_number' => $data['account_number'],
        ],
        'default_for_currency' => true,
      ]
    );
  }

  /**
   * Coloca el banco mo predeterminado
   *
   * @param string $accountId       ID de la cuenta
   * @param string $bankId          ID del banco
   * @param bool $default           Si es el banco por defecto
   * @return bool
   */
  public function setDefaultBank(string $accountId, string $bankId, $default = true): bool
  {
    $this->stripeClient->accounts->updateExternalAccount(
      $accountId,
      $bankId,
      [
        'default_for_currency' => $default,
      ]
    );

    return true;
  }

  /**
   * Obtiene la cuenta de banco indicada
   *
   * @param string $accountId
   * @param string $bankId
   * @return BankAccount
   */
  public function getBankAccount(string $accountId, string $bankId): BankAccount
  {
    return $this->stripeClient->accounts->retrieveExternalAccount($accountId, $bankId);
  }

  /**
   * Devuelve todos los bancos agregados
   * por el usuario
   *
   * @param string $accountId
   * @return array
   */
  public function getBanks(string $accountId): array
  {
    return $this->stripeClient->accounts->allExternalAccounts($accountId, ['object' => 'bank_account'])->toArray();
  }

  /**
   * Elimina una cuenta de banco
   *
   * @param string $accountId
   * @param string $bankId
   * @return bool
   */
  public function deleteBank(string $accountId, string $bankId): bool
  {
    $resp = $this->stripeClient->accounts->deleteExternalAccount($accountId, $bankId);

    return $resp->deleted;
  }

  /**
   * Actualiza los datos de la cuenta de banco
   *
   * @param string $accountId
   * @param string $bankId
   * @param array $data
   * @return BankAccount
   */
  public function updateBank(string $accountId, string $bankId, array $data): BankAccount
  {
    return $this->stripeClient->accounts->updateExternalAccount(
      $accountId,
      $bankId,
      [
        'external_account' => [
          'object' => 'bank_account',
          'country' => 'ES',
          'currency' => 'eur',
          'account_holder_name' => $data['account_holder_name'],
          'account_holder_type' => 'individual',
          'account_number' => $data['account_number'],
        ],
      ]
    );
  }

  /**
   * Crear intento de pago
   *
   * @param array $data
   * @return PaymentIntent
   */
  public function createPaymentIntent(array $data): PaymentIntent
  {
    return $this->stripeClient->paymentIntents->create($data);
  }
}
