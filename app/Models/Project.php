<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory,Uuids;
    protected $table = 'projects';
    protected $primaryKey = 'id';

    protected $fillable = [
        'parent_id','creator', 'title','description','budget','due_date','status'
    ];
    
    public function tasks(){
        return $this->hasMany(Task::class, 'project_id');
    }
    public function users(){
        return $this->hasMany(ProjectUsers::class, 'user_id');
    }
}