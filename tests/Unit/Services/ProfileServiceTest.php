<?php

namespace Tests\Unit\Services;

use App\Models\User;
use App\Http\Requests\ProfileUpdateRequest;
use App\Services\ProfileService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ProfileServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ProfileService $profileService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->profileService = new ProfileService();
    }

    public function test_update_profile_updates_information()
    {
        $user = User::factory()->create([
            'name' => 'Old Name',
            'username' => 'olduser',
        ]);

        $request = ProfileUpdateRequest::create('/profile', 'PATCH', [
            'name' => 'New Name',
        ]);
        $request->setUserResolver(fn() => $user);

        // We have to mock the validated method since it's a FormRequest
        $mockRequest = \Mockery::mock(ProfileUpdateRequest::class)->makePartial();
        $mockRequest->shouldReceive('user')->andReturn($user);
        $mockRequest->shouldReceive('validated')->andReturn([
            'name' => 'New Name',
        ]);

        $this->profileService->updateProfile($mockRequest);

        $this->assertEquals('New Name', $user->name);
    }
}
