import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import AddUser from '@/Components/AddUser';
import AddTask from '@/Components/AddTask';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import TaskBoard from './TaskBoard';
import ProjectSettings from './ProjectSettings';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function ViewProject(props) {
    const [showTaskModal, setTaskModal] = useState(false);
    const [showUserModal, setUserModal] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        budget: '',
        dueDate: new Date(),
        description: '',
        status: 'Not Started',
    });
    const addUser = () => {
        console.log(hello);
    }
    const addTask = () => {
        console.log(hello);
    }
    console.log(props);
    if (props.flash.success) {
        alertify.set('notifier', 'position', 'top-right');
        (props.flash.success) ? alertify.success(props.flash.message) : alertify.error(props.flash.message)
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 classNameNameName="font-semibold text-xl text-gray-800 leading-tight">View Project</h2>}>

            <Head title="Projects" />
            <Tabs defaultActiveKey="Tasks" id="uncontrolled-tab-example" className="mb-3" >
                <Tab eventKey="Tasks" title="Tasks">
                    <TaskBoard project={props.project} users={props.users} auth={props.auth} />
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg dark:bg-gray-800 ">
                        <div className="flex justify-between items-center py-4 col-span-2 sm:col-span-3">
                            <div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 ">


                                <div className="flex flex-wrap w-full mb-1 flex-col items-start text-center">
                                    <Link href={`/projects/${props.project.id}/tasks/create`} className="shadow bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">Add Task</Link>
                                </div>
                                <button onClick={() => setUserModal(true)} className="shadow bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                                    Add a User
                                </button>
                            </div>
                            <label htmlFor="table-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="table-search-users"
                                    className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search for tasks"
                                />
                            </div>
                        </div>
                        {showUserModal ? (<AddUser onUserAddClick={addUser} data={data} setUserModal={() => setUserModal(false)}></AddUser>) : null}
                        {showTaskModal ? (<AddTask onTaskAddClick={addTask} data={data} setTaskModal={() => setTaskModal(false)}></AddTask>) : null}

                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-all-search"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="checkbox-all-search" className="sr-only">
                                                checkbox
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Title
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Status
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        View
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.project.tasks && props.project.tasks.map((task) => {
                                    return <>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4 w-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="checkbox-table-search-1"
                                                        type="checkbox"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                                        checkbox
                                                    </label>
                                                </div>
                                            </td>
                                            <th
                                                scope="row"
                                                className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <div className="pl-3">
                                                    <div className="font-normal text-gray-800">
                                                        {task.title}
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="py-4 px-6">{task.status}</td>
                                            <td className="py-4 px-6">{task.issue_type}</td>
                                            <td className="py-4 px-6">
                                                <Link href={`/projects/${props.project.id}/tasks/${task.id}`} >Open Task</Link>
                                            </td>
                                        </tr>

                                    </>
                                })}

                            </tbody>
                        </table>
                    </div>

                </Tab>
                <Tab eventKey="Settings" title="Setting">
                    <ProjectSettings project={props.project} users={props.users} />
                </Tab>
            </Tabs>
        </AuthenticatedLayout>
    )
}

export default ViewProject