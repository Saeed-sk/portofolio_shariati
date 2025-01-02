<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    /** @use HasFactory<\Database\Factories\HomeFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type', 'url', 'alt', 'color', 'content', 'status'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'type' => 'string',
        'url' => 'string',
        'alt' => 'string',
        'color' => 'string',
        'content' => 'string',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Define constants for the type field.
     */
    public const TYPE_IMAGE = 'image';
    public const TYPE_VIDEO = 'video';

    /**
     * Accessor for checking if the landing type is image.
     */
    public function isImage(): bool
    {
        return $this->type === self::TYPE_IMAGE;
    }

    /**
     * Accessor for checking if the landing type is video.
     */
    public function isVideo(): bool
    {
        return $this->type === self::TYPE_VIDEO;
    }
}
