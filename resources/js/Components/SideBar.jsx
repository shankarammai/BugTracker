import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";


export default function SideBar({ user }) {
    let fullname = user.name.split(" ");
    let nameInitials = (fullname.length > 1) ? fullname.shift()[0] + fullname.pop()[0] : fullname.shift()[0];
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <Link href="/dashboard" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="nav-link px-0 align-middle">
                            <i class="bi bi-motherboard-fill"></i> <span className="ms-1 d-none d-sm-inline">Projects</span>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div style={{ "alignItems": "center", "display": "flex", "justifyContent": "center", "backgroundColor": "#d1d5db", "color": "#fff", "borderRadius": "50%", "height": "3rem", "width": "3rem" }}>
                            {nameInitials}
                        </div>
                        <span className="d-none d-sm-inline mx-1">{user.name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        {user.role == 'Manager' &&
                            <li><Link className="dropdown-item" href="/projects/create">New project...</Link></li>
                        }
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><Link href={route('logout')} method="post" as="button" className="dropdown-item"> Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
