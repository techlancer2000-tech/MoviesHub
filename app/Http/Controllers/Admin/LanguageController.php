<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LanguageRequest;
use App\Models\Language;
use App\Services\Admin\LanguageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LanguageController extends Controller
{
    public LanguageService $languageService;

    public function __construct(LanguageService $languageService)
    {
        $this->languageService = $languageService;
    }

    public function index(Request $request): Response
    {
        $search = $request->search;
        $languages = $this->languageService->get($search);

        return Inertia::render('admin/languages/index', ['languages' => $languages, 'filters' => ['search' => $request->search]]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/languages/form', [
            'language' => null,
        ]);
    }

    public function edit(Language $language): Response
    {
        return Inertia::render('admin/languages/form', [
            'language' => $language,
        ]);
    }

    public function store(LanguageRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $this->languageService->create($validated);

        return to_route('languages.index')->with('success', 'Language created successfully.');
    }

    public function update(LanguageRequest $request, Language $language): RedirectResponse
    {
        $validated = $request->validated();
        $this->languageService->update($language, $validated);

        return to_route('languages.index')->with('success', 'Language updated successfully.');
    }

    public function destroy(Language $language): RedirectResponse
    {
        $this->languageService->delete($language);

        return to_route('languages.index')->with('success', 'Language deleted successfully.');
    }
}
