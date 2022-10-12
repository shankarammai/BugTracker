<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory, Uuids;

    protected $table = 'tasks';
    protected $primaryKey = 'id';
    protected $fillable =
    ['project_id', 'title', 'content', 'status', 'issue_type', 'priority', 'hours_spent', 'creator', 'assigned_to'];


    public function comments()
    {
        $this->hasMany(Comments::class, 'task_id');
    }
}