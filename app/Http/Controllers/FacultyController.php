<?php

namespace App\Http\Controllers;

use App\Services\FacultyService;
use Inertia\Inertia;

class FacultyController extends Controller
{
    public function __construct(protected FacultyService $facultyService) {}

    public function show($slug)
    {
        return Inertia::render('Akademik/Fakultas/Show', [
            'faculty' => $this->facultyService->getFacultyBySlug($slug),
        ]);
    }
}
