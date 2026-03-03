<?php

namespace App\Services;

use App\Models\Artikel;
use Carbon\Carbon;

class ArticleService
{
    /**
     * Get published articles with pagination.
     */
    public function getPaginatedArticles(int $perPage = 10)
    {
        return Artikel::with(['user', 'categories', 'featuredImage'])
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate($perPage)
            ->through(fn ($article) => $this->formatArticle($article));
    }

    /**
     * Get data for a single article view, including related articles.
     */
    public function getArticleViewData(string $slug): array
    {
        $article = Artikel::with(['user', 'categories', 'featuredImage'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $categoryId = $article->categories->first()?->id;

        return [
            'article' => $this->formatArticle($article, true),
            'relatedArticles' => $this->getRelatedArticles($article->id, $categoryId, 3),
        ];
    }

    /**
     * Get related articles for sidebar based on category.
     */
    public function getRelatedArticles(int $excludeId, ?int $categoryId, int $limit = 3)
    {
        return Artikel::with(['user', 'categories', 'featuredImage'])
            ->where('id', '!=', $excludeId)
            ->where('status', 'published')
            ->when($categoryId, function ($query) use ($categoryId) {
                return $query->whereHas('categories', function ($q) use ($categoryId) {
                    $q->where('categories.id', $categoryId);
                });
            })
            ->latest('published_at')
            ->take($limit)
            ->get()
            ->map(fn ($item) => $this->formatArticle($item));
    }

    /**
     * Format article data for frontend.
     */
    private function formatArticle($article, bool $includeContent = false): array
    {
        $data = [
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
        ];

        if ($includeContent) {
            $data['content'] = $article->content;
        }

        return $data;
    }
}
