import React, { useState, useEffect } from 'react'
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
import moment from 'moment';
import ViewTask from './ViewTask';
import alertify from 'alertifyjs';
alertify.set('notifier', 'position', 'top-right');


export default function TaskBoard({ project, users, auth }) {
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [allTasks, setAllTasks] = useState(project.tasks);
    const [openedTask, setOpenedTask] = useState({});
    const [openedTaskModal, setOpenedTaskModal] = useState(false);
    const [tasks_categorised, setTaskCategorised] = useState([]);

    const [tasksToDisplay, setTasksToDisplay] = useState([...allTasks]);
    const [showOnlyMineToggle, setShowOnlyMineToggle] = useState(false);


    useEffect(() => {
        if (showOnlyMineToggle) {
            setTasksToDisplay((prev) =>
                prev.filter((task) => {
                    return task.assigned_to.includes(auth.user.id);
                }));
        }
        else {
            setTasksToDisplay((prev) => [...allTasks]);
        }
    }, [allTasks, showOnlyMineToggle])


    useEffect(() => {
        setTaskCategorised(
            [{
                'id': 'Backlog',
                'sortId': 1,
                'name': 'Backlog',
                'items': tasksToDisplay.filter((task) => task.status == 'Backlog')
            },
            {
                'id': 'Development',
                'sortId': 2,
                'name': 'Development',
                'items': tasksToDisplay.filter((task) => task.status == 'Development')
            }, {
                'id': 'In Progress',
                'sortId': 3,
                'name': 'In Progress',
                'items': tasksToDisplay.filter((task) => task.status == 'In Progress')
            }, {
                'id': 'Done',
                'sortId': 4,
                'name': 'Done',
                'items': tasksToDisplay.filter((task) => task.status == 'Done')
            }
            ]);

    }, [tasksToDisplay])

    const onUpdateFromChild = (taskId, data) => {
        setAllTasks((prevTasks) => [...prevTasks.filter((task) => task.id != taskId), data]);
        setOpenedTask(data);
    }

    const onCreateTaskFromChild = (task) => {
        setAllTasks((prevTasks) => [task, ...prevTasks]);
        setAddTaskModal(false);
        setOpenedTask(task);
        setOpenedTaskModal(true);
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId != destination.droppableId) {
            const sourceColumn = tasks_categorised.filter(item => item.id == source.droppableId)[0];
            const destinationColumn = tasks_categorised.filter(item => item.id == destination.droppableId)[0];
            //removing in action colums   
            let nonActionColumns = tasks_categorised.filter(item => (item.id != sourceColumn.id && item.id != destinationColumn.id));
            const sourceTasks = [...sourceColumn.items];
            const destinationTasks = [...destinationColumn.items];

            //remove the dragged item from source and add to destination
            const [draggedItem] = sourceTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, draggedItem);
            sourceColumn.items = sourceTasks;
            destinationColumn.items = destinationTasks;

            //st the new state of the tasks
            let newTaskCategorised = [...nonActionColumns, sourceColumn, destinationColumn];
            newTaskCategorised.sort((a, b) => a.sortId - b.sortId);
            setTaskCategorised(newTaskCategorised);

            //send request to the backend to update
            changeTaskStatus(result.draggableId, destination.droppableId);
        }

    }

    const changeTaskStatus = (taskId, status) => {
        axios.put(`/projects/${project.id}/tasks/${taskId}/`,
            { status })
            .then((response) => {
                (response.data.success) ? alertify.success('Status Changed') : alertify.error(response.data.message)
                onUpdateFromChild(taskId, response.data.data);
            }, (error) => {
                console.log(error);
                alertify.error(error);
            });
    }

    const TaskClicked = (index, task) => {
        setOpenedTask(task,
            setOpenedTaskModal(() => true)
        );
    }

    const showAssignedToMe = () => {
        setShowOnlyMineToggle(!showOnlyMineToggle);
    }

    const onTaskDeleteFromchild = (taskId) => {
        setAllTasks(allTasks.filter((task) => task.id != taskId));
        setOpenedTaskModal(() => false);
    }

    const onCommentsUpdate = (taskId, data) => {
        setAllTasks((prevTasks) => [...prevTasks.filter((task) => task.id != taskId), data]);
        setOpenedTask(data);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    <h4 className="page-title">{project.title}
                        <button onClick={() => setAddTaskModal(true)} className="btn btn-success btn-sm ms-3">Add New Task</button>
                    </h4>
                </div>
                <div className="col-sm">
                    <button onClick={showAssignedToMe} className={showOnlyMineToggle ? 'btn btn-secondary' : 'btn btn-light'}> Assigned to me</button> | recently added

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
                                                                        onClick={() => TaskClicked(index, item)}
                                                                    >
                                                                        <div className="card-body p-1">
                                                                            <small className="float-end text-muted">
                                                                                {moment(item.created_at).format('MMM Do YYYY')}
                                                                            </small>
                                                                            <span className={`badge ${item.priority == 'High' ? "bg-danger" : 'bg-secondary'}`}>{item.priority}</span>

                                                                            <p className="my-2">
                                                                                {item.title}
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
                    <CreateTask project={project} users={users} onCreateTask={onCreateTaskFromChild} />
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
                    <ViewTask task={openedTask} project={project} users={users} auth={auth} onUpdate={onUpdateFromChild} onTaskDelete={onTaskDeleteFromchild} onCommentsUpdate={onCommentsUpdate} />
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
