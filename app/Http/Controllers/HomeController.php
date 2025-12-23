<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use App\Models\Faculty;
use App\Models\Page;
use App\Models\SiteSetting; // Import SiteSetting model
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sambutanRektor = Page::where('slug', 'sambutan-rektor')->first();

        $faculties = Faculty::with('studyPrograms')->get();

        $articles = Artikel::with(['user', 'categories', 'featuredImage'])
            ->where('status', 'published')
            ->latest('published_at')
            ->take(10)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'category' => $article->categories->first()?->category_name ?? 'Umum',
                    'author' => $article->user->name,
                    'date' => $article->published_at ? \Carbon\Carbon::parse($article->published_at)->format('d M Y') : $article->created_at->format('d M Y'),
                    'image' => $article->featuredImage 
                        ? (str_starts_with($article->featuredImage->image_url, 'http') 
                            ? $article->featuredImage->image_url 
                            : '/storage/' . $article->featuredImage->image_url) 
                        : null,
                    'comments' => 0 // Placeholder
                ];
            });

        // Fetch FAQ data
        $faqsSetting = SiteSetting::where('setting_key', 'faqs')->first();
        $faqs = $faqsSetting ? json_decode($faqsSetting->setting_value, true) : [];

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
            'articles' => $articles,
            'faqs' => $faqs, // Pass FAQs to the frontend
        ]);
    }
}