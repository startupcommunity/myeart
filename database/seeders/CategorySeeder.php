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
        Category::truncate();
        SubCategory::truncate();
        if (Category::count() == 0) {
            Category::insert([
                // [
                //     'name' => 'Literatura',
                //     'qualified' => 'Literario',
                // ], // 1
                [
                    'id' => 2,
                    'name' => 'Pintura',
                    'qualified' => 'Pintor',
                ], // 2
                [
                    'id' => 3,
                    'name' => 'Escultura',
                    'qualified' => 'Escultor',
                ], // 3
                [
                    'id' => 4,
                    'name' => 'Dibujo',
                    'qualified' => 'Dibujante',
                ], // 4
                [
                    'id' => 5,
                    'name' => 'Fotografía',
                    'qualified' => 'Fotógrafo',
                ], // 5
                [
                    'id' => 6,
                    'name' => 'Artesanía y Manualidades',
                    'qualified' => 'Artesano',
                ], // 6
                [
                    'id' => 7,
                    'name' => 'Libros',
                    'qualified' => 'Escritor',
                ], // 7
                [
                    'id' => 8,
                    'name' => 'Literatura',
                    'qualified' => 'Libro',
                ], // 8
                [
                    'id' => 9,
                    'name' => 'Antigüedades',
                    'qualified' => 'Antigüo',
                ], // 9
                [
                    'id' => 10,
                    'name' => 'Coleccionismo',
                    'qualified' => 'Colección',
                ], // 10
                [
                    'id' => 11,
                    'name' => 'OtrasColeccionismo',
                    'qualified' => 'Otro',
                ], // 11
            ]);

            // sub categorías - 2do nivel
            SubCategory::insert([

                // Literatura
                // ['name' => 'Temática', 'category_id' => 1],     // 1
                // ['name' => 'Idioma', 'category_id' => 1],       // 2
                // ['name' => 'Material', 'category_id' => 1],     // 3

                // Pintura
                ['id' => '4', 'name' => 'Temática', 'category_id' => 2],     // 4
                ['id' => '5', 'name' => 'Estilo', 'category_id' => 2],       // 5
                ['id' => '6', 'name' => 'Técnica', 'category_id' => 2],      // 6

                // Escultura
                ['id' => '7', 'name' => 'Temática', 'category_id' => 3],     // 7
                ['id' => '8', 'name' => 'Estilo', 'category_id' => 3],       // 8
                ['id' => '9', 'name' => 'Material', 'category_id' => 3],     // 9

                // Dibujo
                ['id' => '10', 'name' => 'Temática', 'category_id' => 4],
                ['id' => '11', 'name' => 'Estilo', 'category_id' => 4],
                ['id' => '12', 'name' => 'Técnica', 'category_id' => 4],

                // Fotografía
                ['id' => '13', 'name' => 'Temática', 'category_id' => 5],
                ['id' => '14', 'name' => 'Estilo', 'category_id' => 5],
                ['id' => '15', 'name' => 'Técnica', 'category_id' => 5],

                // Artesanía
                ['id' => '16', 'name' => 'Temática', 'category_id' => 6],
                ['id' => '17', 'name' => 'Material', 'category_id' => 6],

                // Libros
                ['id' => '18', 'name' => 'Temática', 'category_id' => 7],
                ['id' => '19', 'name' => 'Idioma', 'category_id' => 7],
                ['id' => '20', 'name' => 'Material', 'category_id' => 7],
            ]);
        }
    }
}
