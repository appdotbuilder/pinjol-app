<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FaqArticle
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property string $category
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle query()
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FaqArticle active()

 * 
 * @mixin \Eloquent
 */
class FaqArticle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'content',
        'category',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Scope a query to only include active articles.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}