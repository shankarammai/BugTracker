<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectUser;
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
        $projects = Project::where('creator', $user->id)->get();
        if ($user->role == "Manager") {
            var_dump($projects);
            return Inertia::render('Manager/Projects', ['projects' => $projects]);
        }
        $projects = ProjectUser::where("user_id", $user->id);
        return Inertia::render('Projects', ['projects' => $projects]);
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
        return redirect()->route('projects.show', ['project' => $project->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        echo 'hw';
        // $project = Project::with(['users', 'tasks'])->where('id', $id)->get();
        // if ($project->creator != Auth::user()->id) {
        //     return redirect('/projects/');
        // }

        // return Inertia::render('Manager/ViewProject', ['project' => $project]);
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