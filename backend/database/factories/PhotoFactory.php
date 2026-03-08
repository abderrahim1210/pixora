<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Photo>
 */
class PhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1,10),
            'category_id' => fake()->numberBetween(1,10),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            // 'type' => fake()->word(),
            'filename' => fake()->imageUrl(),
            // 'visibilty' => fake()->boolean(),
            'location' => fake()->country(),
            'tags' => fake()->word(),
            'width' => fake()->randomNumber(),
            'height' => fake()->randomNumber(),
            'ratio' => fake()->randomNumber(),
            'size' => fake()->numberBetween(1, 999999),
            'orientation' => fake()->randomNumber(),
            // 'status' => fake()->boolean(),
        ];
    }
}
