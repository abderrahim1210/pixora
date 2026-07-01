<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EditionRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\EditionRequest::factory(20)->create()->each(function($request){
            while($request->requester_id === $request->owner_id){
                $request->owner_id = \App\Models\User::inRandomOrder()->first()->id;
                $request->save();
            }
        });
    }
}
