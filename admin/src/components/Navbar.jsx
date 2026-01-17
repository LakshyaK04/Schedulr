import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    // read token and setter from context
    const { atoken, setAtoken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)


    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        atoken && setAtoken('')
        atoken && localStorage.removeItem('atoken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dtoken')
    }

    console.log('Navbar render - atoken:', atoken)

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white ">
      <div className="flex items-center gap-2 text-xs">
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Logo" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{atoken ? "Admin" : "Doctor"}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full '>Logout</button>
    </div>
  )
}

export default Navbar