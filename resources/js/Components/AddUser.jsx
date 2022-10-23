import { Inertia } from '@inertiajs/inertia';
import { method } from 'lodash';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import React, { useState, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner';


export default function AddTask({ onUserAddClick, data, setUserModal }) {
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
        <div id="extralarge-modal" tabIndex={-1} aria-hidden="false" className="fixed bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20 top-0 left-0 flex items-center justify-center md:h-5/6">
            <div className="relative w-full max-w-5xl h-full md:h-auto">
                {/* Modal content */}
                <form action="#" className="relative rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add user
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={setUserModal}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6 overflow-y-scroll">
                        <div className="">
                            <div class="mx-auto flex w-full flex-col justify-between space-y-4 px-8 sm:flex-row sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3">
                                <div class="relative w-full flex-grow">
                                    <label for="voice-search" class="sr-only">Search</label>
                                    <div class="relative w-full">
                                        <div className="col-12">
                                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <svg aria-hidden="true" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <input ref={searchEmailValue} type="text" id="voice-search" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search Email or User Full Name" required />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={searchForUsers} type="button" class="col-2 ml-2 inline-flex items-center rounded rounded-lg border border-blue-700 bg-gray-700 py-2.5 px-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" class="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
                                </button>
                            </div>
                            {searchedUsers &&
                                searchedUsers.map((user, index) => {
                                    let fullname = user.name.split(" ");
                                    let nameInitials = fullname.shift()[0] + fullname.pop()[0];
                                    return <>
                                        <div class="flex justify-between space-x-4 bg-orange-100 mx-8 my-2">
                                            {/* <div class="my-2 ml-4 inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                                                <span class="font-medium text-gray-600 dark:text-gray-300">{nameInitials}</span>
                                            </div> */}
                                            <div class="w-10 h-10 my-2 ml-4 inline-flex items-center justify-center rounded-full bg-blue-500 text-blue-100 mb-4">
                                                <span class="font-medium text-white-600 dark:text-white">{nameInitials}</span>
                                            </div>

                                            <div class="my-2 font-medium dark:text-black-200">
                                                <div>{user.name}</div>
                                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                                    <p>
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="my-2 ml-2 lg:mt-0 lg:w-1/2">
                                                <select onChange={() => roleHandelChange(index)} class="w-full bg-orange-100">
                                                    <option value="Developer">Developer</option>
                                                    <option value="Manager">Manager</option>
                                                    <option value="Tester">Tester</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div class="pl-2 mt-2 lg:mt-0 lg:w-1/2">
                                                <button onClick={() => addUserToProject(user.id, index)} type="button" class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                })
                            }
                        </div>

                        {loading && <span class="inline-block align-middle ..."><Spinner animation="border" variant="info" /></span>}
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button type="button" onClick={setUserModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Done
                        </button>
                    </div>
                </form>



            </div>
        </div>
    )
};
