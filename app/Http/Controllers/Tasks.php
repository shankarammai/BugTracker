<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class Tasks extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($projectId)
    {
        // 
        return Inertia::render('Manager/Tasks', ['projectId' => $projectId]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($project_id)
    {
        //
        return Inertia::render('Manager/CreateTask', ['projectId' => $project_id]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $project_id)
    {

        $request->validate([
            'title' => ['required', 'string'],
            'priority' => ['required', 'in:Low,High,Medium'],
            'issue_type' => ['required', 'in:Task,Bug,Research'],
            'status' => ['required', 'in:New,Opened,In work,Need feedback,Closed,Realized,Rework'],
            'hours_spent' => ['required', 'numeric'],
            'content' => ['required', 'string'],
        ]);

        $taskId = Task::create([
            'project_id' => $project_id,
            'title' => $request->post('title'),
            'content' => $request->post('content'),
            'status' => $request->post('status'),
            'issue_type' => $request->post('issue_type'),
            'priority' => $request->post('priority'),
            'hours_spent' => $request->post('hours_spent'),
            'assigned_to' => $request->post('assigned_to'),
            'creator' => Auth::user()->id,
        ]);
        if ($taskId) {
            return redirect()->route('projects.tasks.show', ['project' => $project_id, 'task' => $taskId]);
        }
        return redirect()->route('projects.tasks.index', ['project' => $project_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($projectId, Task $task)
    {
        $assignedTo = $task->assignedUsers();
        $project = Project::where('id', $projectId)->first();
        $comments = Comments::with('user:id,name,role,email')->where('task_id', $task->id)->get();
        return Inertia::render('Manager/ViewTask', compact('task', 'assignedTo', 'comments', 'project'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}