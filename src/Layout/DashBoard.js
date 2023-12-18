import React, { useState } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import { TiThMenuOutline } from 'react-icons/ti';

const DashBoard = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col justify-center">
                    <div className="min-h-screen bg-base-200 rounded">
                        <div className="pdf-profile hero-content flex-col lg:flex-row">
                            <label onClick={() => setOpen(!open)} htmlFor="dashboard-drawer" className="text-2xl drawer-button lg:hidden cursor-pointer absolute right-2">
                                {
                                    open ?
                                    <IoMdCloseCircle></IoMdCloseCircle>
                                    :
                                    <TiThMenuOutline></TiThMenuOutline>
                                }
                            </label>
                            <Outlet></Outlet>
                        </div>
                    </div>

                </div>
                <div className="drawer-side rounded mr-3 pt-16 md:pt-0">
                    <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <Link to='/dashboard/academic-info' className="btn btn-primary mb-4">Academic Information</Link>
                        <Link to='/dashboard/teacher-list' className="btn btn-primary mb-4">Teachers List</Link>
                        <Link to='/dashboard/student-list' className="btn btn-primary mb-4">Students List</Link>
                        <Link to='/dashboard/total-apply' className="btn btn-primary mb-4">Total Application</Link>
                        <Link to='/dashboard/add-teacher' className="btn btn-primary mb-4">Add Teacher</Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;