<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_name',
        'product_price',
        'product_description',
        'product_qty',
        'file_path',
        'is_accepted',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
