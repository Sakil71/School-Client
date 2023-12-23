import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loader, setLoader] = useState(false);
    const [addError, setAddError] = useState('');

    const navigate = useNavigate();

    const handleFormData = data => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        setLoader(true);

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImgBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const teacher = {
                        name : data.name,
                        email : data.email,
                        group : data.group,
                        subject : data.subject,
                        qualification : data.qualification,
                        age : data.age,
                        photo : imgData.data.url
                    }
                    fetch(`https://school-server-pink.vercel.app/teacher`, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(teacher)
                    })
                    .then(res => res.json())
                    .then(teacherData =>{
                        if(teacherData.acknowledged){
                            toast.success(`${data.name} - successfully addeded`);
                            setLoader(false);
                            navigate('/dashboard/teacher-list');
                        }
                    })
                }
            })

    }

    return (
        <div className='w-full mx-auto mt-4 border border-primary shadow-xl rounded p-10 bg-indigo-950'>
            <h1 className='text-2xl mb-4'>Register A Teacher</h1>

            <form onSubmit={handleSubmit(handleFormData)}>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <small>Name:</small>
                        <input type='text' placeholder='Name' {...register("name", { required: true })} className="input input-bordered input-primary w-full" />
                        {errors.name && <span className='text-red-400 font-bold'>Name is required</span>}
                    </div>

                    <div>
                        <small>Email:</small>
                        <input type='email' placeholder='Email' {...register("email", { required: true })} className="input input-bordered input-primary w-full" />
                        {errors.email && <span className='text-red-400 font-bold'>Email is required</span>}

                    </div>

                    <div>
                        <small>Group:</small>
                        <select type='text' {...register("group", { required: true })} className="select select-primary w-full font-bold">
                            <option className='font-bold' selected value="Science">Science</option>
                            <option className='font-bold' value="Humanities">Humanities</option>
                            <option className='font-bold' value="Business">Business</option>
                        </select>
                        {errors.group && <span className='text-red-400 font-bold'>Group is required</span>}
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
                        <small>Qualification:</small>
                        <input type='text' placeholder='Qualification' {...register("qualification", { required: true })} className="input input-bordered input-primary w-full" />
                        {errors.qualification && <span className='text-red-400 font-bold'>Qualification is required</span>}
                    </div>

                    <div>
                        <small>Teacher Age:</small>
                        <select type='text' {...register("age", { required: true })} className="select select-primary w-full font-bold">
                            <option selected className='font-bold' value="22">22</option>
                            <option className='font-bold' value="23">23</option>
                            <option className='font-bold' value="24">24</option>
                            <option className='font-bold' value="25">25</option>
                            <option className='font-bold' value="26">26</option>
                        </select>
                        {errors.age && <span className='text-red-400 font-bold'>Age is required</span>}
                    </div>

                    <div>
                        <small>Photo:</small>
                        <input type="file" {...register('photo')} className="file-input file-input-bordered file-input-primary w-full" />
                    </div>
                </div>

                {
                    addError &&
                    <span className='text-red-400 font-bold'>{addError}</span>
                }

                <button disabled={loader === true} type="submit" className="btn btn-outline btn-primary mt-8 w-full">
                    {
                        loader ?
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            'Add Teacher'
                    }
                </button>
            </form>
        </div>
    );
};

export default AddTeacher;