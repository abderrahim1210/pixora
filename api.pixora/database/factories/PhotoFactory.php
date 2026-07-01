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
        $allowedIdsCategs = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 36];
        return [
            'user_id' => \App\Models\User::inRandomOrder()->where('role','user')->first()->id,
            'category_id' => fake()->randomElement($allowedIdsCategs),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            // 'type' => fake()->word(),
            'filename' => 'https://picsum.photos/640/480?random=' . fake()->numberBetween(1, 1000),
            // 'visibilty' => fake()->boolean(),
            // 'location' => fake()->country(),
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
