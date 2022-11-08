import React from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import AddUser from './AddUser';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function ProjectSettings({ project, users, }) {


    const [addUserModal, setAddUserModal] = useState(false);

    const { data, setData, put, processing, errors, transform } = useForm({
        title: project.title,
        budget: project.budget,
        dueDate: new Date(project.due_date),
        description: project.description,
        status: project.status,
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        put(`/projects/${project.id}`);
    };
    const searchForUsers = (e) => {
        console.log(e);
        axios.post('/users/searchUsers',
            { searchEmail: e.target.value })
            .then((response) => {
                console.log(response.data)
                setProjectUsers(response.data.map((user) => ({ 'value': user.id, 'label': user.email })));
            }, (error) => {
                return (error);
            });
    }

    return (
        <section className="text-gray-600 body-font relative">
            <button onClick={() => setAddUserModal(true)} className="btn btn-success btn-sm ms-3">Add a User</button>
            <form onSubmit={submit}>
                <div className="container px-5 pt-2 mx-auto flex">
                    <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <div className="relative mb-4">
                            <label for="title" className="form-label text-uppercase font-weight-bold">Title</label>
                            <input onChange={onHandleChange} value={data.title} type="text" id="title" name="title" className="form-control form-control-light" />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div className="relative mb-4">
                            <label for="budget" className="form-label text-uppercase font-weight-bold">Budget</label>
                            <input onChange={onHandleChange} type="number" value={data.budget} id="budget" name="budget" className="form-control form-control-light" />
                            <InputError message={errors.budget} className="mt-2" />
                        </div>
                        <div className="relative mb-4">
                            <label for="dueDate" className="form-label text-uppercase font-weight-bold">Due Date</label>
                            <DatePicker name="dueDate" locale="en-GB" showTimeSelect selected={data.dueDate} onChange={(date) => setData('dueDate', date)} timeFormat="p" timeIntervals={15} dateFormat="Pp" className="form-control form-control-light" />
                            <InputError message={errors.dueDate} className="mt-2" />
                        </div>
                        <div className="relative mb-4">
                            <label className="form-label text-uppercase font-weight-bold" for="status">Status </label>
                            <select onChange={onHandleChange} value={data.status} name="status" className="form-control form-control-light" id="grid-state">
                                <option value="Not Started">Not Started</option>
                                <option value="Started">Started</option>
                                <option value="On Progress">On Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>

                        <div className="relative mb-8">
                            <label for="description" className="form-label text-uppercase font-weight-bold">Description</label>
                            <ReactQuill className="h-64 mb-2 form-control-light" name="description" theme="snow" value={data.description} onChange={(desc) => setData('description', desc)} />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div className="relative mt-2">
                            <PrimaryButton processing={processing} className="btn btn-success rounded">
                                {processing ? 'Please Wait' : 'Save Changes'}</PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
            <Modal size='lg' show={addUserModal} onHide={() => setAddUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddUser users={users} project={project}></AddUser>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => (setAddUserModal(false))}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </section>
    )
}
