<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\LoanApplication
 *
 * @property int $id
 * @property int $user_id
 * @property string $amount
 * @property int $term_months
 * @property string $status
 * @property string|null $approved_amount
 * @property string|null $admin_notes
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $disbursed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication query()
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereApprovedAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereDisbursedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereTermMonths($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LoanApplication whereUserId($value)
 * @method static \Database\Factories\LoanApplicationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LoanApplication extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'amount',
        'term_months',
        'status',
        'approved_amount',
        'admin_notes',
        'approved_at',
        'disbursed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'approved_amount' => 'decimal:2',
        'approved_at' => 'datetime',
        'disbursed_at' => 'datetime',
    ];

    /**
     * Get the user that owns the loan application.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}