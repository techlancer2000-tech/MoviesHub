<?php

namespace App\Services\Admin;

use App\Models\Language;
use App\Repositories\LanguageRepository;
use App\Services\BaseService;
use Illuminate\Support\Collection;

class LanguageService extends BaseService
{
    protected string $repositoryName = LanguageRepository::class;

    public function create(array $data): Language
    {
        if (isset($data['flag'])) {
            $data['flag'] = $data['flag']->store('languages/flags', 'public');
        }

        $deleted = $this->repository->where('code', $data['code'])->withTrashed()->first();

        if($deleted){
            $deleted->deleted_at = null;
            $deleted->save();
            $deleted->update($data);
            return $deleted->fresh();
        }

        return $this->repository->create($data);
    }

    public function update(Language $language, array $data): Language
    {
        if (isset($data['flag'])) {
            if ($language->flag) {
                \Storage::disk('public')->delete($language->flag);
            }

            $data['flag'] = $data['flag']->store('languages/flags', 'public');
        } else {
            unset($data['flag']);
        }

        $language->update($data);

        return $language->refresh();
    }

    public function delete(Language $language): bool
    {
        return $language->delete();
    }

    public function get($search = null)
    {
        $search = trim($search);

        return $this->repository
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('native_name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('locale', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }
}
