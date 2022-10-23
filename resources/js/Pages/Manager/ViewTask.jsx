import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ViewTask(props) {
    console.log(props);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Task</h2>}>
            <Head title="View Task" />

            <section className="before:body-font text-gray-600">
                <div className="container mx-auto py-4">
                    <nav className="flex rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <Link href={`/projects/${props.project.id}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
                                        {props.project.title}</Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">{props.task.title}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="container mx-auto px-5 py-2">
                        <div className="-mt-4 ml-8 items-start before:flex">
                            <h1 className="before:title-font mt-6 text-2xl font-medium text-gray-900 sm:text-3xl">{props.task.title}</h1>
                        </div>
                        <div className="mt-1 mb-4 ml-8 items-start before:flex"><button type="button" className="mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white before:mr-2 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></div>
                        <div className="-m-4 flex flex-wrap">
                            <div className="flex-col items-start py-10 pl-12 before:flex md:w-3/5">
                                <span className="rounded bg-indigo-50 py-1 px-2 text-xs font-medium tracking-widest text-indigo-500 before:inline-block">CATEGORY</span>
                                <ReactQuill className="h-64 mb-2 " name="description" theme="snow" value={props.task.content} onChange={(desc) => setData('content', desc)} />

                                <div className="-mx-3 mb-6 flex-wrap">
                                    {props.comments && props.comments.map((comment) => {
                                        return <>

                                            <div className="relative grid grid-cols-1 gap-4 p-2 mb-2 mt-8 border rounded-lg bg-gray-100 shadow-lg">
                                                <div className="relative flex gap-4">
                                                    <div className="flex flex-col w-full">
                                                        <div className="flex flex-row justify-between">
                                                            <p className="text-gray-900 text-sm">{comment.user.name}</p>                                                        </div>
                                                        <p className="text-gray-400 text-sm">{comment.created_at}</p>
                                                    </div>
                                                </div>
                                                <p className="-mt-4 text-gray-500">{comment.content}</p>
                                            </div>
                                        </>
                                    })}
                                    <h2 className="pt-3 pb-2 text-lg text-gray-800 before:px-4">Add a new comment</h2>
                                    <div className="mt-2 w-full px-3 before:mb-2">
                                        <textarea placeholder="Add a Comment" class="text-xs rounded border border-gray-500 py-2 px-2 w-full">
                                        </textarea>
                                    </div>
                                    <div className="w-full items-end px-3 before:flex">
                                        <input type="submit" className="rounded-lg border border-gray-400 bg-white py-1 px-4 font-medium tracking-wide text-gray-700 before:mr-1 hover:bg-gray-100" value="Post Comment" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col items-start py-10 pl-12 before:flex md:w-2/5">
                                <span class="flex-grow flex flex-col pl-4">
                                    <span class="title-font font-medium text-gray-900">Created At</span>
                                    <span class="text-gray-500 text-sm">{props.task.created_at}</span>
                                </span>
                                <span class="flex-grow flex flex-col pl-4">
                                    <span class="title-font font-medium text-gray-900">Updated At</span>
                                    <span class="text-gray-500 text-sm">{props.task.created_at}</span>
                                </span>
                                <span class="flex-grow flex flex-col pl-4">
                                    <span class="title-font font-medium text-gray-900">Assigned To</span>

                                    <span class="text-gray-500 text-sm">{props.task.created_at}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </AuthenticatedLayout>
    );
}
