import { Inertia } from '@inertiajs/inertia';
import { method } from 'lodash';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import React, { useState, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner';


export default function AddUser({ onUserAddClick, data, setUserModal }) {
    const [newUsers, setNewUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState(null);
    const searchEmailValue = useRef();

    const searchForUsers = () => {
        setLoading(true);
        axios.post('/users/searchUsers',
            { searchEmail: searchEmailValue.current.value })
            .then((response) => {
                console.log(response.data);
                setSearchedUsers(response.data);
            }, (error) => {
                console.log(error);
            });
        setLoading(false);
    }

    const addUserToProject = (userId, index) => {
        setLoading(true);
        let role = searchedUsers[index]['role'] || 'Developer';
        axios.post('/projectUsers',
            { userId, role, projectId: window.location.pathname.split('/').pop() })
            .then((response) => {
                console.log(response.data);
                (response.data.success) ? alertify.success('User Successfully Added') : alertify.error(response.data.message)
            }, (error) => {
                console.log(error);
                alertify.error(error);
            });
        setLoading(false);
    }


    const roleHandelChange = (index) => {
        let previousSearched = searchedUsers;
        previousSearched[index]['role'] = event.target.value;
        setSearchedUsers(previousSearched);
    }
    return (

        <div className="container-fluid">
            <div className="row">
                <div class="mx-auto flex w-full flex-col justify-between space-y-4 px-8 sm:flex-row sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3">
                    <div class="relative w-full flex-grow">
                        <div class="relative w-full">
                            <div className="col-12">
                                <input ref={searchEmailValue} type="text" id="voice-search" class="ml-2 form-control form-control-light" placeholder="Search Email or User Full Name" required />
                            </div>
                        </div>
                    </div>
                    <button onClick={searchForUsers} type="button" class="col-2 ml-2 inline-flex items-center rounded rounded-lg border border-blue-700 bg-gray-700 py-2.5 px-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" class="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
                    </button>
                </div>
            </div>

            {searchedUsers &&
                searchedUsers.map((user, index) => {
                    let fullname = user.name.split(" ");
                    let nameInitials = (fullname.length > 1) ? fullname.shift()[0] + fullname.pop()[0] : fullname.shift()[0];
                    return <>
                        <div className="row mt-1">
                            <div className="col-sm">
                                <div className="d-flex flex-row user p-1">
                                    <img src="#" class="float-left rounded-circle bg-secondary" alt={nameInitials} />                                    <div className="d-flex flex-column ml-2">
                                        <span className="name font-weight-bold">{user.email}</span>
                                    </div>
                                </div>


                            </div>
                            <div className="col-sm">
                                <select onChange={() => roleHandelChange(index)} class="form-control">
                                    <option value="Developer">Developer</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Tester">Tester</option>
                                    <option value="Other">Other</option>
                                </select>

                            </div>
                            <div className="col-sm">
                                <button onClick={() => addUserToProject(user.id, index)} type="button" class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        </div>

                    </>
                }
                )}
        </div>
    )
}
