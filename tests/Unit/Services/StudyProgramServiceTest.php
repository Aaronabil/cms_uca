<?php

namespace Tests\Unit\Services;

use App\Models\Faculty;
use App\Models\StudyProgram;
use App\Services\StudyProgramService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudyProgramServiceTest extends TestCase
{
    use RefreshDatabase;

    protected StudyProgramService $studyProgramService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->studyProgramService = new StudyProgramService();
    }

    public function test_get_study_program_view_data_returns_formatted_data()
    {
        $faculty = Faculty::factory()->create(['name' => 'Fakultas Ilmu Komputer', 'image_url' => 'fasKom.jpg']);
        $studyProgram = StudyProgram::factory()->create([
            'name' => 'Sistem Informasi',
            'slug' => 'sistem-informasi',
            'faculty_id' => $faculty->id,
        ]);

        $result = $this->studyProgramService->getStudyProgramViewData('sistem-informasi');

        $this->assertIsArray($result);
        $this->assertEquals('Sistem Informasi', $result['name']);
        $this->assertEquals('sistem-informasi', $result['slug']);
        $this->assertEquals('Fakultas Ilmu Komputer', $result['faculty_name']);
        $this->assertEquals('fasKom.jpg', $result['faculty_image_url']);
        $this->assertEquals('Sarjana (S1)', $result['degree']);
        $this->assertStringContainsString('Sistem Informasi', $result['description']);
    }

    public function test_get_study_program_view_data_throws_exception_if_not_found()
    {
        $this->expectException(ModelNotFoundException::class);
        $this->studyProgramService->getStudyProgramViewData('unknown');
    }
}
