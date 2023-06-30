<?php

namespace App\Http\Controllers\Auth;

use App\Factories\UserFactory;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Validator;

class LoginController extends Controller
{
    public function __construct(
        private UserFactory $userFactory
    ) {
    }

    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules());

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // verificar si el usuario ya verifico el email
        $user = User::where('email', $request->email)->first();
        if ($user && !$user->email_verified_at) {

            // crear token de verificación
            $this->userFactory->createTokenConfirmRegister($request->email);

            // enviar email de verificación
            $this->userFactory->sendEmailConfirmRegister($request->email);

            return response()->json([
                'message' => 'Email no verificado'
            ], 401);
        }

        $request = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '*',
        ]);

        return app()->handle($request);
    }

    /**
     * Cerrar session y eliminar token
     *
     */
    public function logout(): JsonResponse
    {
        $accessToken = auth()->user()->token();

        DB::table('oauth_access_tokens')->where('id', $accessToken->id)->delete();
        DB::table('oauth_refresh_tokens')->where('access_token_id', $accessToken->id)->delete();

        return response()->json(['status' => 200]);
    }

    /**
     * Get the login validation rules.
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ];
    }

    /**
     * Get the login validation error messages.
     *
     * @return array
     */
    protected function validationErrorMessages()
    {
        return [];
    }
}
