<?php

namespace App\Http\Controllers;

use App\Services\StudyProgramService;
use Inertia\Inertia;

class StudyProgramController extends Controller
{
    public function __construct(protected StudyProgramService $studyProgramService) {}

    public function show($slug)
    {
        return Inertia::render('Akademik/Fakultas/Prodi', [
            'studyProgram' => $this->studyProgramService->getStudyProgramViewData($slug),
        ]);
    }
}
