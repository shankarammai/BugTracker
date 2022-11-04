<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Task extends Model
{
    use HasFactory, Uuids;

    protected $table = 'tasks';
    protected $primaryKey = 'id';
    protected $casts = [
        'assigned_to' => 'array'
    ];
    protected $fillable =
    ['project_id', 'title', 'content', 'status', 'issue_type', 'priority', 'hours_spent', 'creator', 'assigned_to'];


    public function comments()
    {
        return $this->hasMany(Comments::class, 'task_id')->orderBy('created_at', 'DESC');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
    public function assignedUsers()
    {
        return User::find($this->assigned_to);
    }
}