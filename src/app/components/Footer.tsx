import React from 'react';
import { FaInstagram, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { BsFillCloudSunFill } from 'react-icons/bs';

export default function Footer() {
    return (
        <div className='left-0 w-full bg-sky-300'>
            <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
                <div className='col-span-1 sm:col-span-2'>
                    <div className='flex items-center'>
                        <h1 className='text-3xl'>WeatherNow</h1>
                        <BsFillCloudSunFill className='text-3xl text-yellow-400 ml-2'/>
                    </div>
                    <div>
                        <ul className='flex space-x-4 mt-2'>
                            <li><FaInstagram /></li>
                            <li><FaFacebook /></li>
                            <li><FaGoogle /></li>
                            <li><FaTwitter /></li>
                        </ul>
                    </div>
                </div>
                <div className='col-span-1'>
                    <ul>
                        <li>About Us</li>
                        <li>Services</li>
                        <li>Community</li>
                    </ul>
                </div>
                <div className='col-span-1'>
                    <ul>
                        <li>Help Center</li>
                        <li>Feedbacks</li>
                    </ul>
                </div>
                <div className='col-span-1'>
                    <ul>
                        <li>647 123 2345</li>
                        <li>weathernow@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-100 text-center py-2 bg-sky-300">
                <p>© 2025 My Website. All rights reserved.</p>
            </div>
        </div>
    );
}