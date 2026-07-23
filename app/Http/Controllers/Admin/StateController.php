<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\State;
use App\Services\Admin\StateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StateController extends Controller
{
    public StateService $stateService;

    public function __construct(StateService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(Request $request): Response
    {
        $search = $request->search;
        $states = $this->stateService->get($search);

        return Inertia::render('admin/states/index', ['states' => $states, 'filters' => ['search' => $request->search]]);
    }

    public function toggleStatus(Request $request, State $state): RedirectResponse
    {
        $state->update([
            'flag' => $request->boolean('flag'),
        ]);

        return to_route('states.index')->with('success', 'State status updated successfully.');
    }
}
