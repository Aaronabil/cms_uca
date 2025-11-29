<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sambutanRektor = Page::where('slug', 'sambutan-rektor')->first();

        $faculties = Faculty::with('studyPrograms')->get();

        return Inertia::render('Index', [
            'sambutanRektor' => $sambutanRektor ? [
                'title' => $sambutanRektor->title,
                'content' => $sambutanRektor->content,
            ] : null,
            'faculties' => $faculties->map(function ($faculty) {
                return [
                    'id' => $faculty->id,
                    'name' => $faculty->name,
                    'image_url' => $faculty->image_url,
                    'slug' => $faculty->slug,
                    'study_programs' => $faculty->studyPrograms->map(function ($program) {
                        return [
                            'name' => $program->name,
                        ];
                    }),
                ];
            }),
        ]);
    }
}