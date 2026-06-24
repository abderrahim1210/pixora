<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MigrateCoverImagesToCloudinary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-cover-images-to-cloudinary';

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
        $users = User::where('cover_image', 'NOT LIKE', 'https://%')->get();

        foreach ($users as $u) {
            $localPath = storage_path('app/public/cover_images/' . $u->cover_image);

            if (file_exists($localPath)) {
                $uploader = new \Cloudinary\Api\Upload\UploadApi();
                $result = $uploader->upload($localPath, ['folder' => 'pixora_photos']);

                $u->update(['cover_image' => $result['secure_url']]);

                $this->info("Migrated: " . $u->id);
            }
        }
    }
}
