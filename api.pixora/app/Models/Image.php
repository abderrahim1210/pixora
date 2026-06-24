<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function parent()
    {
        return $this->belongsTo(Photo::class, 'parent_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function edits()
    {
        return $this->hasMany(Image::class, 'image_id');
    }

    public function request()
    {
        return $this->belongsTo(EditionRequest::class, 'request_id');
    }
}
