<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function likes(){
        return $this->hasMany(Like::class);
    }

    public function getCreatedAtHumanAttribute(){
        return $this->created_at->diffForHumans();
    }

    public function galleries()
    {
        return $this->belongsToMany(Gallery::class, 'gallery_photos');
    }

    public function requests(){
        return $this->hasMany(EditionRequest::class,'image_id');
    }
}
