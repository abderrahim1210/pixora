<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function parent(){
        return $this->belongsTo(Image::class, 'image_id');
    }

    public function edits(){
        return $this->hasMany(Image::class, 'image_id');
    }

    public function requests(){
        return $this->hasMany(EditionRequest::class);
    }
}
