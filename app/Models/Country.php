<?php

namespace App\Models;

use App\Enums\Boolean;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'flag'
    ];

    protected $casts = [
        'flag' => Boolean::class,
    ];
}
