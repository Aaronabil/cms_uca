<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Artikel extends Model
{
    use HasFactory;

    protected $table = 'artikel';

    /**
     * Get the featured image for the artikel.
     */
    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(ArtikelImage::class, 'featured_image_id');
    }

    /**
     * Get the user that owns the artikel.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
