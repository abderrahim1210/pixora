<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EditionRequest extends Model
{
    // protected $hidden = ['image','photo'];
    public function photo (){
        return $this->belongsTo(Photo::class,'image_id');
    }
    public function image(){
        return $this->hasOne(Image::class, 'request_id');
    }

    public function owner(){
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function requester(){
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function editingTask(){
        return $this->hasOne(EditingTasks::class);
    }
}
