import React, { useState } from 'react'
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PrimaryButton from '@/Components/PrimaryButton';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-bootstrap/Modal';
import CreateTask from './CreateTask';
import Button from 'react-bootstrap/Button';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { NonceProvider } from 'react-select';
import { iteratee } from 'lodash';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import ViewTask from './ViewTask';

export default function TaskBoard({ project, users ,auth}) {
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [allTasks, setAllTasks] = useState(project.tasks);
    const [openedTask, setOpenedTask] = useState({});
    const [openedTaskModal, setOpenedTaskModal] = useState(false);


    const tasks_categorised = [
        {
            'id': 'Backlog',
            'name': 'Backlog',
            'items': allTasks.filter((task) => task.status == 'Backlog')
        },
        {
            'id': 'Development',
            'name': 'Development',
            'items': allTasks.filter((task) => task.status == 'Development')
        }, {
            'id': 'In Progress',
            'name': 'In Progress',
            'items': allTasks.filter((task) => task.status == 'In Progress')
        }, {
            'id': 'Done',
            'name': 'Done',
            'items': allTasks.filter((task) => task.status == 'Done')
        },

    ];

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        console.log(result);
    }

    const TaskClicked = (index, task) => { 
        console.log(index,task);
        setOpenedTask(task,
            setOpenedTaskModal(()=>true)
        );



    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    <h4 className="page-title">{project.title}
                        <button onClick={() => setAddTaskModal(true)} className="btn btn-success btn-sm ms-3">Add New</button>
                    </h4>
                </div>
                <div className="col-sm">
                    only my issues | recently added

                </div>
                <div className="col-sm">
                    <div className="input-group">
                        <input type="text" className="form-control dropdown-toggle" placeholder="Search Task..." id="top-search" />
                    </div>
                </div>
            </div>

            <div className="row">
                <DragDropContext onDragEnd={onDragEnd}>
                    {tasks_categorised.map(({ id, name, items }, index) => {
                        return <div key={id} className="col-3 items-center">
                            <h3><small class="text-muted">{name}</small>
                            </h3>
                            <div className="m-1">
                                {/* Dropabble container */}
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div className="p-3"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    minHeight: 500
                                                }} >

                                                {items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="card mb-1"
                                                                            onClick={()=>TaskClicked(index,item)}
                                                                    >
                                                                        <div className="card-body p-1">
                                                                            <small className="float-end text-muted">
                                                                                {moment(item.created_at).format('MMM Do YYYY')}
                                                                            </small>
                                                                            <span className={`badge ${item.priority == 'High' ? "bg-danger" : 'bg-secondary'}`}>{item.priority}</span>

                                                                            <p className="my-2">
                                                                                {item.title}
                                                                            </p>
                                                                            <p className="mb-0">
                                                                                <span className="text-nowrap mb-0 my-2">
                                                                                    <i class="bi bi-chat-left-text mr-1"></i>
                                                                                    <b>{item.comments.length}</b> Comments
                                                                                </span>

                                                                                <span className="text-nowrap mb-0 my-2 float-end">
                                                                                    <Dropdown>
                                                                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                                                           <i class="bi bi-three-dots-vertical"></i>
                                                                                        </Dropdown.Toggle>
                                                                                        <Dropdown.Menu>
                                                                                            <Dropdown.Item as="button">Delete</Dropdown.Item>
                                                                                            <Dropdown.Item href="#">Open</Dropdown.Item>
                                                                                            <Dropdown.Item href="#">Something else</Dropdown.Item>
                                                                                        </Dropdown.Menu>
                                                                                    </Dropdown>
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}



                                            </div>
                                        )
                                    }}
                                </Droppable>


                            </div>
                        </div>
                    })}
                </DragDropContext>


            </div>
            <div className="row">

            </div>
            <Modal size='lg' show={addTaskModal} onHide={() => setAddTaskModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateTask project={project} users={users} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => (setAddTaskModal(false))}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal size='lg' show={openedTaskModal} onHide={() => setOpenedTaskModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ViewTask task={openedTask} project={project} users={users} auth={auth} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpenedTaskModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
