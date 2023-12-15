import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFormData = data => {
        console.log(data);
    }

    return (
        <div className='w-1/2 mx-auto mt-10 border border-primary shadow-xl rounded p-10 bg-indigo-950'>
            <h1 className='text-2xl mb-4'>Login Now</h1>
            <form onSubmit={handleSubmit(handleFormData)} className='flex flex-col gap-4'>
                <input type='email' placeholder='Email' {...register("email", { required: true })} className="input input-bordered input-primary w-full" />
                {errors.email && <span className='text-red-500'>Email is required</span>}

                <input type='password' placeholder='Password'
                    {...register("password", {
                        required: 'Password is required'
                    }

                    )}
                    className="input input-bordered input-primary w-full" />
                <small><button className="btn btn-warning btn-link">Forgot password?</button></small>
                {errors.password && <span className='text-red-500'>{errors?.password?.message}</span>}

                <input type="submit" value={'Login'} className="btn btn-outline btn-primary" />
            </form>
            <span>Don't have an account? <Link to='/register' className="btn btn-active btn-link">Register</Link></span>
        </div>
    );
};

export default Login;
