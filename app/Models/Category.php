<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['category_name', 'slug'];

    /**
     * The artikels that belong to the category.
     */
    public function artikels(): BelongsToMany
    {
        return $this->belongsToMany(Artikel::class, 'artikel_category');
    }
}