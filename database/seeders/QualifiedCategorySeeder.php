<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class QualifiedCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::truncate();
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
    }
}
