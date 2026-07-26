<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentSetting extends Model
{
    use SoftDeletes;
    protected $table = 'payments_settings';
    protected $fillable = ['user_id', 'method_type', 'credentials', 'is_default'];

    protected $casts = [
        'credentials' => 'array',
        'is_default' => 'boolean'
    ];
}
