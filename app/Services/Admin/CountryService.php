<?php

namespace App\Services\Admin;

use App\Repositories\CountryRepository;
use App\Services\BaseService;
class CountryService extends BaseService
{
    protected string $repositoryName = CountryRepository::class;

    public function get($search = null)
    {
        $search = trim($search);

        return $this->repository
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();
    }
}
