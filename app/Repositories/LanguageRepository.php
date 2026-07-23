<?php

namespace App\Repositories;

use App\Models\Language;

class LanguageRepository extends BaseRepository
{
    /**
     * @var string
     */
    public string $modelName = Language::class;
}
