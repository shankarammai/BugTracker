import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export default function Projects(props) {
    if (props.success) {
        (props.success) ? alertify.success(props.message) : alertify.error(props.message)
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 classNameNameName="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />
            <section class="text-gray-600 body-font bg-white">
                <div class="container px-5 mx-auto">
                    <div class="flex flex-wrap w-full mb-1 flex-col items-start text-center">
                        <Link href='/projects/create' className=" my-1 top-2 left-1  text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create New Project</Link>
                    </div>
                    <div class="flex flex-wrap -m-4">
                        {props.projects.map((project) => {
                            return <>
                                <div class="xl:w-1/3 md:w-1/2 p-4">
                                    <div class="border border-gray-200 p-6 rounded-lg">
                                        <div class="mb-2">
                                            <p class="text-sm text-gray-600 flex items-center">{project.status}</p>
                                            <div class="text-gray-900 font-bold text-xl mb-2">{project.title}</div>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="text-sm">
                                                <p class="text-gray-900 leading-none">Budget {project.budget}</p>
                                                <p class="text-gray-600 mb-2"> Due Date {project.due_date}</p>
                                                <Link href={'/projects/' + project.id} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                    Read more
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        })
                        }
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    )
}
