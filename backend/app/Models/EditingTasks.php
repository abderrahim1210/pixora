<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EditingTasks extends Model
{
    public function requests()
    {
        return $this->hasMany(EditionRequest::class);
    }
}
