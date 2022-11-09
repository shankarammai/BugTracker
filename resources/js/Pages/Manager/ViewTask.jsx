import React, { useRef, useState } from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import InputError from '@/Components/InputError';
import alertify from 'alertifyjs';
alertify.set('notifier','position', 'top-right');

const animatedComponents = makeAnimated();
export default function ViewTask(props) {
    const assignedUsers = props.users.filter(user => props.task.assigned_to.includes(user.id))
        .map((user) => ({ 'value': user.id, 'label': user.email })) || [];
    const projectUsers = props.users.map((user) => ({ 'value': user.id, 'label': user.email })) || {};

    const { data, setData, put, processing, errors, transform } = useForm({
        title: props.task.title,
        priority: props.task.priority,
        issue_type: props.task.issue_type,
        status: props.task.status,
        hours_spent: props.task.hours_spent,
        content: props.task.content,
        assigned_to: assignedUsers,
    });

    const newComment = useRef();
    const [comments, setComments] = useState(props.task.comments);

    const addComment = () => {
        axios.post(`/projects/${props.project.id}/tasks/${props.task.id}/comments/`,
            { 'content': newComment.current.value })
            .then((response) => {
                if (response.data.success) {
                    setComments(response.data.task.comments);
                    newComment.current.value = "";
                    props.onCommentsUpdate(props.task.id,response.data.task);
                }
            }, (error) => {
                console.log(error);
            });
    }

    const deleteComment = (commentId, index) => {
        axios.delete(`/projects/${props.project.id}/tasks/${props.task.id}/comments/${commentId}`,
            { 'content': newComment.current.value })
            .then((response) => {
                if (response.data.success) {
                    setComments((prevComments) => prevComments.filter((comment, currentIndex) => index != currentIndex));
                    props.onCommentsUpdate(props.task.id,response.data.task);
                }
            }, (error) => {
                console.log(error);
                alertify.error(error);
            });
    }

    const deleteTask = () => {
        axios.delete(`/projects/${props.project.id}/tasks/${props.task.id}/`)
            .then((response) => {
                if (response.data.success) {
                    (response.data.success) ? alertify.success('Deleted') : alertify.error(response.data.message);
                    props.onTaskDelete(props.task.id);
                }
            }, (error) => {
                console.log(error);
                 alertify.error(error);

            });
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    transform((data) => ({
        ...data,
        assigned_to: data.assigned_to.map((item) => item.value)
    }));

    const update = (e) => {
        e.preventDefault();
        let assigned_to = data.assigned_to.map((item) => item.value);
        data.assigned_to = assigned_to;
        axios.put(`/projects/${props.project.id}/tasks/${props.task.id}`, data)
            .then((response) => {
                if (response.data.success) {
                    (response.data.success) ? alertify.success('Updated') : alertify.error(response.data.message);
                    props.onUpdate(props.task.id, response.data.data);
                }
            }, (error) => {
                console.log(error);
            });
    }
    return (
        <div className="container-fluid">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link href={`/projects/${props.project.id}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
                            {props.project.title}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{props.task.id}</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-12">
                    <div className="flex-col items-start py-1 pl-2 before:flex ">

                        <div className="row mb-4">
                            <p className="col-sm"> <strong>Created at </strong>{moment(props.task.created_at).format('MMM Do YYYY')}</p>
                            <p className="col-sm"> <strong>Updated at </strong>{moment(props.task.updated_at).format('MMM Do YYYY')}</p>
                            <span className="col-sm">
                                <button type="button" onClick={() => deleteTask()} class="btn btn-labeled btn-danger btn-sm float-end">
                                    <span class="btn-label"><i className="bi bi-trash"></i></span>Trash
                                </button>
                            </span>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input onChange={onHandleChange} value={data.title} type="text" name="title" id="title"
                                className="form-control form-control-light" placeholder="Title" required />
                            <InputError message={errors.title} className="mt-2" />

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Assign To</label>
                                    <Select defaultValue={assignedUsers} name="assigned_to" isMulti components={animatedComponents} options={projectUsers}
                                        onChange={(selected) => setData('assigned_to', selected)}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="issue_type" className="form-label">
                                        Issue type</label>
                                    <select name="issue_type" onChange={onHandleChange} value={data.issue_type} id="issue_type"
                                        className="form-control form-control-light">
                                        <option value="Task">New</option>
                                        <option value="Bug">Bug</option>
                                        <option value="Research">Research</option>
                                    </select>
                                    <InputError message={errors.issue_type} className="mt-2" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="priority" className="form-label">Priority</label>
                                    <select name="priority" onChange={onHandleChange} value={data.priority} id="priority"
                                        className="form-control form-control-light">
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select name="status" onChange={onHandleChange} value={data.status} id="status"
                                        className="form-control form-control-light">
                                        <option value="Backlog">Backlog</option>
                                        <option value="Development">Opened</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />

                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="hours_spent" className="form-label">Hours
                                        Spent</label>
                                    <input onChange={onHandleChange} value={data.hours_spent} type="number" name="hours_spent"
                                        id="hours_spent" className="form-control form-control-light" placeholder={10} required />
                                    <InputError message={errors.hours_spent} className="mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label for="description" className="form-label">Description</label>
                                    <ReactQuill className="h-64 mb-2" name="description" theme="snow" value={data.content}
                                        onChange={(desc) => setData('content', desc)} />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>
                            </div>
                        </div>


                        <div className="relative mt-6">
                            <button onClick={update} className="btn btn-primary rounded-pill mt-4">
                                {processing ? 'Please Wait' : 'Update Task'}
                            </button>
                        </div>



                        <div className="my-1 mb-2 flex-wrap">
                            <h2 className="h4">Add a new comment</h2>
                            <div className="mt-1">
                                <textarea ref={newComment} placeholder="Add a Comment" className="form-control">
                                </textarea>
                            </div>
                            <div className="mt-1">
                                <input type="button" onClick={addComment} className="mt-2 btn btn-secondary pill-rounded" value="Post Comment" />
                            </div>
                            {comments && comments.map((comment, index) => {
                                let fullname = comment.user.name.split(" ");
                                let nameInitials = (fullname.length > 1) ? fullname.shift()[0] + fullname.pop()[0] : fullname.shift()[0];

                                return <>
                                    <div className="container mt-2 border border-primary">
                                        <div className="d-flex justify-content-start row">
                                            <div className="col-md-12">
                                                <div className="bg-white comment-section">
                                                    <div className="d-flex flex-row user p-1">
                                                        <div style={{"alignItems":"center","display":"flex","justifyContent":"center","backgroundColor":"#d1d5db","color":"#fff","borderRadius":"50%","height":"3rem","width":"3rem"}}>{nameInitials}</div>
                                                        <div className="d-flex flex-column ml-2">
                                                            <span className="name font-weight-bold">{comment.user.name}</span>
                                                            <span>{moment(comment.created_at).format('HH:mm, MMM Do YYYY')}</span>
                                                        </div>
                                                        <div className="col">
                                                            
                                                            {comment.commented_by == props.auth.user.id &&
                                                            <button class="btn btn-sm btn-danger float-end" onClick={() => deleteComment(comment.id, index)}><i class="bi bi-trash-fill"></i></button>
                                                        }</div>
                                                    </div>
                                                    <div className="mt-1 p-1">
                                                        <p className="comment-content">{comment.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
