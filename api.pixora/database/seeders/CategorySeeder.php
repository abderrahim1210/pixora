<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Category::factory(10)->create();
        Category::insert([
            [
                'name' => 'Nature'
            ],
            [
                'name' => 'Landscape'
            ],
            [
                'name' => 'Portrait'
            ],
            [
                'name' => 'Street photography'
            ],
            [
                'name' => 'Architecture'
            ],
            [
                'name' => 'Travel'
            ],
            [
                'name' => 'Wildlife'
            ],
            [
                'name' => 'Food'
            ],
            [
                'name' => 'Fashion'
            ],
            [
                'name' => 'Sports'
            ],
            [
                'name' => 'Macro'
            ],
            [
                'name' => 'Black & White'
            ],
            [
                'name' => 'Urban'
            ],
            [
                'name' => 'Abstract'
            ],
        ]);
    }
}
