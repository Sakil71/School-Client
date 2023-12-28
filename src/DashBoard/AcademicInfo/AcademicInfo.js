import React, { useContext, useState } from 'react';
import useTitle from '../../Hooks/useTitle/useTitle';
import { useForm } from 'react-hook-form';
import useAdmin from '../../Hooks/useAdmin/UseAdmin';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../../Pages/Components/Loading';


const AcademicInfo = () => {
    useTitle('Academic Information');
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const forClass = ["Six", "Seven", "Eight", "Nine", "Ten"];
    const [classesData, setClassesData] = useState([]);
    const [clickedClass, setClickedClass] = useState('');

    const { data: teachers = [], refetch, isLoading } = useQuery({
        queryKey: ['teacher'],
        queryFn: async () => {
            const res = await fetch('https://school-server-pink.vercel.app/teacher');
            const data = await res.json();
            return data;
        }
    })
    refetch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loader, setLoader] = useState(false);

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleFormData = data => {
        setLoader(true);
        const topics = {
            date: format(new Date(), 'PPpp'),
            teacher: data.teacherName,
            title: data.title,
            subject: data.subject,
            classes: data.classes,
            topic: data.topic,
        }
        console.log(topics);
        fetch(`https://school-server-pink.vercel.app/topic`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(topics)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoader(false);
                    toast.success(`${data.subject} - successfully added`);
                    reset();
                }
            })
    }


    const handleClassData = (classes) => {
        setClickedClass(classes);
        fetch(`https://school-server-pink.vercel.app/topic/${classes}`)
            .then(res => res.json())
            .then(data => {
                setClassesData(data);
            })
    }

    return (
        <div className='w-full md:w-[95%]'>
            <div className='grid grid-cols-3 gap-4 md:block px-5'>
                {
                    forClass.map((classes, i) => <button onClick={() => handleClassData(classes)} key={i} className='btn btn-sm btn-outline mx-4'>{classes}</button>)
                }
            </div>

            <div className='text-xl font-bold text-center text-primary divider'>{clickedClass}</div>

            {/* Class Topic Data */}
            <div className='mb-10'>
                {
                    classesData.map(classData => <div className='mb-10 border rounded p-4 bg-indigo-950'>
                        <h1 className='text-2xl font-bold text-primary'>{classData.subject}</h1>
                        <h1 className='text-xl font-medium text-yellow-400'>{classData.title}</h1>
                        <p>{classData.topic}</p>
                        <div className='mt-10 font-mono'>
                            <h1 className='text-sm'>{classData.teacher}</h1>
                            <p className='text-xs'>{classData.date}</p>
                        </div>
                    </div>)
                }
            </div>

            {/* Add A topic section */}
            {
                isAdmin &&
                <div className='bg-indigo-950 rounded p-5'>
                    <h1 className='text-2xl mb-4'>Add academic topic</h1>
                    <form onSubmit={handleSubmit(handleFormData)} className='flex flex-col gap-4'>
                        <div>
                            <small>Sir Name:</small>
                            <select type='text' {...register("teacherName")} className="select select-primary w-full font-bold">
                                {
                                    teachers.map(teacher => <option className='font-bold'
                                        selected value={teacher?.name}>
                                        {teacher?.name}
                                    </option>)
                                }
                            </select>
                        </div>

                        <div>
                            <small>Title</small>
                            <input type='text' placeholder='Title' {...register("title")} className="input input-bordered input-primary w-full" />
                        </div>

                        <div>
                            <small>Subject:</small>
                            <select type='text' {...register("subject", { required: true })} className="select select-primary w-full font-bold">
                                <option className='font-bold' selected value="Bangla">Bangla</option>
                                <option className='font-bold' value="English">English</option>
                                <option className='font-bold' value="Mathmatichs">Mathmatichs</option>
                                <option className='font-bold' value="ICT">ICT</option>
                                <option className='font-bold' value="Bangladesh Studies">Bangladesh Studies</option>
                                <option className='font-bold' value="Higher Math">Higher Math</option>
                                <option className='font-bold' value="History">History</option>
                                <option className='font-bold' value="Agriculture Education ">Agriculture Education</option>
                            </select>
                            {errors.subject && <span className='text-red-400 font-bold'>Subject is required</span>}
                        </div>

                        <div>
                            <small>Class:</small>
                            <select type='text' {...register("classes", { required: true })} className="select select-primary w-full font-bold">
                                <option className='font-bold' selected value='Six'>Six</option>
                                <option className='font-bold' value='Seven'>Seven</option>
                                <option className='font-bold' value='Eight'>Eight</option>
                                <option className='font-bold' value='Nine'>Nine</option>
                                <option className='font-bold' value='Ten'>Ten</option>
                            </select>
                            {errors.classes && <span className='text-red-400 font-bold'>Class is required</span>}
                        </div>

                        <div>
                            <textarea className="textarea textarea-primary w-full" type='text' {...register("topic", { required: true })} placeholder="Write a topic"></textarea>
                            {errors.topic && <span className='text-red-400 font-bold'>Topic is required</span>}
                        </div>


                        <button disabled={loader === true} type="submit" className="btn btn-primary mt-5">
                            {
                                loader ?
                                    <span className="loading loading-spinner loading-md"></span>
                                    :
                                    'Add'
                            }
                        </button>

                    </form>
                </div>
            }
        </div >
    );
};

export default AcademicInfo;