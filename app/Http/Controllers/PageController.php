<?php

namespace App\Http\Controllers;

use App\Services\PageService;
use Inertia\Inertia;

class PageController extends Controller
{
    public function __construct(protected PageService $pageService) {}

    public function show($slug)
    {
        return Inertia::render('Page/Show', [
            'page' => $this->pageService->getPublishedPageBySlug($slug),
        ]);
    }
}
