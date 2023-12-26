import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Pages/Components/Loading';

const AllStudents = () => {
    const { data: students = [], isLoading, refetch } = useQuery({
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
    return (
        <div className='w-full'>


            <div className="overflow-x-auto no-scrollbar">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Id</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, i) => <tr>
                                {
                                    student?.confirm &&
                                    <>
                                        <th>{i + 1}.</th>
                                        <td className='font-bold'>{student?.name}</td>
                                        <td>{student?._id}</td>
                                        <td>{student?.email}</td>
                                    </>
                                }
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllStudents;