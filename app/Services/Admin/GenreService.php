<?php

namespace App\Services\Admin;

use App\Models\Genre;
use App\Repositories\GenreRepository;
use App\Services\BaseService;

class GenreService extends BaseService
{
    protected string $repositoryName = GenreRepository::class;

    public function create(array $data): Genre
    {
        $deleted = $this->repository->where('slug', $data['slug'])->withTrashed()->first();

        if($deleted){
            $deleted->deleted_at = null;
            $deleted->save();
            $deleted->update($data);
            return $deleted->fresh();
        }

        return $this->repository->create($data);
    }

    public function update(Genre $genre, array $data): Genre
    {
        $genre->update($data);

        return $genre->refresh();
    }

    public function delete(Genre $genre): bool
    {
        return $genre->delete();
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
