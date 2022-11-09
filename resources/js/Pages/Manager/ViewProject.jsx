import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskBoard from './TaskBoard';
import ProjectSettings from './ProjectSettings';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function ViewProject(props) {
    console.log(props);
    if (props.flash.success) {
        alertify.set('notifier', 'position', 'top-right');
        (props.flash.success) ? alertify.success(props.flash.message) : alertify.error(props.flash.message)
    }
    const [users, setUsers] = useState(props.users);

    const onUserAdded = (newUser) => {
        setUsers((prev) => [...prev, newUser]);
    }

    const onUserDeleted = (userId) => { 
        setUsers((prev) => prev.filter(user => user.id != userId));
    }

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
                <Tab eventKey="Settings" title="Settings">
                    <ProjectSettings project={props.project} users={users} onUserAdded={onUserAdded} onUserDeleted={onUserDeleted} />
                </Tab>
            </Tabs>
        </AuthenticatedLayout>
    )
}

export default ViewProject