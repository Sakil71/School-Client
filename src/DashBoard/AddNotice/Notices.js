import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Notices = () => {
    const notices = useLoaderData();
    return (
        <div className='w-full'>
            <h1 className='text-xl font-bold text-rose-400 opacity-80 mb-10 text-center'>Notices</h1>
            {
                notices.map(notice => <div key={notice._id} className='mb-14'>
                    <h1 className='text-sm font-bold text-primary text-center '>{notice?.date}</h1>
                    <h1 className=' text-center text-sky-300 font-medium mb-4'>Class: {notice?.forClass}</h1>

                    <div className='border rounded p-4 mb-4'>
                        <h1 className='text-xl font-bold text-primary'>{notice?.subject}</h1>
                        <h1 className=''>{notice?.notice}</h1>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Notices;