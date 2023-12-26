import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useLoaderData } from 'react-router-dom';

const ApplyDetails = () => {
    const applyDetails = useLoaderData();

    return (
        <div className='w-full'>
            {
                applyDetails.map(details => <div key={details._id} className='flex flex-col md:flex-row gap-5 md:gap-10 items-center whitespace-pre'>
                    <div>
                        <PhotoProvider>
                            <PhotoView src={details?.photo}>
                                <img className='md:h-96 md:w-96 rounded' src={details?.photo} alt="" />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    <div>
                        <h1 className='text-4xl font-bold flex items-center gap-5 mb-4'>
                            {details.name}
                            {
                                details?.confirm &&
                                <small className='btn btn-primary btn-xs opacity-60'>{details?.confirm}</small>
                            }
                        </h1>
                        <p className='text-lg font-bold'>Email:                    {details.email}</p>
                        <p className='text-lg font-bold'>Class:                     {details.admissionClass}</p>

                        <p className={`${details.group === 'None' ? 'hidden' : 'block'} text-lg font-bold`}>Group:                   {details.group}</p>
                        <p className={`${details.optionalSubject === 'None' ? 'hidden' : 'block'} text-lg font-bold`}>Optional Subject: {details.optionalSubject}</p>

                        <p className='flex flex-col text-lg font-bold mb-10'>
                            <span>Father Name:        {details.fatherName}</span>
                            <span>Mother Name:      {details.motherName}</span>
                        </p>
                        <div className='mt-4'>
                            <h1 className='text-lg font-medium text-center divider'>Address</h1>
                            <p className='text-lg font-medium'><span className='opacity-70'>Village:                  </span> {details.village}</p>

                            <p className='text-lg font-medium'><span className='opacity-70'>Post Office:           </span> {details.postOffice}</p>

                            <p className='text-lg font-medium'><span className='opacity-70'>Thana:                   </span> {details.thana}</p>

                            <p className='text-lg font-medium'><span className='opacity-70'>District:                 </span> {details.district}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ApplyDetails;