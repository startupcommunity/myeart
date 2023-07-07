<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Factories\UserFactory;
use App\Utils\Payment\Stripe;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;

class RegisterController extends Controller
{
    public function __construct(
        private UserFactory $userFactory
    ) {
    }

    /**
     * Register the given user.
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), $this->rules());

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // transaction
        $db = DB::transaction(function () use ($request) {
            // crear cuenta de stripe
            $resp = $this->createStripeAccount($request);

            // si se genero la cuenta de stripe
            if ($resp->id) {

                // stripe_account_id
                $request->merge([
                    'stripe_account_id' => $resp->id,
                    'password' => bcrypt($request->password)
                ]);

                // crear usuario
                $this->createUser($request->all());

                // crear token de verificación
                $this->userFactory->createTokenConfirmRegister($request->email);

                return true;
            }

            return false;
        });

        if (!$db) {
            // return (new LoginController())->login($request);
            return response()->json([
                'message' => 'Error al registrar el usuario'
            ], 500);
        }

        // enviar email de verificación de registro
        $this->userFactory->sendEmailConfirmRegister($request->email);

        return response()->json([
            'message' => 'Usuario registrado correctamente'
        ], 200);
    }

    /**
     * Get the user registration validation rules.
     */
    protected function rules(): array
    {
        return [
            'name' => 'required|string|max:80',
            'username' => 'required|string|max:50|unique:users',
            'pais_id' => 'required|integer|exists:paises,id',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ];
    }

    /**
     * Get the user registration validation error messages
     */
    // protected function validationErrorMessages(): array
    // {
    //     return [];
    // }

    /**
     * create user in BD
     */
    public function createUser(array $data): User
    {
        // user
        $user = User::create($data);
        // add pais
        $user->profile()->create(['pais_id' => $data['pais_id']]);

        return $user;
    }

    /**
     * Create user stripe account
     */
    public function createStripeAccount(Request $request): object
    {
        $stripe = new Stripe();
        $arr = $stripe->setDefaultAccountData($request);
        return $stripe->createAccount($arr);
    }
}
