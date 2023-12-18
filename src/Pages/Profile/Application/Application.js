import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Loading from '../../Components/Loading';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import applyImage from '../../../assets/svg-image/undraw_voice_interface_re_206s.svg';

const Application = () => {
    const { user } = useContext(AuthContext);

    const { data: applications = [], isLoading } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch(`https://school-server-smoky.vercel.app/application/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    const { name, photo, email, admissionClass, group, optionalSubject, fatherName, motherName, village, thana, postOffice, district } = applications;


    return (
        <div className='w-full'>
            {
                !applications._id ?
                    <div className='flex flex-col items-center justify-center'>
                        <img className='w-96 mb-4' src={applyImage} alt="" />
                        <h1 className='text-2xl font-medium mb-5'>Please Apply</h1>
                        <Link to='/apply-admission' className='btn btn-primary px-10'>Apply Now <FaLongArrowAltRight></FaLongArrowAltRight></Link>
                    </div>
                    :
                    <div className='flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center whitespace-pre mb-20'>
                        <div>
                            <PhotoProvider>
                                <PhotoView src={photo}>
                                    <img className='md:h-96 md:w-96 rounded' src={photo} alt="" />
                                </PhotoView>
                            </PhotoProvider>
                        </div>
                        <div>
                            <h1 className='text-4xl font-bold'>{name}</h1>
                            <p className='text-lg font-bold'>Email:                    {email}</p>
                            <p className='text-lg font-bold'>Class:                     {admissionClass}</p>

                            <p className={`${group === 'None' ? 'hidden' : 'block'} text-lg font-bold`}>Group:                   {group}</p>
                            <p className={`${optionalSubject === 'None' ? 'hidden' : 'block'} text-lg font-bold`}>Optional Subject: {optionalSubject}</p>

                            <p className='flex flex-col text-lg font-bold mb-10'>
                                <span>Father Name:        {fatherName}</span>
                                <span>Mother Name:      {motherName}</span>
                            </p>
                            <div className='mt-4'>
                                <h1 className='text-lg font-medium text-center divider'>Address</h1>
                                <p className='text-lg font-medium'><span className='opacity-70'>Village:                  </span> {village}</p>

                                <p className='text-lg font-medium'><span className='opacity-70'>Post Office:           </span> {postOffice}</p>

                                <p className='text-lg font-medium'><span className='opacity-70'>Thana:                   </span> {thana}</p>

                                <p className='text-lg font-medium'><span className='opacity-70'>District:                 </span> {district}</p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Application;