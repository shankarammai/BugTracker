import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskBoard from '../CommonPages/TaskBoard';
import ProjectDetails from './ProjectDetails';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function ViewProject(props) {
    console.log(props);
    if (props.flash.success) {
        alertify.set('notifier', 'position', 'top-right');
        (props.flash.success) ? alertify.success(props.flash.message) : alertify.error(props.flash.message)
    }
    const [users, setUsers] = useState(props.users);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Project</h2>}>

            <Head title="Projects" />
            <Tabs defaultActiveKey="Tasks" id="uncontrolled-tab-example" className="mb-3" >
                <Tab eventKey="Tasks" title="Tasks">
                    <TaskBoard project={props.project} users={users} auth={props.auth} />
                     </Tab>
                <Tab eventKey="Project" title="Project Details">
                    <ProjectDetails project={props.project} users={users} />
                </Tab>
            </Tabs>
        </AuthenticatedLayout>
    )
}

export default ViewProject