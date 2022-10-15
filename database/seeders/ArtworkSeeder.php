<?php

namespace Database\Seeders;

use App\Enums\ArtworkStateEnum;
use App\Models\Artwork;
use App\Models\ArtworkStyle;
use App\Models\ArtworkTechnique;
use App\Models\Gallery;
use Illuminate\Database\Seeder;

class ArtworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Artwork::count() > 0) {
            return false;
        }

        // --------
        // obras
        // --------
        Artwork::insert([
            [
                'title' => 'Obra de arte 1',
                'description'   => 'Id pariatur irure proident aute labore incididunt voluptate cillum dolor fugiat voluptate ea.',
                'date_created'  => date('Y-m-d'),
                'dimension' => '80 x 120 cm',
                'category_id'   => 1,
                'location'  => 'Santiago de Chile',
                'shipping'  => 'Si',
                'price' => 5000,
                'state' => ArtworkStateEnum::PUBLISHED,
                'user_id' => 1,
            ],
            [
                'title' => 'Obra de arte 2',
                'description'   => 'Id pariatur irure proident aute labore incididunt voluptate cillum dolor fugiat voluptate ea.',
                'date_created'  => date('Y-m-d'),
                'dimension' => '80 x 120 cm',
                'category_id'   => 2,
                'location'  => 'Buenos Aires',
                'shipping'  => 'Si',
                'price' => 8000,
                'state' => ArtworkStateEnum::PUBLISHED,
                'user_id' => 1,
            ],
            [
                'title' => 'Obra de arte 3',
                'description'   => 'Id pariatur irure proident aute labore incididunt voluptate cillum dolor fugiat voluptate ea.',
                'date_created'  => date('Y-m-d'),
                'dimension' => '80 x 120 cm',
                'category_id'   => 3,
                'location'  => 'Quito',
                'shipping'  => 'Si',
                'price' => 12000,
                'state' => ArtworkStateEnum::SOLD,
                'user_id' => 1,
            ],
        ]);

        // ---------
        // galeria
        // ---------
        Gallery::insert([
            [
                'artwork_id' => 1,
                'picture' => 'https://cdn.pixabay.com/photo/2022/08/22/10/01/tree-7403295_960_720.jpg',
                'front_page' => 1,
            ],
            [
                'artwork_id' => 2,
                'picture' => 'https://cdn.pixabay.com/photo/2017/07/15/15/50/fantasy-2506830_960_720.jpg',
                'front_page' => 1,
            ],
            [
                'artwork_id' => 3,
                'picture' => 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_960_720.jpg',
                'front_page' => 1,
            ],
        ]);

        // ------------
        // estilos
        // -------------
        ArtworkStyle::insert([
            [
                'artwork_id' => 1,
                'style_id' => 2,
            ],
            [
                'artwork_id' => 1,
                'style_id' => 2,
            ],
            [
                'artwork_id' => 1,
                'style_id' => 3,
            ],
            [
                'artwork_id' => 2,
                'style_id' => 3,
            ],
            [
                'artwork_id' => 2,
                'style_id' => 4,
            ],
            [
                'artwork_id' => 2,
                'style_id' => 5,
            ],
            [
                'artwork_id' => 3,
                'style_id' => 1,
            ],
            [
                'artwork_id' => 3,
                'style_id' => 3,
            ],
        ]);

        // ----------
        // técnicas
        // ----------
        ArtworkTechnique::insert([
            [
                'artwork_id' => 1,
                'technique_id' => 1,
            ],
            [
                'artwork_id' => 1,
                'technique_id' => 2,
            ],

            // 2
            [
                'artwork_id' => 2,
                'technique_id' => 3,
            ],
            [
                'artwork_id' => 2,
                'technique_id' => 4,
            ],

            // 3
            [
                'artwork_id' => 3,
                'technique_id' => 1,
            ],
            [
                'artwork_id' => 3,
                'technique_id' => 3,
            ],
        ]);
    }
}
