import React from 'react'
import {assets} from '../assets/assets'

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
          <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
            <p className='text-gray-500'>Manipal University Jaipur <br /> Rajasthan, 303007</p>
            <p className='text-gray-500'>Tel: (+91) 620-590-9800 <br /> Email: kapoorlakshya42@gmail.com</p>
            <a href='mailto:kapoorlakshya42@gmail.com?subject=Contact%20from%20Schedulr'>
              <button className='border border-black px-8 py-4 text-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200'>Contact Us</button>
            </a>
          </div>
        </div>
    </div>
  )
}

export default Contact