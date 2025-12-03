<?php

namespace Database\Seeders;

use App\Models\Artikel;
use App\Models\Category;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Super Admin Role
        $superAdminRole = Role::create(['name' => 'Super Admin']);

        // Create Super Admin User
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => Hash::make('password'),
            'role_id' => $superAdminRole->id,
        ]);

        $this->call([
            SiteSettingSeeder::class,
            FacultyStudyProgramSeeder::class,
            MenuSeeder::class,
            PageSeeder::class,
        ]);

        // Create Categories
        $categories = Category::factory()->count(5)->create();

        // Create Articles
        Artikel::factory()
            ->count(10)
            ->create([
                'users_id' => $superAdmin->id,
            ])
            ->each(function ($artikel) use ($categories) {
                $artikel->categories()->attach(
                    $categories->random(rand(1, 2))->pluck('id')->toArray()
                );
            });
    }
}

