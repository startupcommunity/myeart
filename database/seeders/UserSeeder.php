<?php

namespace Database\Seeders;

use App\Models\User;
use App\Utils\Payment\Stripe;
use Illuminate\Database\Seeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (User::count()) {
            return;
        }

        $data = [
            [
                'name' => 'Kristian Salemi',
                'username' => 'kristian',
                'email' => 'kristian@gmail.com',
                'password' => bcrypt('123456'),
            ],
            [
                'name' => 'Miguel Sillero',
                'username' => 'miguel',
                'email' => 'miguel@gmail.com',
                'password' => bcrypt('123456'),
            ],
            [
                'name' => 'Luis Annunziato',
                'username' => 'luis',
                'email' => 'luis@gmail.com',
                'password' => bcrypt('123456'),
            ],
            [
                'name' => 'Andrés López',
                'username' => 'andres',
                'email' => 'andres@gmail.com',
                'password' => bcrypt('123456'),
            ],
        ];

        DB::transaction(function () use ($data) {

            foreach ($data as $user) {
                // crear un objeto request
                // agregar la data
                $request = new Request();
                $request->merge($user);

                // crear cuenta de stripe
                $stripe = new Stripe();
                $arr = $stripe->setDefaultAccountData($request);
                $resp = $stripe->createAccount($arr);

                // si se genero la cuenta de stripe
                if ($resp->id) {

                    // add stripe_account_id to user
                    $user['stripe_account_id'] = $resp->id;

                    // crear usuario
                    User::create($user);
                } else {
                    throw new Exception('Error al crear la cuenta de stripe');
                }
            }
        });
    }
}
