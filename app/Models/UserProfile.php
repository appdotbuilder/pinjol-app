<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\UserProfile
 *
 * @property int $id
 * @property int $user_id
 * @property string $phone
 * @property string|null $nik
 * @property string|null $full_name
 * @property string|null $address
 * @property string|null $job
 * @property string|null $monthly_income
 * @property string|null $bank_name
 * @property string|null $bank_account
 * @property string|null $ktp_photo
 * @property string|null $selfie_photo
 * @property string|null $signature
 * @property bool $is_verified
 * @property \Illuminate\Support\Carbon|null $verified_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereBankAccount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereBankName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereJob($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereKtpPhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereMonthlyIncome($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereSelfiePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereSignature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereVerifiedAt($value)
 * @method static \Database\Factories\UserProfileFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class UserProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'phone',
        'nik',
        'full_name',
        'address',
        'job',
        'monthly_income',
        'bank_name',
        'bank_account',
        'ktp_photo',
        'selfie_photo',
        'signature',
        'is_verified',
        'verified_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'monthly_income' => 'decimal:2',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}