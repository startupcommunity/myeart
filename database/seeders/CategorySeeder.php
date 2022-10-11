<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Category::count() == 0) {
            Category::insert([
                ['name' => 'Literatura'],
                ['name' => 'Pintura'],
                ['name' => 'Escultura'],
                ['name' => 'Dibujo'],
                ['name' => 'Fotografía'],
                ['name' => 'Artesanía y Manualidades'],
                ['name' => 'Audios'],
                ['name' => 'Arte Digital'],
                ['name' => 'Otros'],
            ]);
        }
    }
}
