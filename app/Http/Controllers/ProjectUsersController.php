<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ProjectUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class ProjectUsersController extends Controller
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
    public function store(Request $request)
    {
        if (Auth::user()->role != 'Manager') {
            return response()->json(['success' => false, 'message' => "You need to create account as manager to add users"]);
        }

        $request->validate([
            'userId' => ['required', 'string'],
            'role' => ['required', 'string'],
            'projectId' => ['required', 'string'],
        ]);

        $userToAdd = $request->post('userId');
        $role = $request->post('role');
        $project_id = $request->post('projectId');

        $checkIfExists = ProjectUsers::where('user_id', $userToAdd)->where('project_id', $project_id)->first();
        if ($checkIfExists) {
            return response()->json(['success' => false, 'message' => 'User Already Exists']);
        }

        $projectUser = ProjectUsers::create([
            'user_id' => $userToAdd,
            'role' => $role,
            'project_id' => $project_id
        ]);
        if ($projectUser) {
            return response()->json(['success' => true, 'projectId' => $projectUser->id]);
        }
        return response()->json(['success' => false, 'message' => 'Something Went Wrong']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\projectusers  $projectusers
     * @return \Illuminate\Http\Response
     */
    public function show(ProjectUsers $projectusers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\projectusers  $projectusers
     * @return \Illuminate\Http\Response
     */
    public function edit(ProjectUsers $projectusers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\projectusers  $projectusers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProjectUsers $projectusers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\projectusers  $projectusers
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProjectUsers $projectusers)
    {
        //
    }

    public function getAllUsers(Request $request)
    {
        $user_email = $request->post('email');
        $allUser = User::where('email', 'like', "%" . $user_email . "%")->orWhere('name', $user_email)->get();
        return response()->json($allUser);
    }


    public function getProjectUsers(Request $request)
    {
        $user_email = $request->post('email');
        $projectId = $request->post('projectId');

        $projectUser = ProjectUsers::with('user')->where('project_id', $projectId)->get();
        $allUser = $projectUser->filter(function ($user) use ($user_email) {
            return str_contains($user->name, $user_email);
        })->map(function ($user) {
            return $user->user;
        });
        return response()->json($allUser);
    }
}