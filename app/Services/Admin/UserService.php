<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\BaseService;
use Illuminate\Support\Collection;

class UserService extends BaseService
{
    protected string $repositoryName = UserRepository::class;

    public function get(): Collection
    {
        return $this->repository->where('role', '!=', User::Admin)->latest()->get();
    }
}
