import React, { useRef, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

export default function ViewTask(props) {
    console.log(props);

    const newComment = useRef();
    const [comments, setComments] = useState(props.comments);

    const addComment = () => {
        axios.post(`/projects/${props.project.id}/tasks/${props.task.id}/comments/`,
            { 'content': newComment.current.value })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    let newData = [response.data.comment, ...comments]
                    setComments(newData);
                }


            }, (error) => {
                console.log(error);
            });
    }

    const deleteComment = (commentId, index) => {
        axios.delete(`/projects/${props.project.id}/tasks/${props.task.id}/comments/${commentId}`,
            { 'content': newComment.current.value })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    let previousComments = comments;
                    previousComments.splice(index, 1);
                    setComments(previousComments);
                }
            }, (error) => {
                console.log(error);
            });
    }
    console.log(props);
    return (
        <div className="container-fluid">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li class="breadcrumb-item">
                        <Link href={`/projects/${props.project.id}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
                            {props.project.title}</Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{props.task.id}</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-8">
                    <div className="flex-col items-start py-1 pl-2 before:flex ">
                        <span className="rounded bg-indigo-50 py-1 px-2 text-xs font-medium tracking-widest text-indigo-500 before:inline-block">{props.task.priority}</span>
                        <ReactQuill className="h-64 mb-2 " name="description" theme="snow" value={props.task.content} onChange={(desc) => setData('content', desc)} />

                        <div className="-mx-3 mb-6 flex-wrap">
                            {props.task.comments && props.task.comments.map((comment, index) => {
                                return <>
                                    <div class="p-6 mb-6 text-base bg-gray-200 rounded-lg">
                                        <div class="flex justify-between items-center mb-2">
                                            <div class="flex items-center">
                                                <p class="inline-flex items-center mr-3 text-sm text-blue-700 white">
                                                    <img class="mr-2 w-6 h-6 rounded-full" src="https://www.gravatar.com/avatar/HASH" alt={comment.user.name} />{comment.user.name}
                                                </p>
                                                <p class="text-sm text-gray-800 dark:text-gray-800"><time pubdate="" datetime="2022-02-08" title={moment(comment.created_at).format('MMM Do YYYY')}>
                                                    {moment(comment.created_at).format('MMM Do YYYY')}</time></p>
                                            </div>

                                            {comment.commented_by == props.auth.user.id &&
                                                <button onClick={() => deleteComment(comment.id, index)} class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-red-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                                                    <svg class="w-5 h-5" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            }

                                        </div>
                                        <p class="text-gray-600 dark:text-gray-600">
                                            {comment.content}
                                        </p>
                                    </div>

                                    {/* <div className="relative grid grid-cols-1 gap-4 p-2 mb-2 mt-8 border rounded-lg bg-gray-100 shadow-lg">
                                        <div className="relative flex gap-4">
                                            <div className="flex flex-col w-full">
                                                <div className="flex flex-row justify-between">
                                                    <p className="text-gray-900 text-sm">{comment.user.name}</p>                                                        </div>
                                                <p className="text-gray-400 text-sm">{comment.created_at}</p>
                                            </div>
                                        </div>
                                        <p className="-mt-4 text-gray-500">{comment.content}</p>
                                        {comment.commented_by == props.auth.user.id && <button onClick={() => deleteComment(comment.id, index)}>delete</button>}

                                    </div> */}
                                </>
                            })}
                            <h2 className="pt-3 pb-2 text-lg text-gray-800 before:px-4">Add a new comment</h2>
                            <div className="mt-2 w-full px-3 before:mb-2">
                                <textarea ref={newComment} placeholder="Add a Comment" class="text-xs rounded border border-gray-500 py-2 px-2 w-full">
                                </textarea>
                            </div>
                            <div className="w-full items-end px-3 before:flex">
                                <input type="button" onClick={addComment} className="rounded-lg border border-gray-400 bg-white py-1 px-4 font-medium tracking-wide text-gray-700 before:mr-1 hover:bg-gray-100" value="Post Comment" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    bb
                </div>
            </div>

        </div>
        // <section className="before:body-font text-gray-600">
        //     <div className="container mx-auto py-4">
        //         <nav className="flex rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700" aria-label="Breadcrumb">
        //             <ol className="inline-flex items-center space-x-1 md:space-x-3">
        //                 <li className="inline-flex items-center">
        // <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
        //     <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        //     </svg>
        //     Home
        // </Link>
        //                 </li>
        //                 <li>
        //                     <div className="flex items-center">
        //                         <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        //                             <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        //                         </svg>
        // <Link href={`/projects/${props.project.id}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
        //     {props.project.title}</Link>
        //                     </div>
        //                 </li>
        //                 <li aria-current="page">
        //                     <div className="flex items-center">
        //                         <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        //                             <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        //                         </svg>
        //                         <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">{props.task.title}</span>
        //                     </div>
        //                 </li>
        //             </ol>
        //         </nav>
        //         <div className="container mx-auto px-5 py-2">
        //             <div className="-mt-4 ml-8 items-start before:flex">
        //                 <h1 className="before:title-font mt-6 text-2xl font-medium text-gray-900 sm:text-3xl">{props.task.title}</h1>
        //             </div>
        //             <div className="mt-1 mb-4 ml-8 items-start before:flex"><button type="button" className="mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white before:mr-2 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></div>
        //             <div className="-m-4 flex flex-wrap">
        //                 <div className="flex-col items-start py-10 pl-12 before:flex md:w-3/5">
        //                     <span className="rounded bg-indigo-50 py-1 px-2 text-xs font-medium tracking-widest text-indigo-500 before:inline-block">CATEGORY</span>
        //                     <ReactQuill className="h-64 mb-2 " name="description" theme="snow" value={props.task.content} onChange={(desc) => setData('content', desc)} />

        //                     <div className="-mx-3 mb-6 flex-wrap">
        //                         {props.task.comments && props.task.comments.map((comment, index) => {
        //                             return <>

        //                                 <div className="relative grid grid-cols-1 gap-4 p-2 mb-2 mt-8 border rounded-lg bg-gray-100 shadow-lg">
        //                                     <div className="relative flex gap-4">
        //                                         <div className="flex flex-col w-full">
        //                                             <div className="flex flex-row justify-between">
        //                                                 <p className="text-gray-900 text-sm">{comment.user.name}</p>                                                        </div>
        //                                             <p className="text-gray-400 text-sm">{comment.created_at}</p>
        //                                         </div>
        //                                     </div>
        //                                     <p className="-mt-4 text-gray-500">{comment.content}</p>
        //                                     {comment.commented_by == props.auth.user.id && <button onClick={() => deleteComment(comment.id, index)}>delete</button>}

        //                                 </div>
        //                             </>
        //                         })}
        //                         <h2 className="pt-3 pb-2 text-lg text-gray-800 before:px-4">Add a new comment</h2>
        //                         <div className="mt-2 w-full px-3 before:mb-2">
        //                             <textarea ref={newComment} placeholder="Add a Comment" class="text-xs rounded border border-gray-500 py-2 px-2 w-full">
        //                             </textarea>
        //                         </div>
        //                         <div className="w-full items-end px-3 before:flex">
        //                             <input type="button" onClick={addComment} className="rounded-lg border border-gray-400 bg-white py-1 px-4 font-medium tracking-wide text-gray-700 before:mr-1 hover:bg-gray-100" value="Post Comment" />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="flex-col items-start py-10 pl-12 before:flex md:w-2/5">
        //                     <span class="flex-grow flex flex-col pl-4">
        //                         <span class="title-font font-medium text-gray-900">Created At</span>
        //                         <span class="text-gray-500 text-sm">{props.task.created_at}</span>
        //                     </span>
        //                     <span class="flex-grow flex flex-col pl-4">
        //                         <span class="title-font font-medium text-gray-900">Updated At</span>
        //                         <span class="text-gray-500 text-sm">{props.task.created_at}</span>
        //                     </span>
        //                     <span class="flex-grow flex flex-col pl-4">
        //                         <span class="title-font font-medium text-gray-900">Assigned To</span>

        //                         <span class="text-gray-500 text-sm">{props.task.created_at}</span>
        //                     </span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
}
