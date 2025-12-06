<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Artikel::with(['user', 'categories', 'featuredImage'])
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(10) // Pagination for listing all articles
            ->through(function ($article) {
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
                ];
            });

        return Inertia::render('News/SemuaBerita', [
            'articles' => $articles,
        ]);
    }

    public function show($slug)
    {
        $article = Artikel::with(['user', 'categories', 'featuredImage'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Format data for frontend
        $articleData = [
            'id' => $article->id,
            'title' => $article->title,
            'slug' => $article->slug,
            'content' => $article->content,
            'category' => $article->categories->first()?->category_name ?? 'Umum',
            'author' => $article->user->name,
            'date' => $article->published_at ? \Carbon\Carbon::parse($article->published_at)->format('d M Y') : $article->created_at->format('d M Y'),
            'image' => $article->featuredImage 
                        ? (str_starts_with($article->featuredImage->image_url, 'http') 
                            ? $article->featuredImage->image_url 
                            : '/storage/' . $article->featuredImage->image_url) 
                        : null,
        ];

        // Get related/latest articles for sidebar
        $relatedArticles = Artikel::with(['categories', 'featuredImage'])
            ->where('id', '!=', $article->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'date' => $item->published_at ? \Carbon\Carbon::parse($item->published_at)->format('d M Y') : $item->created_at->format('d M Y'),
                     'image' => $item->featuredImage 
                        ? (str_starts_with($item->featuredImage->image_url, 'http') 
                            ? $item->featuredImage->image_url 
                            : '/storage/' . $item->featuredImage->image_url) 
                        : null,
                    'category' => $item->categories->first()?->category_name ?? 'Umum',
                ];
            });

        return Inertia::render('News/Index', [
            'article' => $articleData,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
