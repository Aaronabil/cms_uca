<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faculty>
 */
class FacultyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->company . ' Faculty';
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'image_url' => $this->faker->imageUrl(),
            'description' => $this->faker->sentence(),
        ];
    }
}
