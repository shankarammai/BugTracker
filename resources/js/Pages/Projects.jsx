import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Projects(props) {
    return (
              <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 classNameName="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <section>
                
                </section>


        </AuthenticatedLayout>
  )
}
