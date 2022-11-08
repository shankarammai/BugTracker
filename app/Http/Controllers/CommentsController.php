<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $project_id, $taskId)
    {
        //
        $request->validate([
            'content' => ['required', 'string'],
        ]);

        $commentId = Comments::create([
            'task_id' => $taskId,
            'commented_by' => Auth::user()->id,
            'content' => $request->post('content')
        ]);
        if ($commentId) {
            $updatedTask = Task::with('comments.user:id,name,role,email')->find($taskId);
            return response()->json(['success' => true, 'task' => $updatedTask]);
        }
        return response()->json(['success' => false]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function show(Comments $comments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function edit(Comments $comments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comments $comments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project, $taskId, Comments $comment)
    {
        // 
        if ($comment->commented_by == Auth::user()->id || $project->creator == Auth::user()->id) {
            $comment->delete();
            $updatedTask = Task::with('comments.user:id,name,role,email')->find($taskId);
            return response()->json(['success' => true, 'data' => $updatedTask]);
        }
        return response()->json(['success' => false]);
    }
}