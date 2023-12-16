import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const EditProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, createUser, updateUserInformation } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleFormData = data => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);

        createUser(data.email, data.password)
            .then(result => {
                fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImgBbKey}`, {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.json())
                    .then(imgData => {
                        updateUserInformation({
                            displayName: data.name,
                            photoURL: imgData.data.url
                        })
                        navigate(from, { replace: true });
                        toast.success('Registration Successfull');
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='md:w-1/2 mx-auto mt-10 border border-primary shadow-xl rounded p-10 bg-indigo-950'>
            <h1 className='text-2xl mb-4'>Update Your Infromation</h1>
            <form onSubmit={handleSubmit(handleFormData)} className='flex flex-col gap-4'>
                <input type='name' defaultValue={user?.displayName} {...register("name", { required: true })} className="input input-bordered input-primary w-full" />
                {errors.name && <span className='text-red-500'>Name is required</span>}

                <input type='email' defaultValue={user?.email} {...register("email", { required: true })} className="input input-bordered input-primary w-full" />
                {errors.email && <span className='text-red-500'>Email is required</span>}

                <input type="file" {...register('photo')} className="file-input file-input-bordered file-input-primary w-full" />

                <input type='password' placeholder='Password'
                    {...register("password",
                        {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password mnust have 8 character' },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                                message: 'Password must have uppercase, lower case and special character'
                            }
                        }

                    )}
                    className="input input-bordered input-primary w-full my-4" />
                {errors.password && <span className='text-red-500'>{errors?.password?.message}</span>}

                <input type="submit" value={'Update'} className="btn btn-outline btn-primary mt-5" />
            </form>
        </div>
    );
};

export default EditProfile;