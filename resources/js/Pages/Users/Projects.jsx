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
                    <div class="d-flex justify-content-start mt-2">
                        {props.projects.map((project) => {
                            return <>
                                <div class="card ml-2 mr-2 d-flex align-items-start">
                                    <div class="card-body">
                                        <h4 class="card-title">{project.title}</h4> <br /> 
                                        <p class="card-text">
                                        <h6 class="mb-2 text-muted">{project.status}</h6>
                                            <p> Budget: {project.budget}</p>
                                            <p>Due Date: {project.due_date}</p>                                        
                                        </p>
                                        <Link href={'/projects/' + project.id} className='btn btn-primary'> Read More </Link>
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
