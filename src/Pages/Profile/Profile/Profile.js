import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import { FaFileDownload } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Profile = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);

    const handleLOgout = () => {
        setLoader(true);
        logoutUser()
            .then(() => { setLoader(false)})
            .catch(() => { setLoader(false)})
    }

    const downloadPdf = () => {
        const capture = document.querySelector('.pdf-profile');
        setLoader(true);
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save(`${user?.name}.pdf`);
        })
    }

    return (

        <div className="drawer lg:drawer-open">
            <input id="profile-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <div className="min-h-screen hero bg-base-200 rounded">
                    <div className="pdf-profile hero-content flex-col lg:flex-row">
                        <PhotoProvider>
                            <PhotoView src={user?.photoURL}>
                                <img src={user?.photoURL} className="h-96 rounded-lg shadow-2xl cursor-pointer" alt='' />
                            </PhotoView>
                        </PhotoProvider>
                        <div>
                            <h1 className="text-5xl font-bold">{user?.displayName}</h1>
                            <p className="py-6">{user?.email}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="drawer-side rounded mr-3">
                <label htmlFor="profile-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                    <button onClick={downloadPdf} disabled={!(loader === false)} className='w-full btn mb-4 btn-primary' title='Download your profile'>
                        {
                            loader ?
                                <>Downloading <span className="loading loading-spinner loading-md"></span></>
                                :
                                <>Download <FaFileDownload></FaFileDownload></>
                        }
                    </button>

                    <Link to='/edit-profile' className="btn btn-primary mb-4">Edit Your Profile</Link>
                    <Link to='/application' className="btn btn-primary mb-4">Your Application</Link>

                    <div className='my-5'>
                        <button onClick={handleLOgout} className='text-xs hover:text-black text-white bg-red-700 font-bold hover:bg-rose-700 w-full btn'>Logout</button>
                    </div>
                </ul>

            </div>
        </div>
    );
};

export default Profile;