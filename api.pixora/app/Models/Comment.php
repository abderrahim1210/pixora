<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['content','photo_id','user_id'];
    public function photo(){
        return $this->belongsTo(Photo::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getCreatedAtHumanAttribute(){
        return $this->created_at->diffForHumans();
    }

    public function reports()
    {
        return $this->morphMany(Report::class, 'reportable');
    }
}
