import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import SideBar from '@/Components/SideBar';


export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div classNameName="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700">
            <SideBar user={auth.user}></SideBar>
            <div class="h-full ml-14 mb-10 md:ml-64 bg-white" >
                <main className="ml-1">
                    {children}
                </main>
             </div>
        </div>
    );
}
