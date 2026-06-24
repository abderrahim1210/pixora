<?php

namespace App\Console\Commands;

use App\Models\Image;
use Illuminate\Console\Command;

class MigrateImagesToCloudinary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-images-to-cloudinary';

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
        $photos = Image::where('path', 'NOT LIKE', 'https://%')->get();

        foreach ($photos as $photo) {
            $localPath = storage_path('app/public/edited_images/' . $photo->path);

            if (file_exists($localPath)) {
                $uploader = new \Cloudinary\Api\Upload\UploadApi();
                $result = $uploader->upload($localPath, ['folder' => 'pixora_photos']);

                $photo->update(['path' => $result['secure_url']]);

                $this->info("Migrated: " . $photo->id);
            }
        }
    }
}
