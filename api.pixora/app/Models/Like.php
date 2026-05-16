<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function photo(){
        return $this->belongsTo(Photo::class);
    }

    // public function notifications()
    // {
    //     return $this->morphMany(Notification::class, 'notifiable');
    // }
}
