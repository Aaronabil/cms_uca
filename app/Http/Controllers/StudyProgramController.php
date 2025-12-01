<?php

namespace App\Http\Controllers;

use App\Models\StudyProgram;
use Inertia\Inertia;

class StudyProgramController extends Controller
{
    public function show($slug)
    {
        $studyProgram = StudyProgram::with('faculty')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Akademik/Fakultas/Prodi', [
            'studyProgram' => [
                'name' => $studyProgram->name,
                'faculty_name' => $studyProgram->faculty->name,
                'faculty_image_url' => $studyProgram->faculty->image_url,
                'degree' => 'Sarjana (S1)',
                'description' => 'Program Studi ' . $studyProgram->name . ' merupakan bagian dari ' . $studyProgram->faculty->name . ' yang berkomitmen mencetak lulusan berkualitas.',
            ],
        ]);
    }
}
