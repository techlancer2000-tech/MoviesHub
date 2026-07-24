<?php

namespace App\Services\Admin;

use App\Models\Certification;
use App\Repositories\CertificationRepository;
use App\Services\BaseService;

class CertificationService extends BaseService
{
    protected string $repositoryName = CertificationRepository::class;

    public function create(array $data): Certification
    {
        $deleted = $this->repository->where('code', $data['code'])->withTrashed()->first();

        if($deleted){
            $deleted->deleted_at = null;
            $deleted->save();
            $deleted->update($data);
            return $deleted->fresh();
        }

        return $this->repository->create($data);
    }

    public function update(Certification $certification, array $data): Certification
    {
        $certification->update($data);

        return $certification->refresh();
    }

    public function delete(Certification $certification): bool
    {
        return $certification->delete();
    }

    public function get($search = null)
    {
        $search = trim($search);

        return $this->repository
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}
