<?php

namespace App\Services\Admin;

use App\Models\Cast;
use App\Repositories\CastRepository;
use App\Services\BaseService;

class CastService extends BaseService
{
    protected string $repositoryName = CastRepository::class;

    public function create(array $data): Cast
    {
        if (isset($data['profile_image'])) {
            $data['profile_image'] = $data['profile_image']->store('casts/profile-images', 'public');
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

    public function update(Cast $cast, array $data): Cast
    {
        if (isset($data['profile_image'])) {
            if ($cast->profile_image) {
                \Storage::disk('public')->delete($cast->profile_image);
            }

            $data['profile_image'] = $data['profile_image']->store('casts/profile-images', 'public');
        } else {
            unset($data['profile_image']);
        }

        $cast->update($data);

        return $cast->refresh();
    }

    public function delete(Cast $cast): bool
    {
        return $cast->delete();
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
            ->with('country')
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}
