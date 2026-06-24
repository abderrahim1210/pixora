<?php

namespace App\Console\Commands;

use App\Models\Photo;
use Illuminate\Console\Command;

class MigratePhotosToCloudinary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-photos-to-cloudinary';

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
        $photos = Photo::where('filename', 'NOT LIKE', 'https://%')->get();

        foreach ($photos as $photo) {
            $localPath = storage_path('app/public/photos/' . $photo->filename);

            if (file_exists($localPath)) {
                $uploader = new \Cloudinary\Api\Upload\UploadApi();
                $result = $uploader->upload($localPath, ['folder' => 'pixora_photos']);

                $photo->update(['filename' => $result['secure_url']]);

                $this->info("Migrated: " . $photo->id);
            }
        }
    }
}
