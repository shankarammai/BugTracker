import React from 'react'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function AddTask({ onTaskAddClick, data,  setTaskModal }) {
    return (
        <div
            id="extralarge-modal"
            tabIndex={-1}
            aria-hidden="false"
            className="fixed bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20 top-0 left-0 flex items-center justify-center md:h-5/6"
        >
            <div className="relative w-full max-w-5xl h-full md:h-auto">
                <form action="#" className="relative rounded-lg shadow dark:bg-gray-100">
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add Task
                        </h3>
                        <button onClick={setTaskModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"  >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6 overflow-y-scroll">
                        <div className="grid">
                            <div className="col-span-12 sm:col-span-12 mt-2 mx-1">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input onChange={onHandleChange} value={data.title} type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required />
                            </div>
                            <div className="col-span-6 sm:col-span-6 mt-2 mx-1">
                                <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                                <select onChange={onHandleChange} value={data.priority} id="priority" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-span-6 mt-2 mx-1">
                                <label htmlFor="issue_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue type</label>
                                <select onChange={onHandleChange} value={data.status} id="status" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="Task">New</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Research">Research</option>
                                </select>
                            </div>
                            <div className="col-span-6 sm:col-span-6 mt-2 mx-1">
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select onChange={onHandleChange} value={data.status} id="status" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="New">New</option>
                                    <option value="Opened">Opened</option>
                                    <option value="In work">In work</option>
                                    <option value="Need feedback">Need feedback</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Realized">Realized</option>
                                    <option value="Rework">Rework</option>
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-6 mt-2 mx-1">
                                <label htmlFor="hours_spent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hours Spent</label>
                                <input onChange={onHandleChange} value={data.number} type="number" name="hours_spent" id="hours_spent" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={10} required />
                            </div>

                            <div className="col-span-12 sm:col-span-12 mt-2">
                                <label htmlFor="assignedto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button  onSubmit={submit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask