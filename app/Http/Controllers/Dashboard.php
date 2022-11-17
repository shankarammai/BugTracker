<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\Project;
use App\Models\ProjectUsers;
use App\Models\Task;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Dashboard extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        if ($user->role == 'Manager') {
            $projects = Project::where('creator', $user->id)->get();
            $projects_ids = $projects->map(function ($project) {
                return $project->id;
            });
            $commentsInProjects = $projects->load('comments.task', 'comments.user:id,name,email,role')->map(function ($project) {
                return $project->comments;
            })->toArray();
            $comments = array_merge(...$commentsInProjects);
            $tasks = Task::whereIn('project_id', $projects_ids)->get();
            return Inertia::render('Dashboard', compact('projects', 'tasks', 'comments'));
        } else {
            $projects = ProjectUsers::where('user_id', $user->id)->with('project.tasks')->get();
            $tasks = Task::whereJsonContains('assigned_to', [$user->id])->get();
            $task_ids = $tasks->map(function ($task, $key) {
                return $task->id;
            });
            $comments = Comments::whereIn('task_id', $task_ids)->with('task', 'user:id,name,email,role')->orderBy('updated_at', 'desc')->take(10)->get();

            return Inertia::render('Dashboard', compact('projects', 'tasks', 'comments'));
        }
    }
}