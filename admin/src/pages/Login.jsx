import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {
    
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    // match the context property name from AdminContext (setAtoken)
    const { setAtoken, backendUrl } = useContext(AdminContext)
    const navigate = useNavigate()


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const url = `${backendUrl.replace(/\/$/, '')}/api/admin/login`
                console.log('Login: sending request to', url)
                const { data } = await axios.post(url, { email, password })
                console.log('Login: response data', data)
                if (data && data.success) {
                    localStorage.setItem('atoken', data.token)
                    setAtoken(data.token)
                    console.log('Login: token set', data.token)
                    toast.success('Logged in successfully')
                    // redirect to dashboard/home
                    navigate('/', { replace: true })
                } else {
                    toast.error(data.message || 'Login failed')
                }
            }
            else{

            }
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || 'Login failed'
            console.error('Login error', error.response ? error.response.data : error.message)
            toast.error(msg)
        }
}
    
    return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto iems-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'> {state} </span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" placeholder="you@example.com" required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" placeholder="Password" required />
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