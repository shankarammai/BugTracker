import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import moment from 'moment';

export default function Dashboard(props) {
    console.log(props);
    let output = {};
    const sortedMessages = props.comments.reduce(function (results, comment) {
        var task_id = comment.task_id;
        if (!output[task_id]) {
            output[task_id] = {
                task: comment.task,
                comments: []
            }
            results.push(output[task_id]);
        }
        output[task_id].comments.push({ 'comment': comment, 'user': comment.user });
        return results;
    }, []);
    console.log(sortedMessages);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
            <Head title="Dashboard" />

            <section>
                <div className="container">
                    <div className="row">
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>{props.projects.length}</h3>
                                    <p>Total Projects</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-bag"></i>
                                </div>
                                <Link href="/projects" class="small-box-footer">View All <i class="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>


                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-success">
                                <div class="inner">

                                    {props.auth.user.role == 'Manager' &&
                                        <>
                                            <h3>{props.tasks.length || 0}</h3>
                                            <p>Total tasks</p>
                                        </>
                                    }

                                    {props.auth.user.role != 'Manager' &&
                                        <>
                                            <h3>{props.tasks.length || 0}</h3>
                                            <p>Total Assigned tasks</p>
                                        </>
                                    }

                                </div>
                                <div class="icon">
                                    <i class="ion ion-bag"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                    </div>

                    <div className="row">

                        {sortedMessages.map((item) => {
                            return <>
                                <div className="col-3 mr-2 mb-1 border border-success">
                                    <div className="row">
                                        <div className="mt-2 mb-3">
                                            <p> <strong> {item.task.title} </strong> </p>
                                        </div>
                                        {item.comments.map((comment) => {
                                            let fullname = comment.user.name.split(" ");
                                            let nameInitials = (fullname.length > 1) ? fullname.shift()[0] + fullname.pop()[0] : fullname.shift()[0];
                                            return <>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="bg-white comment-section border p-1 mt-2">
                                                            <div className="d-flex flex-row user">
                                                                <div style={{ "alignItems": "center", "display": "flex", "justifyContent": "center", "backgroundColor": "#d1d5db", "color": "#fff", "borderRadius": "50%", "height": "3rem", "width": "3rem" }}>{nameInitials}</div>
                                                                <div className="d-flex flex-column ml-2">
                                                                    <span className="name font-weight-bold">{comment.comment.user.name}</span>
                                                                    <span>{moment(comment.comment.created_at).format('HH:mm, MMM Do YYYY')}</span>
                                                                </div>
                                                            </div>
                                                            <div className="mt-1 p-1">
                                                                <p className="comment-content">{comment.comment.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        })}
                                    </div>
                                </div>

                            </>



                        })}
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
