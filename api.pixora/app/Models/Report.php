<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{

    protected $fillable = ['status'];

    public function reportable()
    {
        return $this->morphTo();
    }
}
