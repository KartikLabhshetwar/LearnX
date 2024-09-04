import React from 'react';
import { FaHeart, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white py-8'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0'>
                        <h3 className='text-2xl font-bold'>LearnX</h3>
                        <p className='mt-2'>Empowering minds through education</p>
                    </div>
                    <div className='w-full md:w-1/3 text-center mb-4 md:mb-0'>
                        <p className='text-sm'>
                            Made with <FaHeart className='inline-block text-red-500' /> by Kartik Labhshetwar
                        </p>
                    </div>
                    <div className='w-full md:w-1/3 text-center md:text-right'>
                        <div className='flex justify-center md:justify-end space-x-4'>
                            <a href="https://x.com/code_kartik" className='hover:text-indigo-400 transition-colors duration-300'>
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/kartikcode/" className='hover:text-indigo-400 transition-colors duration-300'>
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='mt-8 text-center text-sm'>
                    <p>&copy; 2024 LearnX. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;