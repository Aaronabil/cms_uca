<?php

namespace App\Services;

use App\Models\StudyProgram;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StudyProgramService
{
    /**
     * Get study program by slug with mapped data for frontend.
     *
     *
     * @throws ModelNotFoundException
     */
    public function getStudyProgramViewData(string $slug): array
    {
        $studyProgram = StudyProgram::with('faculty')
            ->where('slug', $slug)
            ->firstOrFail();

        return [
            'name' => $studyProgram->name,
            'slug' => $studyProgram->slug,
            'faculty_name' => $studyProgram->faculty->name,
            'faculty_image_url' => $studyProgram->faculty->image_url,
            'degree' => 'Sarjana (S1)',
            'description' => 'Program Studi '.$studyProgram->name.' merupakan bagian dari '.$studyProgram->faculty->name.' yang berkomitmen mencetak lulusan berkualitas.',
        ];
    }
}
