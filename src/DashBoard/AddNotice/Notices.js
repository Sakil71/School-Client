import React, { useContext } from 'react';
import useAdmin from '../../Hooks/useAdmin/UseAdmin';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

const Notices = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    const { data: notices = [], refetch } = useQuery({
        queryKey: ['notices'],
        queryFn: async () => {
            const res = await fetch('https://school-server-pink.vercel.app/notices');
            const data = await res.json();
            return data;
        }
    })
    refetch();

    const handleDelete = notice => {
        const agree = window.confirm(`You want to delete - ${notice.subject}`);
        if (agree) {
            fetch(`https://school-server-pink.vercel.app/notices/${notice._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success(`${notice.subject} - successfully deleted`);
                    }
                })
        }
    }

    return (
        <div className='w-full'>
            <h1 className='text-xl font-bold text-primary opacity-80 mb-10 text-center'>Notices</h1>
            {
                notices.map(notice => <div key={notice._id} className='mb-14 bg-indigo-950 p-5 rounded'>
                    <h1 className='text-sm font-bold text-primary text-center divider'>{notice?.date}</h1>
                    <h1 className=' text-center text-yellow-300 font-medium mb-4'>Class: {notice?.forClass}</h1>

                    <div className='mb-4'>
                        <h1 className='text-xl font-bold text-primary'>{notice?.subject}</h1>
                        <h1 className=''>{notice?.notice}</h1>
                    </div>
                    {
                        isAdmin &&
                        <div className='flex justify-end'>
                            <button onClick={() => handleDelete(notice)} className='btn btn-sm btn-error text-xs'>Delete</button>
                        </div>
                    }

                </div>)
            }
            <div className='text-center'>
                <button className='btn btn-sm btn-primary'>See More</button>
            </div>
        </div>
    );
};

export default Notices;