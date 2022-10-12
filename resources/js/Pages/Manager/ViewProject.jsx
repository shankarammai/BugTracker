import React from 'react'

function ViewProject(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 classNameNameName="font-semibold text-xl text-gray-800 leading-tight">View Project</h2>}>
            
            <Head title="Projects" />

            <div>ViewProject</div>
            
        </AuthenticatedLayout>
    )
}

export default ViewProject