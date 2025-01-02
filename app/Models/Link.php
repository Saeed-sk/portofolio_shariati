<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    /** @use HasFactory<\Database\Factories\LinkFactory> */
    use HasFactory;

    protected $fillable = ['name', 'url', 'icon', 'type'];

    public function scopeWhereType($query, $type)
    {
        return $query->where('type', $type);
    }

}
