<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EditingTasks extends Model
{
    public function user(){
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function editor(){
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function photo (){
        return $this->belongsTo(Photo::class,'image_id');
    }

    public function editionRequests(){
        return $this->belongsTo(EditionRequest::class, 'request_id');
    }
}
