import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head ,Link } from '@inertiajs/inertia-react';

export default function Tasks(props) {
    console.log(props);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}>
            <Head title="Dashboard" />

            <section>
                View All Tasks Admin
            </section>
        </AuthenticatedLayout>
    );
}
