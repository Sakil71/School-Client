import React from 'react';
import './Banner.css';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='banner min-h-screen bg-cover bg-center rounded flex items-center'>
            <div className='ml-5 md:ml-16 md:w-2/4'>
                <h1 className='text-5xl font-bold'>Landmark to create <br /> the future</h1>
                <p className='opacity-80 my-5'>Excellence in teaching, learning and research, Transform your life with endless opportunities Be inspired by the diverse community Discover yourself for lifetime success</p>
                <Link to='/apply-admission' className='btn btn-primary'>Apply Now <FaLongArrowAltRight></FaLongArrowAltRight></Link>
            </div>
        </div>
    );
};

export default Banner;