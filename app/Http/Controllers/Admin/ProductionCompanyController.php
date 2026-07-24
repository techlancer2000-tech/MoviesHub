<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Gender;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductionCompanyRequest;
use App\Models\ProductionCompany;
use App\Services\Admin\CountryService;
use App\Services\Admin\ProductionCompanyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductionCompanyController extends Controller
{
    public ProductionCompanyService $productionCompanyService;

    public function __construct(ProductionCompanyService $productionCompanyService)
    {
        $this->productionCompanyService = $productionCompanyService;
    }

    public function index(Request $request): Response
    {
        $search = $request->search;
        $production_companies = $this->productionCompanyService->get($search);

        return Inertia::render('admin/production-companies/index', ['production_companies' => $production_companies, 'filters' => ['search' => $request->search]]);
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

        return Inertia::render('admin/production-companies/form', [
            'production_company' => null,
            'countries' => $countries,
            'genders' => $genders,
        ]);
    }

    public function edit(ProductionCompany $production_company): Response
    {
        $genders = collect(Gender::cases())
            ->map(fn (Gender $gender) => [
                'value' => $gender->value,
                'name' => $gender->label(),
            ])
            ->values();
        $countries = app(CountryService::class)->getActive();

        return Inertia::render('admin/production-companies/form', [
            'production_company' => $production_company,
            'countries' => $countries,
            'genders' => $genders,
        ]);
    }

    public function store(ProductionCompanyRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $this->productionCompanyService->create($validated);

        return to_route('production-companies.index')->with('success', 'Production company created successfully.');
    }

    public function update(ProductionCompanyRequest $request, ProductionCompany $production_company): RedirectResponse
    {
        $validated = $request->validated();
        $this->productionCompanyService->update($production_company, $validated);

        return to_route('production-companies.index')->with('success', 'Production company updated successfully.');
    }

    public function destroy(ProductionCompany $production_company): RedirectResponse
    {
        $this->productionCompanyService->delete($production_company);

        return to_route('production-companies.index')->with('success', 'Production company deleted successfully.');
    }
}
