import React from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../../Pages/Components/Loading';

const AllTeacher = () => {
    const { data: teachers = [], isLoading, refetch } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const res = await fetch('https://school-server-pink.vercel.app/teacher');
            const data = res.json();
            return data;
        }
    })

    refetch();
    if(isLoading){
        return <Loading></Loading>
    }

    const handleDelete = teacher => {
        fetch(`https://school-server-pink.vercel.app/teacher/${teacher?._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`${teacher.name} - deleted successful`);
                }
            })
    }
    return (
        <div className='w-full'>
            <h1 className='text-center font-medium text-2xl mb-5 opacity-80'>Total {teachers.length > 1 ? 'Teachers' : 'Teacher'} : {teachers.length}</h1>

            <div>
                {
                    teachers.map((teacher, i) => <div key={teacher._id} className='flex items-center justify-between gap-4 my-4'>
                        <div className='flex items-center gap-4'>
                            <h1 className='text-2xl font-bold'>{i + 1}.</h1>
                            <div>
                                <PhotoProvider>
                                    <PhotoView src={teacher?.photo}>
                                        <img src={teacher?.photo} className="h-20 w-20 rounded-lg shadow-2xl cursor-pointer" alt='' />
                                    </PhotoView>
                                </PhotoProvider>
                            </div>
                            <Link to={`/dashboard/teacher-details/${teacher._id}`}>
                                <h1 className='text-2xl font-bold'>{teacher?.name}</h1>
                                <p className={`p-0 font-medium ${teacher.group === "None" ? 'hidden' : 'block'}`}> Group: {teacher?.group}</p>
                                <p className='p-0 font-medium'>Subject: {teacher?.subject}</p>
                            </Link>
                        </div>

                        <div>
                            <button onClick={() => handleDelete(teacher)} className='btn btn-sm text-xs btn-error'>Delete</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllTeacher;