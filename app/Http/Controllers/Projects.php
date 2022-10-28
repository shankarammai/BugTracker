<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectUsers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Projects extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
        $user = Auth::user();
        if ($user->role == "Manager") {
            $projects = Project::where('creator', $user->id)->get();
            return Inertia::render('Manager/Projects', ['projects' => $projects]);
        }
        $projects = ProjectUsers::with('project')->where("user_id", $user->id)->get(['role', 'user_id', 'project_id']);
        return Inertia::render('Projects', ['projects' => count($projects) ? $projects : []]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (Auth::user()->role != "Manager") {
            return redirect('/projects/');
        }
        return Inertia::render('Manager/CreateProject');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'title' => ['required', 'string'],
            'budget' => ['required', 'numeric'],
            'dueDate' => ['required', 'string'],
            'status' => ['required', 'in:Not Started,Started,On Progress,Completed'],
            'description' => ['required', 'string'],
        ]);
        $project = Project::create([
            'title' => $request->post('title'),
            'creator' => Auth::user()->id,
            'budget' => $request->post('budget'),
            'due_date' => Carbon::parse($request->post('dueDate')),
            'status' => $request->post('status'),
            'description' => $request->post('description'),
        ]);
        if ($project) {
            return redirect()->route('projects.show', ['project' => $project->id])->with(['success' => true, 'message' => 'Project Created Successfully']);
        }
        return redirect()->route('projects.show', ['project' => $project->id])->with(['success' => false, 'message' => 'Something Went Wrong']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Todo::check if Manager
        $user = Auth::user();
        $projectUser = ProjectUsers::where('user_id', $user->id)->where('project_id', $id)->first();

        if ($projectUser) {
            //user is in the project

        }

        $project = Project::with(['users', 'tasks', 'tasks.comments.user:id,name,role,email'])->find($id);
        if (!$project) {
            abort(404);
        }

        if ($project->creator == $user->id) {
            $projectUsers = ProjectUsers::with('user:id,name,email',)->where('project_id', $id)->get();
            $onlyUsersArray = $projectUsers->map(function ($projectUser) {
                return $projectUser->user;
            });
            return Inertia::render('Manager/ViewProject', ['project' => $project, 'users' => $onlyUsersArray]);
        }

        return redirect('/projects/');
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
    public function update(Request $request, Project $project)
    {
        //
        $request->validate([
            'title' => ['required', 'string'],
            'budget' => ['required', 'numeric'],
            'dueDate' => ['required', 'string'],
            'status' => ['required', 'in:Not Started,Started,On Progress,Completed'],
            'description' => ['required', 'string'],
        ]);
        $projectCreated = $project->update([
            'title' => $request->post('title'),
            'budget' => $request->post('budget'),
            'due_date' => Carbon::parse($request->post('dueDate')),
            'status' => $request->post('status'),
            'description' => $request->post('description'),
        ]);
        if ($project) {
            return redirect()->route('projects.show', ['project' => $project->id])->with(['success' => true, 'message' => 'Project Successfully Updated']);
        }
        return redirect()->route('projects.show', ['project' => $project->id])->with(['success' => false, 'message' => 'Something Went Wrong']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        if ($project->creator == Auth::user()->id) {
            $project->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }
}