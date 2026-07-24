<?php

namespace App\Models;

use App\Enums\Boolean;
use App\Enums\Gender;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cast extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'profile_image',
        'biography',
        'date_of_birth',
        'gender',
        'country_id',
        'is_active',
    ];

    protected $casts = [
        'date_of_birth' => 'date:Y-m-d',
        'is_active' => Boolean::class,
        'gender' => Gender::class,
    ];

    protected $appends = ['gender_data'];
    public function getGenderDataAttribute()
    {
        return [
            'value' => $this->gender?->value,
            'name' => $this->gender?->label(),
        ];
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
