import React, { useState, useRef, useEffect } from 'react'
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-bootstrap/Modal';

export default function CreateTask(props) {
    const [showSearch, setShowSearch] = useState(false);
    const [addedUsers, setAddedUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const searchEmailValue = useRef();

    const { data, setData, post, processing, errors, transform } = useForm({
        title: '',
        priority: 'Low',
        issue_type: 'Task',
        status: 'New',
        hours_spent: '',
        content: '',
        assigned_to: []
    });

    const searchUser = () => {
        axios.post('/projectUsers/searchUsers',
            {
                searchEmail: searchEmailValue.current.value,
                projectId: props.projectId
            })
            .then((response) => {
                console.log(response.data);
                setSearchedUsers(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    const addUsers = (userId, initials, email) => {
            addedUsers.findIndex(item => item.userId == userId) < 0 ?
                (setAddedUsers([...addedUsers, { userId, initials, email }]), 
                setData('assigned_to',[...data.assigned_to,userId])
                ) :
                console.log('Already Added');

    }

    const removeUser = (removeIndex) => {
        setAddedUsers(preState => {
            return preState.filter((item, i) => i !== removeIndex)
        })
        let preAdded = data.assigned_to;
        preAdded.splice(removeIndex, 1);
        setData('assigned_to', preAdded);

    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        post(`/projects/${props.projectId}/tasks`,);
    }
    const handelCloseModel = () => {
        setShowSearch(false);
        setSearchedUsers(null);
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 classNameNameName="font-semibold text-xl text-gray-800 leading-tight">Create Task</h2>}>
            <Head title="Create Task" />

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 pt-2 mx-auto flex">
                    <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Enter Project Details</h2>

                        <div className="relative mb-4 ">
                            <label htmlFor="title" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title</label>
                            <input onChange={onHandleChange} value={data.title} type="text" name="title" id="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Title" required />
                            <InputError message={errors.title} className="mt-2" />

                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="issue_type" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Issue type</label>
                            <select name="issue_type" onChange={onHandleChange} value={data.issue_type} id="issue_type" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                <option value="Task">New</option>
                                <option value="Bug">Bug</option>
                                <option value="Research">Research</option>
                            </select>
                            <InputError message={errors.issue_type} className="mt-2" />

                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="priority" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Priority</label>
                            <select name="priority" onChange={onHandleChange} value={data.priority} id="priority" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <InputError message={errors.priority} className="mt-2" />

                        </div>
                        <div className="relative mb-4 ">
                            <label htmlFor="status" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Status</label>
                            <select name="status" onChange={onHandleChange} value={data.status} id="status" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                <option value="New">New</option>
                                <option value="Opened">Opened</option>
                                <option value="In work">In work</option>
                                <option value="Need feedback">Need feedback</option>
                                <option value="Closed">Closed</option>
                                <option value="Realized">Realized</option>
                                <option value="Rework">Rework</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>

                        <div className="relative mb-4 ">
                            <label htmlFor="hours_spent" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Hours Spent</label>
                            <input onChange={onHandleChange} value={data.hours_spent} type="number" name="hours_spent" id="hours_spent" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder={10} required />
                            <InputError message={errors.hours_spent} className="mt-2" />

                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="assigned_to" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Company</label>
                            <button onClick={() => setShowSearch(true)} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Add Users
                            </button>
                            {addedUsers && addedUsers.map((user, index) => {
                                return <>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">
                                        <p className="inline-flex ml-2">
                                            {user.email}
                                        </p>
                                        <button onClick={() => removeUser(index)} class="bg-pink-500 text-black active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                            X
                                        </button>
                                    </div>
                                </>
                            })}

                        </div>
                        <div className="relative mb-4">
                            <label for="description" className="leading-7 text-sm text-gray-600">Description</label>
                            <ReactQuill className="h-64 mb-2" name="description" theme="snow" value={data.content} onChange={(desc) => setData('content', desc)} />
                            <InputError message={errors.content} className="mt-2" />
                        </div>

                        <div className="relative my-4">
                            <button onClick={submit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                {processing ? 'Please Wait' : 'Create Task'}
                            </button>
                        </div>

                        <Modal show={showSearch} onHide={() => setShowSearch(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Search Users</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div class="mx-auto flex w-full flex-col justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3">
                                    <div class="relative w-full flex items-start flex-grow">
                                        <label for="simple-search" class="sr-only">Search</label>
                                        <div class="relative w-full">
                                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <input ref={searchEmailValue} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required="" />
                                        </div>
                                        <button onClick={searchUser} type="button" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                            <span class="sr-only">Search</span>
                                        </button>
                                    </div>
                                </div>

                                {searchedUsers && searchedUsers.map((user, index) => {
                                    let fullname = user.name.split(" ");
                                    let nameInitials = fullname.shift()[0] + fullname.pop()[0];
                                    return <>
                                        <div class="flex justify-between">
                                            <div class="w-10 h-10 my-2 ml-4 inline-flex items-center justify-center rounded-full bg-blue-500 text-blue-100 mb-4">
                                                <span class="font-medium text-white-600 dark:text-white">{nameInitials}</span>
                                            </div>
                                            <div class="my-2 mx-2 font-medium dark:text-black-200">
                                                <div>{user.name}</div>
                                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                                    <p>
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="pl-2 mt-2 lg:mt-0 lg:w-1/2">
                                                <button onClick={() => addUsers(user.id, nameInitials, user.email)} type="button" class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                })}

                                {addedUsers && <div class="text-center mb-2">
                                    <p class="title-font text-gray-900 mb-1">Assigned To</p>
                                    <div class="flex mt-1 justify-center">
                                        <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                                    </div>
                                </div>}
                                {addedUsers && addedUsers.map((user, index) => {
                                    return <>
                                        <div class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                                            <span class="font-medium text-gray-600 dark:text-gray-300">{user.initials}</span>
                                        </div>
                                    </>
                                })}

                            </Modal.Body>
                            <Modal.Footer>
                                <button onClick={handelCloseModel} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Done
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </section>


        </AuthenticatedLayout>
    )
}
