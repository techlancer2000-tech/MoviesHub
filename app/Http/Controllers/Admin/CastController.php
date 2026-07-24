<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Gender;
use App\Http\Controllers\Controller;
use App\Http\Requests\CastRequest;
use App\Models\Cast;
use App\Services\Admin\CastService;
use App\Services\Admin\CountryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CastController extends Controller
{
    public CastService $castService;

    public function __construct(CastService $castService)
    {
        $this->castService = $castService;
    }

    public function index(Request $request): Response
    {
        $search = $request->search;
        $casts = $this->castService->get($search);

        return Inertia::render('admin/casts/index', ['casts' => $casts, 'filters' => ['search' => $request->search]]);
    }

    public function create(): Response
    {
        $genders = collect(Gender::cases())
            ->map(fn (Gender $gender) => [
                'value' => $gender->value,
                'name' => $gender->label(),
            ])
            ->values();
        $countries = app(CountryService::class)->getActive();
        return Inertia::render('admin/casts/form', [
            'cast' => null,
            'countries' => $countries,
            'genders' => $genders,
        ]);
    }

    public function edit(Cast $cast): Response
    {
        $genders = collect(Gender::cases())
            ->map(fn (Gender $gender) => [
                'value' => $gender->value,
                'name' => $gender->label(),
            ])
            ->values();
        $countries = app(CountryService::class)->getActive();
        return Inertia::render('admin/casts/form', [
            'cast' => $cast,
            'countries' => $countries,
            'genders' => $genders,
        ]);
    }

    public function store(CastRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $this->castService->create($validated);

        return to_route('casts.index')->with('success', 'Cast created successfully.');
    }

    public function update(CastRequest $request, Cast $cast): RedirectResponse
    {
        $validated = $request->validated();
        $this->castService->update($cast, $validated);

        return to_route('casts.index')->with('success', 'Cast updated successfully.');
    }

    public function destroy(Cast $cast): RedirectResponse
    {
        $this->castService->delete($cast);

        return to_route('casts.index')->with('success', 'Cast deleted successfully.');
    }
}
