import { format } from 'date-fns';
import React from 'react';

const Footer = () => {
    return (
        <div className=' flex justify-center items-end text-xs'>
            <h1>&copy; {format(new Date(), 'yyy')}, All rights reserved by Sakil Ahmed</h1>
        </div>
    );
};

export default Footer;