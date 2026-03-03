<?php

namespace Tests\Unit\Services;

use App\Models\Page;
use App\Services\PageService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageServiceTest extends TestCase
{
    use RefreshDatabase;

    protected PageService $pageService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->pageService = new PageService();
    }

    public function test_get_published_page_by_slug_returns_page()
    {
        $page = Page::factory()->create([
            'title' => 'About Us',
            'slug' => 'about-us',
            'status' => 'published',
        ]);

        $result = $this->pageService->getPublishedPageBySlug('about-us');

        $this->assertEquals($page->id, $result->id);
    }

    public function test_get_published_page_by_slug_throws_exception_if_draft()
    {
        Page::factory()->create([
            'title' => 'Draft Page',
            'slug' => 'draft-page',
            'status' => 'draft',
        ]);

        $this->expectException(ModelNotFoundException::class);
        $this->pageService->getPublishedPageBySlug('draft-page');
    }

    public function test_get_published_page_by_slug_throws_exception_if_not_found()
    {
        $this->expectException(ModelNotFoundException::class);
        $this->pageService->getPublishedPageBySlug('unknown-page');
    }
}
