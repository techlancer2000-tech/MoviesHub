<?php

namespace App\Repositories;

use App\Models\Genre;

class GenreRepository extends BaseRepository
{
    /**
     * @var string
     */
    public string $modelName = Genre::class;
}
