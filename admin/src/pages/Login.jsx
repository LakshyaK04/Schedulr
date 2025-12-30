import React, { useState } from 'react'
import {assets} from '../assets/assets'

const Login = () => {
    
    const [state, setState] = useState('Admin');
    
    return (
    <form className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto iems-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="Email" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="Password" required />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            {
                state === 'Admin' ?
                <p className='text-center text-sm'>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                :
                <p className='text-center text-sm'>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login