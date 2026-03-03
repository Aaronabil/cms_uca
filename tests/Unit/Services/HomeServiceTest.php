<?php

namespace Tests\Unit\Services;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\Faculty;
use App\Models\Page;
use App\Models\SiteSetting;
use App\Models\User;
use App\Services\HomeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomeServiceTest extends TestCase
{
    use RefreshDatabase;

    protected HomeService $homeService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->homeService = new HomeService();
    }

    public function test_get_sambutan_rektor_returns_page_data_if_exists()
    {
        Page::factory()->create([
            'slug' => 'sambutan-rektor',
            'title' => 'Sambutan Rektor 2026',
            'content' => 'Selamat datang mahasiswa baru.',
            'status' => 'published',
        ]);

        $data = $this->homeService->getSambutanRektor();

        $this->assertIsArray($data);
        $this->assertEquals('Sambutan Rektor 2026', $data['title']);
        $this->assertEquals('Selamat datang mahasiswa baru.', $data['content']);
    }

    public function test_get_sambutan_rektor_returns_null_if_not_exists()
    {
        $data = $this->homeService->getSambutanRektor();
        $this->assertNull($data);
    }

    public function test_get_faculties_data_returns_faculties_with_study_programs()
    {
        $faculty = Faculty::factory()->create(['name' => 'Fakultas Teknik']);
        $faculty->studyPrograms()->create([
            'name' => 'Informatika',
            'slug' => 'informatika',
            'description' => 'Desc',
            'degree' => 'S1'
        ]);

        $data = $this->homeService->getFacultiesData();

        $this->assertCount(1, $data);
        $this->assertEquals('Fakultas Teknik', $data[0]['name']);
        $this->assertCount(1, $data[0]['study_programs']);
        $this->assertEquals('Informatika', $data[0]['study_programs'][0]['name']);
    }

    public function test_get_latest_articles_returns_formatted_data()
    {
        $user = User::factory()->create(['name' => 'Author A']);
        $article = Artikel::factory()->create([
            'status' => 'published',
            'users_id' => $user->id,
            'title' => 'News 1'
        ]);

        $data = $this->homeService->getLatestArticles(5);

        $this->assertCount(1, $data);
        $this->assertEquals('News 1', $data[0]['title']);
        $this->assertEquals('Author A', $data[0]['author']);
    }

    public function test_get_faqs_returns_array_from_settings()
    {
        SiteSetting::factory()->create([
            'setting_key' => 'faqs',
            'setting_value' => json_encode([
                ['question' => 'What?', 'answer' => 'This.']
            ]),
        ]);

        $data = $this->homeService->getFaqs();

        $this->assertIsArray($data);
        $this->assertCount(1, $data);
        $this->assertEquals('What?', $data[0]['question']);
    }
}
