import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AllStudents = () => {
    const { admissionClass } = useContext(AuthContext);
    const students = useLoaderData();

    return (
        <div className='w-full'>

            <h1 className='text-xl text-primary mb-5 font-bold text-center'><span className='opacity-70'>Class:</span> {admissionClass}</h1>

            <div className="overflow-x-auto no-scrollbar">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Group</th>
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
                                        <td className='font-bold text-xl'>{student?.name}</td>
                                        <td>{student?.group === 'None' ? '' : student.group}</td>
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