<?php

namespace Tests\Unit\Services;

use App\Models\Faculty;
use App\Services\FacultyService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FacultyServiceTest extends TestCase
{
    use RefreshDatabase;

    protected FacultyService $facultyService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->facultyService = new FacultyService();
    }

    public function test_get_faculty_by_slug_returns_faculty_with_relations()
    {
        $faculty = Faculty::factory()->create(['name' => 'Fakultas Ekonomi', 'slug' => 'ekonomi']);
        $faculty->studyPrograms()->create([
            'name' => 'Manajemen',
            'slug' => 'manajemen',
            'description' => 'Desc',
            'degree' => 'S1'
        ]);

        $result = $this->facultyService->getFacultyBySlug('ekonomi');

        $this->assertEquals($faculty->id, $result->id);
        $this->assertEquals('Fakultas Ekonomi', $result->name);
        $this->assertTrue($result->relationLoaded('studyPrograms'));
        $this->assertCount(1, $result->studyPrograms);
    }

    public function test_get_faculty_by_slug_throws_exception_if_not_found()
    {
        $this->expectException(ModelNotFoundException::class);
        $this->facultyService->getFacultyBySlug('unknown-slug');
    }
}
