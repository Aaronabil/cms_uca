<?php

namespace Tests\Unit\Services;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\ArtikelImage;
use App\Models\User;
use App\Services\ArticleService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class ArticleServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ArticleService $articleService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->articleService = new ArticleService();
    }

    public function test_get_paginated_articles_returns_expected_format()
    {
        $user = User::factory()->create(['name' => 'John Doe']);
        $category = Category::factory()->create(['category_name' => 'Teknologi']);
        
        $article = Artikel::factory()->create([
            'title' => 'Test Article',
            'slug' => 'test-article',
            'status' => 'published',
            'users_id' => $user->id,
            'published_at' => Carbon::now()->subDay(),
        ]);
        
        $image = ArtikelImage::factory()->create([
            'image_url' => 'test-image.jpg',
            'artikel_id' => $article->id,
        ]);
        
        $article->update(['featured_image_id' => $image->id]);
        
        $article->categories()->attach($category->id);

        $paginator = $this->articleService->getPaginatedArticles(10);

        $this->assertInstanceOf(LengthAwarePaginator::class, $paginator);
        $this->assertCount(1, $paginator->items());

        $firstItem = $paginator->items()[0];
        $this->assertEquals($article->id, $firstItem['id']);
        $this->assertEquals('Test Article', $firstItem['title']);
        $this->assertEquals('test-article', $firstItem['slug']);
        $this->assertEquals('Teknologi', $firstItem['category']);
        $this->assertEquals('John Doe', $firstItem['author']);
        $this->assertEquals('/storage/test-image.jpg', $firstItem['image']);
    }

    public function test_get_article_view_data_returns_article_and_related()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        
        $mainArticle = Artikel::factory()->create([
            'title' => 'Main Article',
            'slug' => 'main-article',
            'status' => 'published',
            'users_id' => $user->id,
            'content' => 'This is content',
        ]);
        $mainArticle->categories()->attach($category->id);

        $relatedArticle = Artikel::factory()->create([
            'status' => 'published',
            'users_id' => $user->id,
        ]);
        $relatedArticle->categories()->attach($category->id);

        $data = $this->articleService->getArticleViewData('main-article');

        $this->assertArrayHasKey('article', $data);
        $this->assertArrayHasKey('relatedArticles', $data);

        $this->assertEquals($mainArticle->id, $data['article']['id']);
        $this->assertEquals('This is content', $data['article']['content']);
        $this->assertCount(1, $data['relatedArticles']);
        $this->assertEquals($relatedArticle->id, $data['relatedArticles'][0]['id']);
    }
}
