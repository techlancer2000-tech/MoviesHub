<?php

namespace App\Models;

use App\Enums\Boolean;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class State extends Model
{
    protected $fillable = [
        'country_id',
        'flag'
    ];

    protected $casts = [
        'flag' => Boolean::class,
    ];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

}
