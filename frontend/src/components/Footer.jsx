import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* --------Left */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Your trusted partner in healthcare scheduling. We connect patients with top-rated doctors, making it easy to book appointments anytime, anywhere. Experience seamless healthcare management with Schedulr.</p>
                </div>
                {/* --------center */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <Link to='/' onClick={() => scrollTo(0,0)}><li className='hover:text-primary cursor-pointer transition-colors'>Home</li></Link>
                        <Link to='/about' onClick={() => scrollTo(0,0)}><li className='hover:text-primary cursor-pointer transition-colors'>About us</li></Link>
                        <Link to='/contact' onClick={() => scrollTo(0,0)}><li className='hover:text-primary cursor-pointer transition-colors'>Contact us</li></Link>
                        <li className='hover:text-primary cursor-pointer transition-colors'>Privacy policy</li>
                    </ul>
                </div>
                {/* --------right */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-620-590-9800</li>
                        <li>kapoorlakshya42@gmail.com</li>
                    </ul>
                </div>


            </div>

            {/* -------------copyright */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2026 @ kapoorlakshya42 - All Right Reserved.</p>
            </div>

        </div>
  )
}

export default Footer