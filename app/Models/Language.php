<?php

namespace App\Models;

use App\Enums\Boolean;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Language extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'native_name',
        'code',
        'locale',
        'flag',
        'is_active',
    ];

    protected $casts = [
        'is_active' => Boolean::class,
    ];
}
