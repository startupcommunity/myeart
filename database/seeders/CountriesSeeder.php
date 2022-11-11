<?php

namespace Database\Seeders;

use App\Models\Paises;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Paises::truncate();
        if (Paises::count() == 0) {
            DB::table('paises')->insert([
                [
                    'nombre' => 'Alemania',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Austria',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Bélgica',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Bulgaria',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Chipre',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Croacia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Dinamarca',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'España',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Eslovaquia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Eslovenia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Estonia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Finlandia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Francia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Grecia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Hungría',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Italia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Irlanda',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Letonia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Lituania',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Luxemburgo',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Malta',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Países Bajo',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Polonia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Portugal',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'República Checa',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Rumanía',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'nombre' => 'Suecia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
            ]);
        }
        Schema::disableForeignKeyConstraints();
    }
}
