import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useLoaderData } from 'react-router-dom';

const TeacherDetails = () => {
    const teacher = useLoaderData();
    return (
        <div className='w-full flex gap-5 items-center'>
            <div>
                <PhotoProvider>
                    <PhotoView src={teacher?.photo}>
                        <img className='md:h-96 md:w-96 rounded' src={teacher?.photo} alt="" />
                    </PhotoView>
                </PhotoProvider>
            </div>
            <div className='whitespace-pre'>
                <small className='text-yellow-300 border border-yellow-300 px-1 rounded'>Teacher</small>
                <h1 className='text-4xl font-bold'>{teacher.name}</h1>
                <p className='text-lg font-bold'>Email:                    {teacher.email}</p>
                <p className='text-lg font-bold'>Group:                   {teacher?.group}</p>
                <p className={`text-lg font-bold`}>Subject:                 {teacher?.subject}</p>
                <p className={`text-lg font-bold`}>Qualification:        {teacher?.qualification}</p>
                <p className={`text-lg font-bold`}>Age:                       {teacher?.age}</p>
            </div>
        </div>
    );
};

export default TeacherDetails;