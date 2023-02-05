<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use Exception;
use Stripe\StripeClient;

class RegisterController extends Controller
{
    /**
     * Register the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules());

        // return $validator->fails();
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // crear usuario
            $user = new User();
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();

            // crear cuenta de stripe
            $stripe = new StripeClient(env('STRIPE_SECRET'));
            $resp = $stripe->accounts->create(
                [
                    'country' => 'ES',
                    'type' => 'custom',
                    'capabilities' => [
                        'card_payments' => ['requested' => true],
                        'transfers' => ['requested' => true],
                    ],
                    'business_type' => 'individual',
                    'business_profile' => [
                        'url' => env('APP_URL'),
                        'mcc' => '5971',
                    ],
                    'individual' => [
                        'email' => $request->email,
                        'first_name' => $request->name,
                        'last_name' => $request->name,
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
                            'line1' => 'Calle de la calle',
                            'line2' => 'Calle de la calle',
                            'postal_code' => '28001',
                            'state' => 'Madrid',
                        ],
                    ],

                    // agregar cuenta bancaria
                    'external_account' => [
                        'object' => 'bank_account',
                        'country' => 'ES',
                        'currency' => 'eur',
                        'account_holder_name' => 'Usuario de prueba',
                        'account_holder_type' => 'individual',
                        'account_number' => 'ES9121000418450200051332',
                    ],

                    // aprobar los términos de servicio
                    'tos_acceptance' => [
                        'date' => time(),
                        'ip' => $request->ip(),
                    ],
                ]
            );

            // guardar id de cuenta de stripe en la tabla users
            $user->update(['stripe_account_id' => $resp->id]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return (new LoginController())->login($request);
    }

    /**
     * Get the user registration validation rules.
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'name' => 'required|string|max:80',
            'username' => 'required|string|max:50|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ];
    }

    /**
     * Get the user registration validation error messages.
     *
     * @return array
     */
    protected function validationErrorMessages()
    {
        return [];
    }
}
