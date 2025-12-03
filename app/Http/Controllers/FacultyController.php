<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Inertia\Inertia;

class FacultyController extends Controller
{
    public function show($slug)
    {
        // Find faculty by slug or fail (404)
        $faculty = Faculty::with('studyPrograms')->where('slug', $slug)->firstOrFail();

        // Map slugs to specific Inertia views
        $viewMapping = [
            'fakultas-ekonomi-dan-bisnis-islam' => 'Akademik/Fakultas/FEBI',
            'fakultas-ilmu-keperawatan' => 'Akademik/Fakultas/FIK',
            'fakultas-tarbiyah-dan-ilmu-keguruan' => 'Akademik/Fakultas/FTIK',
            'fakultas-teknik' => 'Akademik/Fakultas/FT',
        ];

        if (array_key_exists($slug, $viewMapping)) {
            return Inertia::render($viewMapping[$slug], [
                'faculty' => $faculty
            ]);
        }

        // If we have a faculty in DB but no specific view, we should probably 404 
        // or handling it with a generic view if one existed.
        abort(404);
    }
}
