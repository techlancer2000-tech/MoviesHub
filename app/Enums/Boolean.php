<?php

namespace App\Enums;

use App\Traits\Label;

enum Boolean: int
{
    use Label;

    case True = 1;
    case False = 0;

    protected function getLabels(): array
    {
        return [
            self::True->value => 'True',
            self::False->value => 'False',
        ];
    }
}
