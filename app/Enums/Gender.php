<?php

namespace App\Enums;

use App\Traits\Label;

enum Gender: int
{
    use Label;

    case Male = 1;
    case Female = 2;
    case Other = 0;

    protected function getLabels(): array
    {
        return [
            self::Male->value => 'Male',
            self::Female->value => 'Female',
            self::Other->value => 'Other',
        ];
    }
}
