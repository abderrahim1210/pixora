<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Override;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    // protected $fillable = [
    //     'name',
    //     'email',
    //     'password',
    // ];
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    #[Override]
    protected static function booted()
    {
        static::deleting(function($user){
            DB::transaction(function() use ($user){
                $user->photos->each(function($photo){
                    if ($photo->filename){
                        Storage::disk('public')->delete("photos/".$photo->filename);
                    }
                });

                $user->images->each(function($image){
                    if ($image->path){
                        Storage::disk('public')->delete("edited_images/".$image->path);
                    }
                });

                $user->photos()->delete();
                $user->images()->delete();
                $user->likes()->delete();
                $user->followings()->delete();
                $user->followers()->delete();
                $user->editionRequests()->delete();

                if ($user->photo_profile){
                    Storage::disk('public')->delete("profile_pictures/".$user->photo_profile);
                }

                if ($user->cover_image){
                    Storage::disk('public')->delete("cover_images/".$user->cover_image);
                }
            });
        });
    }

    public function photos(){
        return $this->hasMany(Photo::class);
    }

    public function followings(){
        return $this->hasMany(Follow::class,'follower_id');
    }

    public function followers(){
        return $this->hasMany(Follow::class, 'following_id');
    }

    public function likes(){
        return $this->hasMany(Like::class);
    }

    public function images(){
        return $this->hasMany(Image::class, 'owner_id');
    }

    public function editionRequests(){
        return $this->hasMany(EditionRequest::class, 'requester_id');
    }

    
}
