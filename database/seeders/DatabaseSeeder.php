<?php

namespace Database\Seeders;

use App\Models\Artistic_activitys;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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

        if (Artistic_activitys::count() == 0) {
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
        }

        // ------------
        // seeders
        // ------------
        $this->call([
            CountriesSeeder::class,
            // CategorySeeder::class,
            // SubSubCategorySeeder::class,
            QualifiedCategorySeeder::class,
            // StyleSeeder::class,
            // TechniqueSeeder::class,
            // ArtworkSeeder::class,
            // ArtistArtworkSeeder::class,
        ]);
    }
}
