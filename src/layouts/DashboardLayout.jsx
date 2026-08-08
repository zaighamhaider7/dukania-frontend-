import "./DashboardLayout.css";
import React from 'react'
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


function DashboardLayout({ children }) {
    return (
        <>
            <Sidebar />

            <div className="main-content">
                <Topbar />

                {children}
            </div>
        </>
    )
}

export default DashboardLayout
