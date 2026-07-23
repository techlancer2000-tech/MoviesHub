<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Services\Admin\CountryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CountryController extends Controller
{
    public CountryService $countryService;

    public function __construct(CountryService $countryService)
    {
        $this->countryService = $countryService;
    }

    public function index(Request $request): Response
    {
        $search = $request->search;
        $countries = $this->countryService->get($search);

        return Inertia::render('admin/countries/index', ['countries' => $countries, 'filters' => ['search' => $request->search]]);
    }

    public function toggleStatus(Request $request, Country $country): RedirectResponse
    {
        $country->update([
            'flag' => $request->boolean('flag'),
        ]);

        return to_route('countries.index')->with('success', 'Country status updated successfully.');
    }
}
