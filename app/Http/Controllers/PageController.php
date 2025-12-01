<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show($slug)
    {
        $page = Page::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('Page/Show', [
            'page' => $page,
        ]);
    }
}