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

                // Europa
                [
                    'abbr' => 'de',
                    'nombre' => 'Alemania',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'at',
                    'nombre' => 'Austria',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'be',
                    'nombre' => 'Bélgica',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'bg',
                    'nombre' => 'Bulgaria',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'cy',
                    'nombre' => 'Chipre',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'hr',
                    'nombre' => 'Croacia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'dk',
                    'nombre' => 'Dinamarca',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'es',
                    'nombre' => 'España',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'sk',
                    'nombre' => 'Eslovaquia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'si',
                    'nombre' => 'Eslovenia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ee',
                    'nombre' => 'Estonia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'fi',
                    'nombre' => 'Finlandia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'fr',
                    'nombre' => 'Francia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'gr',
                    'nombre' => 'Grecia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'hu',
                    'nombre' => 'Hungría',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'it',
                    'nombre' => 'Italia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ie',
                    'nombre' => 'Irlanda',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'lv',
                    'nombre' => 'Letonia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'lt',
                    'nombre' => 'Lituania',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'lu',
                    'nombre' => 'Luxemburgo',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'mt',
                    'nombre' => 'Malta',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'nl',
                    'nombre' => 'Países Bajo',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'pl',
                    'nombre' => 'Polonia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'pt',
                    'nombre' => 'Portugal',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'cz',
                    'nombre' => 'República Checa',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ro',
                    'nombre' => 'Rumanía',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'se',
                    'nombre' => 'Suecia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],

                // America
                [
                    'abbr' => 'ag',
                    'nombre' => 'Antigua y Barbuda',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ar',
                    'nombre' => 'Argentina',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'bs',
                    'nombre' => 'Bahamas',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'bb',
                    'nombre' => 'Barbados',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'bz',
                    'nombre' => 'Belice',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'bo',
                    'nombre' => 'Bolivia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'br',
                    'nombre' => 'Brasil',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ca',
                    'nombre' => 'Canadá',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'cl',
                    'nombre' => 'Chile',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'co',
                    'nombre' => 'Colombia',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'cr',
                    'nombre' => 'Costa Rica',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'cu',
                    'nombre' => 'Cuba',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'dm',
                    'nombre' => 'Dominica',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ec',
                    'nombre' => 'Ecuador',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'sv',
                    'nombre' => 'El Salvador',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'us',
                    'nombre' => 'Estados Unidos',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'gd',
                    'nombre' => 'Granada',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'gt',
                    'nombre' => 'Guatemala',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'gy',
                    'nombre' => 'Guyana',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ht',
                    'nombre' => 'Haití',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'hn',
                    'nombre' => 'Honduras',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'jm',
                    'nombre' => 'Jamaica',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'mx',
                    'nombre' => 'México',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'ni',
                    'nombre' => 'Nicaragua',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'pa',
                    'nombre' => 'Panamá',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'py',
                    'nombre' => 'Paraguay',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'pe',
                    'nombre' => 'Perú',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'do',
                    'nombre' => 'República Dominicana',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'kn',
                    'nombre' => 'San Cristóbal y Nieves',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'vc',
                    'nombre' => 'San Vicente y las Granadinas',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'lc',
                    'nombre' => 'Santa Lucía',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'sr',
                    'nombre' => 'Surinam',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s')
                ],
                [
                    'abbr' => 'tt',
                    'nombre' => 'Trinidad y Tobago',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s'),
                ],
                [
                    'abbr' => 'uy',
                    'nombre' => 'Uruguay',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s'),
                ],
                [
                    'abbr' => 've',
                    'nombre' => 'Venezuela',
                    'activo' => '1',
                    'created_at' => date('Y-m-d H:m:s'),
                    'updated_at' => date('Y-m-d H:m:s'),
                ]
            ]);
        }
        Schema::disableForeignKeyConstraints();
    }
}
