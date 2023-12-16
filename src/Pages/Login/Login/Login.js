import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { IoLogoGoogle } from 'react-icons/io';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logInUser, loginWithGoogle } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleFormData = data => {
        setLoader(true);
        setLoginError('');

        logInUser(data.email, data.password)
            .then(result => {
                setLoader(false);
                toast.success(`Login successfull.`);
                navigate(from, { replace: true });
            })
            .catch(error => {
                setLoginError(error.message);
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
                setLoginError(error.message);
            })
    }

    return (
        <div className='md:w-1/2 mx-auto mt-10 border border-primary shadow-xl rounded p-10 bg-indigo-950'>
            <h1 className='text-2xl mb-4'>Login Now</h1>
            <form onSubmit={handleSubmit(handleFormData)} className='flex flex-col gap-4'>
                <input type='email' placeholder='Email' {...register("email", { required: true })} className="input input-bordered input-primary w-full" />
                {errors.email && <span className='text-red-400 font-bold'>Email is required</span>}

                <input type='password' placeholder='Password'
                    {...register("password", {
                        required: 'Password is required'
                    }

                    )}
                    className="input input-bordered input-primary w-full" />
                {errors.password && <span className='text-red-400 font-bold'>{errors?.password?.message}</span>}
                <div>
                    <small className="btn btn-warning btn-link">Forgot password?</small>
                </div>

                <span className='text-red-400 font-bold'>{loginError}</span>

                <button disabled={loader === true} type="submit" className="btn btn-outline btn-primary">
                    {
                        loader ?
                            <span className="loading loading-spinner loading-md"></span>
                            :
                            'Login'
                    }
                </button>
            </form>
            <span>Don't have an account? <Link to='/register' className="btn p-0 btn-active btn-link">Register</Link></span>

            <div className='divider'>or</div>

            <button onClick={handleGoogleLogin} className='border rounded border-primary text-xs w-full py-2 mt-5hover:bg-primary hover:text-black flex justify-center items-center gap-2'><IoLogoGoogle className='border text-xl rounded-full'></IoLogoGoogle> Register With Google</button>
        </div>
    );
};

export default Login;
