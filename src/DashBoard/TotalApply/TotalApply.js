import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Pages/Components/Loading';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const TotalApply = () => {
    const { data: applyData = [], isLoading, refetch } = useQuery({
        queryKey: ['apply'],
        queryFn: async () => {
            const res = await fetch('https://school-server-pink.vercel.app/apply');
            const data = await res.json();
            return data;
        }
    })

    refetch();

    if (isLoading) {
        return <Loading></Loading>
    }


    const handleDelete = apply => {
        fetch(`https://school-server-pink.vercel.app/apply/${apply?._id}`, {
            method : "DELETE"
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                toast.success(`${apply.name} - deleted successful`);
            }
        })
    }

    return (
        <div className='w-full'>
            <h1 className='text-center font-medium text-2xl mb-5 opacity-80'>Total {applyData.length > 1 ? 'Applications' : 'Application'} : {applyData.length}</h1>

            <div>
                {
                    applyData.map((apply, i) => <div key={apply._id} className='flex items-center justify-between gap-4 my-4'>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-2xl font-bold'>{i + 1}.</h1>
                            <div>
                                <PhotoProvider>
                                    <PhotoView src={apply?.photo}>
                                        <img src={apply?.photo} className="h-20 w-20 rounded-lg shadow-2xl cursor-pointer" alt='' />
                                    </PhotoView>
                                </PhotoProvider>
                            </div>
                            <Link to={`/dashboard/apply-details/${apply._id}`}>
                                <h1 className='text-2xl font-bold'>{apply?.name}</h1>
                                <p className='p-0 font-medium'>Class: {apply?.admissionClass}</p>
                                <p className={`p-0 font-medium ${apply.group === "None" ? 'hidden' : 'block'}`}> Group: {apply?.group}</p>
                            </Link>
                        </div>

                        <div>
                            <button className='btn btn-sm text-xs btn-success mr-4'>Confirm</button>
                            <button onClick={() => handleDelete(apply)} className='btn btn-sm text-xs btn-error'>Delete</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TotalApply;