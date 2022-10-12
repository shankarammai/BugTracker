<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory, Uuids;

    protected $table = 'comments';
    protected $primaryKey = 'id';
    protected $fillable = ['task_id', 'commented_by', 'content'];


    public function task()
    {
        $this->belongsTo(Task::class, 'task_id');
    }
}