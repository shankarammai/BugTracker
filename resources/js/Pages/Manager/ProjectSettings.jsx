import React from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';

export default function ProjectSettings({ project, users }) {

    const { data, setData, put, processing, errors } = useForm({
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
    return (
        <section className="text-gray-600 body-font relative">
            <form onSubmit={submit}>
                <div className="container px-5 pt-2 mx-auto flex">
                    <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <div className="relative mb-4">
                            <label for="title" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title</label>
                            <input onChange={onHandleChange} value={data.title} type="text" id="title" name="title" className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out focus:bg-white" />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div className="relative mb-4">
                            <label for="budget" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Budget</label>
                            <input onChange={onHandleChange} type="number" value={data.budget} id="budget" name="budget" className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out focus:bg-white" />
                            <InputError message={errors.budget} className="mt-2" />
                        </div>
                        <div className="relative mb-4">
                            <label for="dueDate" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Due Date</label>
                            <DatePicker name="dueDate" locale="en-GB" showTimeSelect selected={data.dueDate} onChange={(date) => setData('dueDate', date)} timeFormat="p" timeIntervals={15} dateFormat="Pp" className="bg-gray-200" />
                            <InputError message={errors.dueDate} className="mt-2" />
                        </div>
                        <div className="relative mb-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="status">Status </label>
                            <select onChange={onHandleChange} value={data.status} name="status" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:bg-white" id="grid-state">
                                <option value="Not Started">Not Started</option>
                                <option value="Started">Started</option>
                                <option value="On Progress">On Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>

                        <div className="relative mb-8">
                            <label for="description" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
                            <ReactQuill className="h-64 mb-2 bg-gray-200 focus:bg-white" name="description" theme="snow" value={data.description} onChange={(desc) => setData('description', desc)} />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <div className="relative mt-2">
                            <PrimaryButton processing={processing} className="shadow py-2 px-2 bg-green-400 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                {processing ? 'Please Wait' : 'Save Changes'}</PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}
