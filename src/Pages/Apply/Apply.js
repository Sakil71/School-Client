import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Apply = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [applyError,
    ] = useState('');
    const [districts, setDistricts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('district.json')
            .then(res => res.json())
            .then(data => {
                setDistricts(data);
            })
    }, [])

    const handleFormData = data => {
        setLoader(true);
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImgBbKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const apply = {
                        date : format(new Date(), "Pp"),
                        name: data.name,
                        email: user.email,
                        fatherName: data.fatherName,
                        motherName: data.motherName,
                        admissionClass: data.class,
                        group: data.group,
                        optionalSubject: data.optionalSubject,
                        photo: imgData.data.url,
                        village: data.village,
                        postOffice: data.postOffice,
                        thana: data.thana,
                        district: data.district,
                    }
                    fetch('https://school-server-pink.vercel.app/apply', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(apply)
                    })
                    .then(res=> res.json())
                    .then(applyData =>{
                        if(applyData.acknowledged){
                            reset();
                            setLoader(false);
                            toast.success(`${data.name} - Thank you for apply`);
                            navigate('/application');
                        }
                    })
                }
            })
    }
    return (
        <div className='w-full mx-auto mt-4 border border-primary shadow-xl rounded p-10 bg-indigo-950'>
            <h1 className='text-2xl mb-4'>Apply for admission</h1>

            <form onSubmit={handleSubmit(handleFormData)}>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <small>Name:</small>
                        <input type='text' defaultValue={user?.displayName} {...register("name", { required: true })} className="input input-bordered input-primary w-full font-bold" />
                        {errors.name && <span className='text-red-400 font-bold'>Name is required</span>}
                    </div>

                    <div>
                        <small>Email:</small>
                        <input type='email' defaultValue={user?.email} disabled {...register("email")} className="input input-bordered input-primary w-full" />
                        {errors.email && <span className='text-red-400 font-bold'></span>}
                    </div>

                    <div>
                        <small>Father's Name:</small>
                        <input type='text' placeholder="Father's Name" {...register("fatherName", { required: true })} className="input input-bordered input-primary w-full font-bold" />
                        {errors.fatherName && <span className='text-red-400 font-bold'>Father Name is required</span>}
                    </div>

                    <div>
                        <small>Mother's Name:</small>
                        <input type='text' placeholder="Mother's Name" {...register("motherName", { required: true })} className="input input-bordered input-primary w-full font-bold" />
                        {errors.mother && <span className='text-red-400 font-bold'>Mother is required</span>}
                    </div>

                    <div>
                        <small>Class:</small>
                        <select type='text' {...register("class", { required: true })} className="select select-primary w-full font-bold">
                            <option className='font-bold' selected value='Six'>Six</option>
                            <option className='font-bold' value='Seven'>Seven</option>
                            <option className='font-bold' value='Eight'>Eight</option>
                            <option className='font-bold' value='Nine'>Nine</option>
                        </select>
                        {errors.class && <span className='text-red-400 font-bold'>Class is required</span>}
                    </div>

                    <div>
                        <small>Group:</small>
                        <select type='text' {...register("group", { required: true })} className="select select-primary w-full font-bold">
                            <option className='font-bold' selected value="None">None</option>
                            <option className='font-bold' value="Science">Science</option>
                            <option className='font-bold' value="Humanities">Humanities</option>
                            <option className='font-bold' value="Business">Business</option>
                        </select>
                        {errors.group && <span className='text-red-400 font-bold'>Group is required</span>}
                    </div>

                    <div>
                        <small>Optional Subject:</small>
                        <select type='text' {...register("optionalSubject", { required: true })} className="select select-primary w-full font-bold">
                            <option className='font-bold' selected value="None">None</option>
                            <option className='font-bold' value="Higher Math">Higher Math</option>
                            <option className='font-bold' value="Higher Math">Agriculture Education</option>
                            <option className='font-bold' value="Higher Math">ICT</option>
                        </select>
                        {errors.optionalSubject && <span className='text-red-400 font-bold'>Optional Subject is required</span>}
                    </div>

                    <div>
                        <small>Photo:</small>
                        <input type="file" {...register('photo')} className="file-input file-input-bordered file-input-primary w-full" />
                    </div>

                    <address>
                        <small>Address:</small>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='mb-4'>
                                <input type='text' placeholder='Village' {...register("village", { required: true })} className="input input-bordered input-primary w-full font-bold" />
                                {errors.village && <span className='text-red-400 font-bold'>Village is required</span>}
                            </div>

                            <div className='mb-4'>
                                <input type='text' placeholder='Post office' {...register("postOffice", { required: true })} className="input input-bordered input-primary w-full font-bold" />
                                {errors.village && <span className='text-red-400 font-bold'>Post Office is required</span>}
                            </div>

                            <div className='mb-4'>
                                <input type='text' placeholder='Thana' {...register("thana", { required: true })} className="input input-bordered input-primary w-full font-bold" />
                                {errors.village && <span className='text-red-400 font-bold'>Thana is required</span>}
                            </div>

                            <div>
                                <select type='text' {...register("district", { required: true })} className="select select-primary w-full font-bold">
                                    {
                                        districts.slice().sort((a, b) => a.name.localeCompare(b.name)).map(district => <option key={district.id} className='font-bold' value={district?.name}>{district?.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </address>
                </div>

                {
                    applyError &&
                    <span className='text-red-400 font-bold'>{applyError}</span>
                }

                <button disabled={loader === true} type="submit" className="btn btn-primary mt-8 w-full">
                    {
                        loader ?
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            'Apply'
                    }
                </button>
            </form>
        </div>
    );
};

export default Apply;