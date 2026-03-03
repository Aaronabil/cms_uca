<?php

namespace App\Services;

use App\Models\Faculty;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FacultyService
{
    /**
     * Get faculty by slug with associated study programs.
     *
     *
     * @throws ModelNotFoundException
     */
    public function getFacultyBySlug(string $slug): Faculty
    {
        return Faculty::with('studyPrograms')->where('slug', $slug)->firstOrFail();
    }
}
