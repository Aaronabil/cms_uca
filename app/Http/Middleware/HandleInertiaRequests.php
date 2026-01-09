<?php

namespace App\Http\Middleware;

use App\Models\Faculty;
use App\Models\Menu;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'site_settings' => SiteSetting::all()->mapWithKeys(function ($item) {
                if ($item->setting_key === 'logo_url' && $item->setting_value && !str_starts_with($item->setting_value, '/')) {
                    return [$item->setting_key => \Illuminate\Support\Facades\Storage::url($item->setting_value)];
                }
                return [$item->setting_key => $item->setting_value];
            }),
            'menus' => Menu::whereNull('parent_id')
                ->with(['children' => function ($query) {
                    $query->orderBy('order');
                }])
                ->orderBy('order')
                ->get(),
            'faculties_global' => Faculty::with('studyPrograms')->get()->map(function ($faculty) {
                return [
                    'id' => $faculty->id,
                    'name' => $faculty->name,
                    'image_url' => $faculty->image_url,
                    'slug' => $faculty->slug,
                    'study_programs' => $faculty->studyPrograms->map(function ($program) {
                        return [
                            'name' => $program->name,
                        ];
                    }),
                ];
            }),
        ];
    }
}