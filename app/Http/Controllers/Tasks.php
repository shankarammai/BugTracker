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
        abort(404);
        // return Inertia::render('Manager/Tasks', ['projectId' => $projectId]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($project_id)
    {
        //
        abort(404);
        // return Inertia::render('Manager/CreateTask', ['projectId' => $project_id]);
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
            'status' => ['required', 'in:Backlog,Development,In Progress,Done'],
            'hours_spent' => ['required', 'numeric'],
            'content' => ['required', 'string'],
        ]);

        $task = Task::create([
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
        if ($task) {
            $task->fresh()->load('comments.user:id,name,role,email');
            return response()->json(['success' => true, 'data' => $task]);
        }
        return response()->json(['success' => false, 'data' => $task]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($projectId, Task $task)
    {
        abort(404);
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
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($projectId, Request $request, Task $task)
    {
        if ($request->has('status') && !$request->has('title')) {
            $task->status = $request->post('status');
            if ($task->save()) {
                $updatedTask = Task::with('comments.user:id,name,role,email')->find($task->id);
                return response()->json(['success' => true, 'data' => $updatedTask]);
            }
        }
        if ($request->has('title')) {
            $request->validate([
                'title' => ['required', 'string'],
                'priority' => ['required', 'in:Low,High,Medium'],
                'issue_type' => ['required', 'in:Task,Bug,Research'],
                'status' => ['required', 'in:Backlog,Development,In Progress,Done'],
                'hours_spent' => ['required', 'numeric'],
                'content' => ['required', 'string'],
            ]);

            $task->title = $request->post('title');
            $task->status = $request->post('status');
            $task->assigned_to = $request->post('assigned_to');
            $task->priority = $request->post('priority');
            $task->issue_type = $request->post('issue_type');
            $task->hours_spent = $request->post('hours_spent');
            $task->content = $request->post('content');
            if ($task->save()) {
                $updatedTask = Task::with('comments.user:id,name,role,email')->find($task->id);
                return response()->json(['success' => true, 'data' => $updatedTask]);
            }
            return response()->json(['success' => false]);
        }
        return response()->json(['success' => false]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project, Task $task)
    {

        if ($project->creator == Auth::user()->id) {
            $task->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }
}