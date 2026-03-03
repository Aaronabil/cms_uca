<?php

namespace App\Services;

use App\Models\Artikel;
use App\Models\Faculty;
use App\Models\Page;
use App\Models\SiteSetting;
use Carbon\Carbon;

class HomeService
{
    /**
     * Get the rector's greeting page data.
     */
    public function getSambutanRektor(): ?array
    {
        $sambutanRektor = Page::where('slug', 'sambutan-rektor')->first();

        return $sambutanRektor ? [
            'title' => $sambutanRektor->title,
            'content' => $sambutanRektor->content,
        ] : null;
    }

    /**
     * Get all faculties with their study programs mapped for frontend.
     */
    public function getFacultiesData()
    {
        return Faculty::with('studyPrograms')
            ->get()
            ->map(function ($faculty) {
                return [
                    'id' => $faculty->id,
                    'name' => $faculty->name,
                    'image_url' => $faculty->image_url,
                    'slug' => $faculty->slug,
                    'study_programs' => $faculty->studyPrograms->map(function ($program) {
                        return [
                            'name' => $program->name,
                            'slug' => $program->slug,
                        ];
                    }),
                ];
            });
    }

    /**
     * Get latest published articles mapped for frontend.
     */
    public function getLatestArticles(int $limit = 10)
    {
        return Artikel::with(['user', 'categories', 'featuredImage'])
            ->where('status', 'published')
            ->latest('published_at')
            ->take($limit)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'category' => $article->categories->first()?->category_name ?? 'Umum',
                    'author' => $article->user->name ?? 'Unknown',
                    'date' => $article->published_at
                        ? Carbon::parse($article->published_at)->format('d M Y')
                        : $article->created_at->format('d M Y'),
                    'image' => $article->featuredImage
                        ? (str_starts_with($article->featuredImage->image_url, 'http')
                            ? $article->featuredImage->image_url
                            : '/storage/'.$article->featuredImage->image_url)
                        : null,
                    'comments' => 0, // Placeholder
                ];
            });
    }

    /**
     * Get FAQs from SiteSettings.
     */
    public function getFaqs(): array
    {
        $faqsSetting = SiteSetting::where('setting_key', 'faqs')->first();

        return $faqsSetting ? json_decode($faqsSetting->setting_value, true) : [];
    }
}
