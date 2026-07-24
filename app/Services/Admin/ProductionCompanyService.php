<?php

namespace App\Services\Admin;

use App\Models\ProductionCompany;
use App\Repositories\ProductionCompanyRepository;
use App\Services\BaseService;

class ProductionCompanyService extends BaseService
{
    protected string $repositoryName = ProductionCompanyRepository::class;

    public function create(array $data): ProductionCompany
    {
        if (isset($data['logo'])) {
            $data['logo'] = $data['logo']->store('production-companies/profile-images', 'public');
        }

        $deleted = $this->repository->where('slug', $data['slug'])->withTrashed()->first();

        if($deleted){
            $deleted->deleted_at = null;
            $deleted->save();
            $deleted->update($data);
            return $deleted->fresh();
        }

        return $this->repository->create($data);
    }

    public function update(ProductionCompany $production_company, array $data): ProductionCompany
    {
        if (isset($data['logo'])) {
            if ($production_company->logo) {
                \Storage::disk('public')->delete($production_company->logo);
            }

            $data['logo'] = $data['logo']->store('production-companies/profile-images', 'public');
        } else {
            unset($data['logo']);
        }

        $production_company->update($data);

        return $production_company->refresh();
    }

    public function delete(ProductionCompany $production_company): bool
    {
        return $production_company->delete();
    }

    public function get($search = null)
    {
        $search = trim($search);

        return $this->repository
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}
