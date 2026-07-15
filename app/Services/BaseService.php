<?php

namespace App\Services;

use App\Repositories\Repository;
abstract class BaseService
{
    protected Repository $repository;
    public array $viewData = [];

    public function __construct()
    {
        if (property_exists($this, 'repositoryName')) {
            $this->repository = resolve($this->repositoryName);
        }
    }

    public function __get($property)
    {
        return $this->viewData[$property] ?? null;
    }

    public function __set(string $property, $data): void
    {
        $this->viewData[$property] = $data;
    }

    public function __isset($property): bool
    {
        return isset($this->viewData[$property]);
    }

    public function __call($method, $parameters)
    {
        return $this->repository->$method(...$parameters);
    }
}
