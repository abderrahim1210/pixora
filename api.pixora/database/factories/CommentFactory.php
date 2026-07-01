<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'photo_id' => \App\Models\Photo::inRandomOrder()->first()->id,
            'user_id' => \App\Models\User::inRandomOrder()->where('role','user')->first()->id,
            'content' => fake()->paragraph(),
            'created_at' => fake()->time()
        ];
    }
}
