<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PageService
{
    /**
     * Get published page by slug.
     *
     *
     * @throws ModelNotFoundException
     */
    public function getPublishedPageBySlug(string $slug): Page
    {
        return Page::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
    }
}
