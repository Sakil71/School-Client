import React, { useContext, useState } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { TiThMenuOutline } from 'react-icons/ti';
import useAdmin from '../Hooks/useAdmin/UseAdmin';
import { AuthContext } from '../AuthProvider/AuthProvider';

const DashBoard = () => {
    const [open, setOpen] = useState(false);
    const { user, setAdmissionClass } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    const applies = ["Six", "Seven", "Eight", "Nine", "Ten"];

    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setAdmissionClass(selectedValue);
        navigate(`/dashboard/student-list/${selectedValue}`);
    };

    return (
        <div> 
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col justify-center">
                    <div className="min-h-screen bg-base-200 rounded">
                        <div className="pdf-profile hero-content flex-col lg:flex-row" >
                            <label onClick={() => setOpen(!open)} htmlFor="dashboard-drawer" className="text-2xl drawer-button lg:hidden cursor-pointer absolute right-2 top-2 z-30">
                                {
                                    open ?
                                        <TiThMenuOutline></TiThMenuOutline>
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
                        {
                            isAdmin &&
                            <>
                                <select onChange={handleSelectChange} className="select select-primary mb-4 w-full font-bold bg-primary text-black text-center">
                                    <option selected className='hidden' value="">Students List</option>
                                    {
                                        applies.map((apply, i) => <option key={i} value={apply} className='font-bold'>
                                            {apply}
                                        </option>)
                                    }
                                </select>

                                <Link to='/dashboard/teacher-list' className="btn btn-primary mb-4">Teachers List</Link>
                                <Link to='/dashboard/users-list' className="btn btn-primary mb-4">Users List</Link>
                                <Link to='/dashboard/total-apply' className="btn btn-primary mb-4">Total Application</Link>
                                <Link to='/dashboard/add-teacher' className="btn btn-primary mb-4">Add Teacher</Link>
                                <Link to='/dashboard/add-notice' className="btn btn-primary mb-4">Add Notice</Link>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;