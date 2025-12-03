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

        return Inertia::render('Akademik/Fakultas/Show', [
            'faculty' => $faculty
        ]);
    }
}
