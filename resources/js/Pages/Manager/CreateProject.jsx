import React from 'react';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';


export default function CreateProject(props) {

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    budget: '',
    dueDate: new Date(),
    description: '',
    status: 'Not Started',
  });
  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post('/projects');
  };
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 classNameNameName="font-semibold text-xl text-gray-800 leading-tight">Create Project</h2>}
    >
      <Head title="Create Project" />
      <section className="text-gray-600 body-font relative">
        <form onSubmit={submit}>
          <div className="container px-5 pt-2 mx-auto flex">
            <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <p class="h3">Enter Project Details</p>
              <div className="relative mb-4">
                <label for="title" className="form-label">Title</label>
                <input onChange={onHandleChange} value={data.title} type="text" id="title" name="title" className="form-control form-control-light" />
                <InputError message={errors.title} className="mt-2" />
              </div>
              <div className="relative mb-4">
                <label for="budget" className="form-label">Budget</label>
                <input onChange={onHandleChange} type="number" value={data.budget} id="budget" name="budget" className="form-control form-control-light" />
                <InputError message={errors.budget} className="mt-2" />
              </div>
              <div className="relative mb-4">
                <label for="dueDate" className="form-label">Due Date</label>
                <DatePicker name="dueDate" locale="en-GB" showTimeSelect selected={data.dueDate} onChange={(date) => setData('dueDate', date)} timeFormat="p" timeIntervals={15} dateFormat="Pp" />
                <InputError message={errors.dueDate} className="mt-2" />
              </div>
              <div className="relative mb-4">
                <label className="form-label" for="status">Status </label>
                <select onChange={onHandleChange} value={data.status} name="status" className="form-control form-control-light" id="grid-state">
                  <option value="Not Started">Not Started</option>
                  <option value="Started">Started</option>
                  <option value="On Progress">On Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="relative mb-8">
                <label for="description" className="form-label">Description</label>
                <ReactQuill className="h-64 mb-2" name="description" theme="snow" value={data.description} onChange={(desc) => setData('description', desc)} />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="relative mt-2">
                <PrimaryButton processing={processing} className="btn btn-primary rounded">
                  {processing ? 'Please Wait' : 'Create Project'}</PrimaryButton>
              </div>
            </div>
          </div>
        </form>
      </section>
    </AuthenticatedLayout>
  )
}
