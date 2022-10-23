<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectUsers extends Model
{
    use HasFactory;
    use Uuids;
    protected $table = 'project_users';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'role', 'project_id'];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}