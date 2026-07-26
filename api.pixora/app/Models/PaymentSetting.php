<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentSetting extends Model
{
    protected $table = 'payments_settings';
    protected $fillable = ['user_id', 'method_type', 'credentials', 'is_default'];

    protected $casts = [
        'credentials' => 'array',
        'is_default' => 'boolean'
    ];
}
