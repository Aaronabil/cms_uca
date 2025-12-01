<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use App\Models\Menu;
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
            'site_settings' => SiteSetting::all()->pluck('setting_value', 'setting_key'),
            'menus' => Menu::whereNull('parent_id')
                ->with(['children' => function ($query) {
                    $query->orderBy('order');
                }])
                ->orderBy('order')
                ->get(),
        ];
    }
}
