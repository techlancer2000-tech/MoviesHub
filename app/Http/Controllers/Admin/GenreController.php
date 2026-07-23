<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenreRequest;
use App\Models\Genre;
use App\Services\Admin\GenreService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GenreController extends Controller
{
    public GenreService $genreService;

    public function __construct(GenreService $genreService)
    {
        $this->genreService = $genreService;
    }

    public function index(Request $request): Response
    {
        $search = $request->search;
        $genres = $this->genreService->get($search);

        return Inertia::render('admin/genres/index', ['genres' => $genres, 'filters' => ['search' => $request->search]]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/genres/form', [
            'genre' => null,
        ]);
    }

    public function edit(Genre $genre): Response
    {
        return Inertia::render('admin/genres/form', [
            'genre' => $genre,
        ]);
    }

    public function store(GenreRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $this->genreService->create($validated);

        return to_route('genres.index')->with('success', 'Genre created successfully.');
    }

    public function update(GenreRequest $request, Genre $genre): RedirectResponse
    {
        $validated = $request->validated();
        $this->genreService->update($genre, $validated);

        return to_route('genres.index')->with('success', 'Genre updated successfully.');
    }

    public function destroy(Genre $genre): RedirectResponse
    {
        $this->genreService->delete($genre);

        return to_route('genres.index')->with('success', 'Genre deleted successfully.');
    }
}
