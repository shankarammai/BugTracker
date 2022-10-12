<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectUser extends Model
{
    use HasFactory;
    protected $table = 'project_users';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'role'];

}