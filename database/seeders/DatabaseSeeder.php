<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //\App\Models\User::factory(1)->create();

        DB::table('artistic_activitys')->insert([
            'nombre' => 'LITERATURA',
            'icon' => 'notebook-outline',
            'descripcion' => 'LITERATURA',
            'activo' => '1',
            'created_at' => date('Y-m-d H:m:s'),
           	'updated_at' => date('Y-m-d H:m:s')
        ]);

        DB::table('artistic_activitys')->insert([
            'nombre' => 'PINTURA',
            'icon' => 'palette',
            'descripcion' => 'PINTURA',
            'activo' => '1',
            'created_at' => date('Y-m-d H:m:s'),
           	'updated_at' => date('Y-m-d H:m:s')
        ]);

        DB::table('paises')->insert([
            'nombre' => 'VENEZUELA',
            'activo' => '1',
            'created_at' => date('Y-m-d H:m:s'),
           	'updated_at' => date('Y-m-d H:m:s')
        ]);

        DB::table('paises')->insert([
            'nombre' => 'EEUU',
            'activo' => '1',
            'created_at' => date('Y-m-d H:m:s'),
           	'updated_at' => date('Y-m-d H:m:s')
        ]);
    }
}
