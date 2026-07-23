<?php

namespace App\Traits;

trait Label
{
    public function label(): string
    {
        return $this->getLabels()[$this->value] ?? $this->name;
    }

    protected function getLabels(): array
    {
        return [];
    }
}
