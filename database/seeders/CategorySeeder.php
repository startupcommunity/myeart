<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
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
        // Category::truncate();
        // SubCategory::truncate();
        if (Category::count() == 0) {
            Category::insert([
                [
                    'name' => 'Literatura',
                    'qualified' => 'Literario',
                ], // 1
                [
                    'name' => 'Pintura',
                    'qualified' => 'Pintor',
                ], // 2
                [
                    'name' => 'Escultura',
                    'qualified' => 'Escultor',
                ], // 3
                [
                    'name' => 'Dibujo',
                    'qualified' => 'Dibujante',
                ], // 4
                [
                    'name' => 'Fotografía',
                    'qualified' => 'Fotógrafo',
                ], // 5
                [
                    'name' => 'Artesanía y Manualidades',
                    'qualified' => 'Artesano',
                ], // 6
                [
                    'name' => 'Libros',
                    'qualified' => 'Escritor',
                ], // 7
            ]);

            // sub categorías - 2do nivel
            SubCategory::insert([

                // Literatura
                ['name' => 'Temática', 'category_id' => 1],     // 1
                ['name' => 'Idioma', 'category_id' => 1],       // 2
                ['name' => 'Material', 'category_id' => 1],     // 3

                // Pintura
                ['name' => 'Temática', 'category_id' => 2],     // 4
                ['name' => 'Estilo', 'category_id' => 2],       // 5
                ['name' => 'Técnica', 'category_id' => 2],      // 6

                // Escultura
                ['name' => 'Temática', 'category_id' => 3],     // 7
                ['name' => 'Estilo', 'category_id' => 3],       // 8
                ['name' => 'Material', 'category_id' => 3],     // 9

                // Dibujo
                ['name' => 'Temática', 'category_id' => 4],
                ['name' => 'Estilo', 'category_id' => 4],
                ['name' => 'Técnica', 'category_id' => 4],

                // Fotografía
                ['name' => 'Temática', 'category_id' => 5],
                ['name' => 'Estilo', 'category_id' => 5],
                ['name' => 'Técnica', 'category_id' => 5],

                // Artesanía
                ['name' => 'Temática', 'category_id' => 6],
                ['name' => 'Material', 'category_id' => 6],

                // Libros
                ['name' => 'Temática', 'category_id' => 7],
                ['name' => 'Idioma', 'category_id' => 7],
                ['name' => 'Material', 'category_id' => 7],
            ]);
        }
    }
}
