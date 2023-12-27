import { format } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddNotice = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loader, setLoader] = useState(false);

    const handleFormData = (data) => {
        setLoader(true);
        const notice = {
            subject: data.subject,
            forClass: data.forClass,
            notice: data.notice,
            date: format(new Date(), 'Pp')
        }
        fetch('https://school-server-pink.vercel.app/notices', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(notice)
        })
            .then(res => res.json())
            .then(noticeData => {
                if (noticeData.acknowledged) {
                    toast.success('Notice Added Successfull');
                    setLoader(false);
                    reset();
                }
            })
    }
    return (
        <div className='w-full md:w-[94%] mx-auto mt-10 border border-primary shadow-xl rounded p-10 bg-indigo-950'>
            <h1 className='text-2xl mb-4'>Add Notice</h1>
            <form onSubmit={handleSubmit(handleFormData)} className='flex flex-col gap-4'>

                <input type='text' placeholder='Subject' {...register("subject", { required: true })} className="input input-bordered input-primary w-full" />
                {errors.subject && <span className='text-red-400 font-bold'>Subject is required</span>}

                <select className="select select-primary w-full" {...register("forClass")}>
                    <option value="all" selected>For All Class</option>
                    <option value="six">Six</option>
                    <option value="seven">Seven</option>
                    <option value="eight">Eight</option>
                    <option value="nine">Nine</option>
                </select>

                <textarea className="textarea textarea-primary w-full" type='text' {...register("notice", { required: true })} placeholder="Write a notice"></textarea>
                {errors.notice && <span className='text-red-400 font-bold'>Notice is required</span>}


                <button disabled={loader === true} type="submit" className="btn btn-outline btn-primary mt-5">
                    {
                        loader ?
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            'Submit'
                    }
                </button>
            </form>
        </div>
    );
};

export default AddNotice;