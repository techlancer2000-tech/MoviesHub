<?php

namespace App\Services\Admin;

use App\Repositories\StateRepository;
use App\Services\BaseService;
class StateService extends BaseService
{
    protected string $repositoryName = StateRepository::class;

    public function get($search = null)
    {
        $search = trim($search);

        return $this->repository
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->with('country')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();
    }
}
