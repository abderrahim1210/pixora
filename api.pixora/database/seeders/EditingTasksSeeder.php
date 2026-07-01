<?php

namespace Database\Seeders;

use App\Models\EditingTasks;
use App\Models\EditionRequest;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EditingTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $approvedRequests = EditionRequest::where('status','approved')->get();
        foreach($approvedRequests as $req){
            EditingTasks::create([
                'request_id' => $req->id,
                'requester_id' => $req->requester_id,
                'editor_id' => User::inRandomOrder()->where('role', 'editor')->first()?->id ?? 1,
                'status' => 'in_progress'
            ]);
        }
    }
}
