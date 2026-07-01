<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EditionRequest>
 */
class EditionRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_id'    => \App\Models\Photo::inRandomOrder()->first()?->id ?? 1,
            'requester_id' => \App\Models\User::inRandomOrder()->first()?->id ?? 1,
            'owner_id'     => \App\Models\User::inRandomOrder()->first()?->id ?? 1,
            'status'       => fake()->randomElement(['pending', 'approved', 'rejected']),
            'message'      => fake()->sentence(),
        ];
    }
}
