<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Utils\Payment\Stripe;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Exception;

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

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // transaction
        $db = DB::transaction(function () use ($request) {
            // crear cuenta de stripe
            $stripe = new Stripe();
            $arr = $stripe->setDefaultAccountData($request);
            $resp = $stripe->createAccount($arr);

            // si se genero la cuenta de stripe
            if ($resp->id) {
                // crear usuario
                User::create([
                    'name' => $request->name,
                    'username' => $request->username,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                    'stripe_account_id' => $resp->id,
                ]);
                return true;
            } else {
                throw new Exception('Error al crear la cuenta de stripe');
            }
        });

        if ($db) {
            return (new LoginController())->login($request);
        } else {
            return response()->json([
                'message' => 'Error al registrar el usuario'
            ], 500);
        }
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
