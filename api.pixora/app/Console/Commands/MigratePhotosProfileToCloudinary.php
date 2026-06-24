<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MigratePhotosProfileToCloudinary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-photos-profile-to-cloudinary';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::where('photo_profile', 'NOT LIKE', 'https://%')->get();

        foreach ($users as $user) {
            $localPath = storage_path('app/public/profile_pictures/' . $user->photo_profile);

            if (file_exists($localPath)) {
                $uploader = new \Cloudinary\Api\Upload\UploadApi();
                $result = $uploader->upload($localPath, ['folder' => 'pixora_photos_profile']);

                $user->update(['photo_profile' => $result['secure_url']]);

                $this->info("Migrated: " . $user->id);
            }
        }
    }
}
