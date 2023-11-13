<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // ------------
        // seeders
        // ------------
        $this->call([
            UserSeeder::class,
            CountriesSeeder::class,
            CategorySeeder::class,
            SubSubCategorySeeder::class,
            //QualifiedCategorySeeder::class,
            //ArtworkSeeder::class,
            //ArtistArtworkSeeder::class,
        ]);
    }
}
