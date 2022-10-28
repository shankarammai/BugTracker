<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory, Uuids;

    protected $table = 'task_comments';
    protected $primaryKey = 'id';
    protected $fillable = ['task_id', 'commented_by', 'content'];
    protected $hidden = [
        
    ];


    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'commented_by', 'id');
    }
}