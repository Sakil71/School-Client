import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useQuery } from 'react-query';
import Loading from '../../Pages/Components/Loading';

const Users = () => {
    const [loader, setLoader] = useState(false);

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://school-server-pink.vercel.app/users');
            const data = res.json();
            return data;
        }
    })
    refetch();
    if (isLoading) {
        return <Loading></Loading>
    }

    const makeAdmin = user => {
        const agree = window.confirm(`You want to admin - ${user?.name}`);
        if (agree) {
            setLoader(true);
            fetch(`https://school-server-pink.vercel.app/users/${user._id}`, {
                method: 'PATCH'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.modifiedCount > 0) {
                        setLoader(false);
                        toast.success(`${user.name} - admin added successful`);
                    }
                })
        }
    }

    const handleDelete = user =>{
        const agree = window.confirm(`You want to delete - ${user?.name}`);
        if(agree){
            setLoader(true);
            fetch(`https://school-server-pink.vercel.app/users/${user._id}`, {
                method : "DELETE"
            })
            .then(res => res.json())
            .then(data =>{
                toast.success(`${user.name} - successfully deleted`);
                setLoader(false);
            })
        }
    }
    return (
        <div className='w-full'>
            <h1 className=' text-3xl font-medium mb-5 text-center'>Users : {users.length}</h1>
            {
                users.map((user, i) => <div className='flex gap-5 mb-5 items-center justify-between px-5'>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-2xl font-bold'>{i + 1}.</h1>
                        <div>
                            <PhotoProvider>
                                <PhotoView src={user?.photo}>
                                    <img className='h-12 w-12 rounded-full' src={user?.photo} alt="" />
                                </PhotoView>
                            </PhotoProvider>
                        </div>
                        <div>
                            <div className='flex gap-4'>
                                <h1 className='text-xl font-medium'>{user?.name}</h1>
                                <small className='btn btn-xs text-primary text-xs'>Admin</small>
                            </div>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 text-xs'>
                        {
                            user?.role === 'admin' ?
                            ''
                            :
                            <button onClick={() => makeAdmin(user)} title={`${user?.name}`} className='btn btn-sm btn-outline btn-primary'>
                                {
                                    loader ?
                                        <span className="loading loading-spinner loading-md"></span>
                                        :
                                        'Make Admin'
                                }
                            </button>
                        }
                        <button onClick={()=> handleDelete(user)} disabled={loader === true} className='btn btn-sm btn-error'>Delete</button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Users;