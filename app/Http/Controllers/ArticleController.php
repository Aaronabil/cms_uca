<?php

namespace App\Http\Controllers;

use App\Services\ArticleService;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function __construct(protected ArticleService $articleService) {}

    public function index()
    {
        $articles = $this->articleService->getPaginatedArticles(10);

        return Inertia::render('News/SemuaBerita', [
            'articles' => $articles,
        ]);
    }

    public function show($slug)
    {
        $data = $this->articleService->getArticleViewData($slug);

        return Inertia::render('News/Index', [
            'article' => $data['article'],
            'relatedArticles' => $data['relatedArticles'],
        ]);
    }
}
