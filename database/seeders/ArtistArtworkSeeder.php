<?php

namespace Database\Seeders;

use App\Models\Artwork;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArtistArtworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // no esta en uso
        // if (Artwork::count() == 0) {
        // Artwork::insert([
        //     [
        //         // 'id' => 900,
        //         'user_id' => 2,
        //         'title' => 'Obra Seeder 1',
        //         'description' => 'Labore quis irure ipsum ullamco. Non sit est ut laboris excepteur elit tempor Lorem consectetur elit enim. Reprehenderit esse consectetur cillum ex aliqua qui voluptate velit anim nostrud excepteur nostrud excepteur. Laborum exercitation culpa pariatur nulla dolor consequat sint nulla.',
        //         'date_created' => date('Y-m-d'),
        //         'location' => 'Madrid',
        //         'shipping' => 'Gratis',
        //         'price' => 450,
        //         'width' => 20,
        //         'large' => 30,
        //         'weight' => 2,
        //         'state' => 1,
        //         'slug' => Str::slug('Obra Seeder 1'),
        //         'created_at' => date('Y-m-d h:i:s'),
        //         'updated_at' => date('Y-m-d h:i:s'),
        //     ],
        //     [
        //         // 'id' => 901,
        //         'user_id' => 2,
        //         'title' => 'Obra Seeder 2',
        //         'description' => 'Labore quis irure ipsum ullamco. Non sit est ut laboris excepteur elit tempor Lorem consectetur elit enim. Reprehenderit esse consectetur cillum ex aliqua qui voluptate velit anim nostrud excepteur nostrud excepteur. Laborum exercitation culpa pariatur nulla dolor consequat sint nulla.',
        //         'date_created' => date('Y-m-d'),
        //         'location' => 'Sevilla',
        //         'shipping' => 'Gratis',
        //         'price' => 1200,
        //         'width' => 20,
        //         'large' => 30,
        //         'weight' => 2,
        //         'state' => 1,
        //         'slug' => Str::slug('Obra Seeder 2'),
        //         'created_at' => date('Y-m-d h:i:s'),
        //         'updated_at' => date('Y-m-d h:i:s'),
        //     ],
        //     [
        //         // 'id' => 902,
        //         'user_id' => 2,
        //         'title' => 'Obra Seeder 3',
        //         'description' => 'Labore quis irure ipsum ullamco. Non sit est ut laboris excepteur elit tempor Lorem consectetur elit enim. Reprehenderit esse consectetur cillum ex aliqua qui voluptate velit anim nostrud excepteur nostrud excepteur. Laborum exercitation culpa pariatur nulla dolor consequat sint nulla.',
        //         'date_created' => date('Y-m-d'),
        //         'location' => 'Barcelona',
        //         'shipping' => 'Gratis',
        //         'price' => 2350,
        //         'width' => 20,
        //         'large' => 30,
        //         'weight' => 2,
        //         'state' => 1,
        //         'slug' => Str::slug('Obra Seeder 3'),
        //         'created_at' => date('Y-m-d h:i:s'),
        //         'updated_at' => date('Y-m-d h:i:s'),
        //     ],
        // ]);
        // }

        $art_1 = Artwork::create([
            'user_id' => 2,
            'title' => 'Obra Prueba-Seeder 1',
            'description' => 'Labore quis irure ipsum ullamco. Non sit est ut laboris excepteur elit tempor Lorem consectetur elit enim. Reprehenderit esse consectetur cillum ex aliqua qui voluptate velit anim nostrud excepteur nostrud excepteur. Laborum exercitation culpa pariatur nulla dolor consequat sint nulla.',
            'date_created' => date('Y-m-d'),
            'location' => 'Madrid',
            'shipping' => 'Gratis',
            'price' => 450,
            'width' => 20,
            'large' => 30,
            'weight' => 2,
            'state' => 1,
            'slug' => Str::slug('Obra Prueba-Seeder 1'),
            'created_at' => date('Y-m-d h:i:s'),
            'updated_at' => date('Y-m-d h:i:s'),
        ]);

        $art_2 = Artwork::create([
            'user_id' => 2,
            'title' => 'Obra Prueba-Seeder 2',
            'description' => 'Labore quis irure ipsum ullamco. Non sit est ut laboris excepteur elit tempor Lorem consectetur elit enim. Reprehenderit esse consectetur cillum ex aliqua qui voluptate velit anim nostrud excepteur nostrud excepteur. Laborum exercitation culpa pariatur nulla dolor consequat sint nulla.',
            'date_created' => date('Y-m-d'),
            'location' => 'Madrid',
            'shipping' => 'Gratis',
            'price' => 450,
            'width' => 20,
            'large' => 30,
            'weight' => 2,
            'state' => 1,
            'slug' => Str::slug('Obra Prueba-Seeder 2'),
            'created_at' => date('Y-m-d h:i:s'),
            'updated_at' => date('Y-m-d h:i:s'),
        ]);

        $art_3 = Artwork::create([
            'user_id' => 2,
            'title' => 'Obra Prueba-Seeder 3',
            'description' => 'Labore quis irure ipsum ullamco. Non sit est ut laboris excepteur elit tempor Lorem consectetur elit enim. Reprehenderit esse consectetur cillum ex aliqua qui voluptate velit anim nostrud excepteur nostrud excepteur. Laborum exercitation culpa pariatur nulla dolor consequat sint nulla.',
            'date_created' => date('Y-m-d'),
            'location' => 'Madrid',
            'shipping' => 'Gratis',
            'price' => 450,
            'width' => 20,
            'large' => 30,
            'weight' => 2,
            'state' => 1,
            'slug' => Str::slug('Obra Prueba-Seeder 3'),
            'created_at' => date('Y-m-d h:i:s'),
            'updated_at' => date('Y-m-d h:i:s'),
        ]);

        $art_1->labels()->attach([1, 2], [
            'category_id' => 1,
            'sub_category_id' => 1
        ]);

        $art_2->labels()->attach([50, 51], [
            'category_id' => 2,
            'sub_category_id' => 4
        ]);

        $art_3->labels()->attach([132, 133], [
            'category_id' => 3,
            'sub_category_id' => 7
        ]);
    }
}
