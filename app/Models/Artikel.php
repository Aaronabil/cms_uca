<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class Artikel extends Model
{
    use HasFactory;

    protected $table = 'artikel';

    protected $fillable = [
        'users_id',
        'featured_image_id',
        'title',
        'slug',
        'content',
        'status',
        'published_at',
    ];

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::deleting(function (Artikel $artikel) {
            if ($artikel->featuredImage) {
                Storage::disk('public')->delete($artikel->featuredImage->image_url);
                $artikel->featuredImage->delete();
            }
        });
    }

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

    /**
     * The categories that belong to the artikel.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'artikel_category');
    }
}
