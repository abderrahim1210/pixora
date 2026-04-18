<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{

    protected $fillable = ['title','description','user_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photos()
    {
        return $this->belongsToMany(Photo::class, 'gallery_photos')->withPivot('order')->orderBy('gallery_photos.order');
    }
}
