<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CertificationRequest;
use App\Models\Certification;
use App\Services\Admin\CertificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public CertificationService $certificationService;

    public function __construct(CertificationService $certificationService)
    {
        $this->certificationService = $certificationService;
    }

    public function index(Request $request): Response
    {
        $search = $request->search;
        $certifications = $this->certificationService->get($search);

        return Inertia::render('admin/certifications/index', ['certifications' => $certifications, 'filters' => ['search' => $request->search]]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/certifications/form', [
            'certification' => null,
        ]);
    }

    public function edit(Certification $certification): Response
    {
        return Inertia::render('admin/certifications/form', [
            'certification' => $certification,
        ]);
    }

    public function store(CertificationRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $this->certificationService->create($validated);

        return to_route('certifications.index')->with('success', 'Certification created successfully.');
    }

    public function update(CertificationRequest $request, Certification $certification): RedirectResponse
    {
        $validated = $request->validated();
        $this->certificationService->update($certification, $validated);

        return to_route('certifications.index')->with('success', 'Certification updated successfully.');
    }

    public function destroy(Certification $certification): RedirectResponse
    {
        $this->certificationService->delete($certification);

        return to_route('certifications.index')->with('success', 'Certification deleted successfully.');
    }
}
