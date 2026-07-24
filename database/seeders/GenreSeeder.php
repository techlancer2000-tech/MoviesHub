<?php

namespace Database\Seeders;

use App\Enums\Boolean;
use App\Models\Genre;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            [
                'name' => 'Animation',
                'description' => 'Animated movies featuring digitally or traditionally created characters and worlds.',
            ],
            [
                'name' => 'Science Fiction',
                'description' => 'Movies based on futuristic technology, space, science, and speculative concepts.',
            ],
            [
                'name' => 'Thriller',
                'description' => 'Suspenseful movies designed to keep audiences engaged with tension and excitement.',
            ],
            [
                'name' => 'Romance',
                'description' => 'Movies focused on love, relationships, and emotional connections.',
            ],
            [
                'name' => 'Horror',
                'description' => 'Movies created to frighten, scare, or create feelings of suspense and fear.',
            ],
            [
                'name' => 'Drama',
                'description' => 'Movies focused on realistic characters, emotions, and serious storytelling.',
            ],
            [
                'name' => 'Comedy',
                'description' => 'Movies intended to entertain and make audiences laugh.',
            ],
            [
                'name' => 'Action',
                'description' => 'Movies featuring fights, adventures, explosions, and high-energy sequences.',
            ],
        ];

        foreach ($genres as $genre) {
            Genre::firstOrCreate(
                [
                    'slug' => Str::slug($genre['name']),
                ],
                [
                    'name' => $genre['name'],
                    'slug' => Str::slug($genre['name']),
                    'description' => $genre['description'],
                    'is_active' => Boolean::True,
                ]
            );
        }
    }
}
