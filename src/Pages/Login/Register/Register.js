import React, { useContext, useState } from 'react';
import { IoLogoGoogle } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserInformation, loginWithGoogle , setLoading} = useContext(AuthContext);
    const [signupError, setSignupError] = useState('');
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleFormData = data => {
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        setLoader(true);
        setSignupError('');

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
                        setLoader(false);
                        setLoading(false);
                        navigate(from, { replace: true });
                        toast.success('Registration Successfull');

                        const user = {
                            name : data.name,
                            email : data.email,
                            photo : imgData.data.url
                        }

                        fetch('https://school-server-pink.vercel.app/users', {
                            method : 'POST',
                            headers : {'content-type' : 'application/json'},
                            body: JSON.stringify(user)
                        })
                        .then(res => res.json())
                        .then(userData =>{
                            console.log(userData);
                        })
                    })
            })
            .catch(error => {
                setSignupError(error.message);
                setLoader(false);
            })
    }

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                toast.success('Registration Successfull');
                navigate(from, { replace: true });
            })
            .catch(error => {
                setSignupError(error.message);
            })
    }
    return (
        <div className='md:w-1/2 mx-auto mt-10 border border-primary shadow-xl rounded p-10 bg-indigo-950'>
            <h1 className='text-2xl mb-4'>Register Now</h1>
            <form onSubmit={handleSubmit(handleFormData)} className='flex flex-col gap-4'>
                <input type='text' placeholder='Name' {...register("name", { required: true })} className="input input-bordered input-primary w-full" />
                {errors.name && <span className='text-red-400 font-bold'>Name is required</span>}

                <input type='email' placeholder='Email' {...register("email", { required: true })} className="input input-bordered input-primary w-full" />
                {errors.email && <span className='text-red-400 font-bold'>Email is required</span>}

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
                    className="input input-bordered input-primary w-full" />
                {errors.password && <span className='text-red-400 font-bold'>{errors?.password?.message}</span>}

                <input type="file" {...register('photo')} className="file-input file-input-bordered file-input-primary w-full" />

                <span className='text-red-400 font-bold'>{signupError}</span>

                <button disabled={loader === true} type="submit"  className="btn btn-outline btn-primary mt-5">
                    {
                        loader ?
                        <span className="loading loading-spinner loading-md"></span>
                        :
                        'Register'
                    }
                </button>

            </form>
            <span>Already have an account? <Link to='/login' className="btn p-0 btn-active btn-link">Login</Link></span>

            <div className='divider'>or</div>

            <button onClick={handleGoogleLogin} className='border rounded border-primary text-xs w-full py-2 mt-5 hover:bg-primary hover:text-black flex justify-center items-center gap-2'><IoLogoGoogle className='border text-xl rounded-full'></IoLogoGoogle> Register With Google</button>
        </div>
    );
};

export default Register;