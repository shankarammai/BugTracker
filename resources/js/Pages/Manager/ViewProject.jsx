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
                     </Tab>
                <Tab eventKey="Settings" title="Settings">
                    <ProjectSettings project={props.project} users={props.users} />
                </Tab>
            </Tabs>
        </AuthenticatedLayout>
    )
}

export default ViewProject