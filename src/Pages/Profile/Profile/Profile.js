import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">

                <PhotoProvider>
                    <PhotoView src={user?.photoURL}>
                        <img src={user?.photoURL} className="h-96 rounded-lg shadow-2xl cursor-pointer" alt='' />
                    </PhotoView>
                </PhotoProvider>
                <div>
                    <h1 className="text-5xl font-bold">{user?.displayName}</h1>
                    <p className="py-6">{user?.email}</p>
                    <Link to='/edit-profile' className="btn btn-primary">Edit Your Profile</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;