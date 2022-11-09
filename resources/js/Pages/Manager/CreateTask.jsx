import React  from 'react'
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import alertify from 'alertifyjs';



const animatedComponents = makeAnimated();

export default function CreateTask({ project, users,onCreateTask }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        priority: 'Low',
        issue_type: 'Task',
        status: 'Backlog',
        hours_spent: '',
        content: '',
        assigned_to: []
    });


    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        let assigned_to = data.assigned_to.map((item) => item.value);
        data.assigned_to = assigned_to;
        axios.post(`/projects/${project.id}/tasks`, data)
            .then((response) => {
            console.log(response.data);
            if (response.data.success) {
                (response.data.success) ? alertify.success('Created') : alertify.error(response.data.message);
                onCreateTask(response.data.data);
            }
        }, (error) => {
            console.log(error);
        });
    }

    const projectUsers = users.map((user) => ({ 'value': user.id, 'label': user.email }));
    return (
        <form class="p-2">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input onChange={onHandleChange} value={data.title} type="text" name="title" id="title"
                    class="form-control form-control-light" placeholder="Title" required />
                <InputError message={errors.title} className="mt-2" />

            </div>
            <div className="row">
                <div className="col-md-12">
                    <div class="mb-3">
                        <label class="form-label">Assign To</label>
                        <Select name="assigned_to" isMulti components={animatedComponents} options={projectUsers}
                            onChange={(selected) => setData('assigned_to', selected)}
                        />
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label htmlFor="issue_type" class="form-label">
                            Issue type</label>
                        <select name="issue_type" onChange={onHandleChange} value={data.issue_type} id="issue_type"
                            class="form-control form-control-light">
                            <option value="Task">New</option>
                            <option value="Bug">Bug</option>
                            <option value="Research">Research</option>
                        </select>
                        <InputError message={errors.issue_type} className="mt-2" />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label htmlFor="priority" class="form-label">Priority</label>
                        <select name="priority" onChange={onHandleChange} value={data.priority} id="priority"
                            class="form-control form-control-light">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <InputError message={errors.priority} className="mt-2" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label htmlFor="status" class="form-label">Status</label>
                        <select name="status" onChange={onHandleChange} value={data.status} id="status"
                            class="form-control form-control-light">
                            <option value="Backlog">Backlog</option>
                            <option value="Development">Opened</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />

                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label htmlFor="hours_spent" class="form-label">Hours
                            Spent</label>
                        <input onChange={onHandleChange} value={data.hours_spent} type="number" name="hours_spent"
                            id="hours_spent" class="form-control form-control-light" placeholder={10} required />
                        <InputError message={errors.hours_spent} className="mt-2" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <ReactQuill className="h-64 mb-2" name="description" theme="snow" value={data.content}
                            onChange={(desc) => setData('content', desc)} />
                        <InputError message={errors.content} className="mt-2" />
                    </div>
                </div>
            </div>


            <div className="relative my-4">
                <button onClick={submit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {processing ? 'Please Wait' : 'Create Task'}
                </button>
            </div>
        </form>

    )
}
