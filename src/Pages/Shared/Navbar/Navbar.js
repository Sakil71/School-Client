import React, { useContext, useState } from 'react';
import { IoMdCloseCircle, IoMdNotifications } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { format } from 'date-fns';
import { TiThMenuOutline } from "react-icons/ti";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const handleOpen = () =>{
        setOpen(!open);
        navigate('/profile');
    }

    return (
        <div className="navbar bg-base-100 sticky top-0 z-40">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        <li>
                            <details>
                                <summary>Portal</summary>
                                <ul className="p-2">
                                    <li><Link>Students Portal</Link></li>
                                    <li><Link>Students Portal</Link></li>
                                    <li><Link>Students Portal</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        <li><Link to='/apply-admission'>Apply</Link></li>
                        {
                            !user?.uid &&
                            <li><Link to='/login'>Login</Link></li>
                        }
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl">ABC School</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                    <li>
                        <details>
                            <summary>Portal</summary>
                            <ul className="p-2">
                                <li><Link>Students Portal</Link></li>
                                <li><Link>Students Portal</Link></li>
                                <li><Link>Students Portal</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/apply-admission'>Apply</Link></li>
                    {
                        !user?.uid &&
                        <li><Link to='/login'>Login</Link></li>
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <span className='hidden md:block'>{format(new Date(), 'PP')}</span>

                <Link to='/dashboard/notices' title='Notices' className="btn btn-ghost btn-circle mx-5">
                    <div className="indicator">
                        <IoMdNotifications className='text-2xl'></IoMdNotifications>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </Link>

                {
                    user &&
                    <>
                        <Link to='/profile' className="btn btn-sm mr-4">
                            {user?.displayName?.split(' ')[0]}
                        </Link>
                        <label onClick={handleOpen} htmlFor="profile-drawer" className="text-2xl drawer-button lg:hidden cursor-pointer">
                            {
                                open ?
                                    <IoMdCloseCircle className='text-rose-500'></IoMdCloseCircle>
                                    :
                                    <TiThMenuOutline></TiThMenuOutline>
                            }
                        </label>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;