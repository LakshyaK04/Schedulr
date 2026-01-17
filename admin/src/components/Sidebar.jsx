import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { atoken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer
     ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`

  return (
    <div className="min-h-screen bg-white border-r">
      <ul className="text-[#515151] mt-5">
        {atoken && (
          <>
            <NavLink to="/admin-dashboard" className={navClass}>
              <img src={assets.home_icon} alt="" />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>

            <NavLink to="/all-appointments" className={navClass}>
              <img src={assets.appointment_icon} alt="" />
              <p className="hidden md:block">Appointments</p>
            </NavLink>

            <NavLink to="/add-doctor" className={navClass}>
              <img src={assets.add_icon} alt="" />
              <p className="hidden md:block">Add Doctor</p>
            </NavLink>

            <NavLink to="/doctor-list" className={navClass}>
              <img src={assets.people_icon} alt="" />
              <p className="hidden md:block">Doctors List</p>
            </NavLink>
          </>
        )}

        {dToken && (
          <>
            <NavLink to="/doctor-dashboard" className={navClass}>
              <img src={assets.home_icon} alt="" />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>

            <NavLink to="/doctor-appointments" className={navClass}>
              <img src={assets.appointment_icon} alt="" />
              <p className="hidden md:block">Appointments</p>
            </NavLink>

            <NavLink to="/doctor-profile" className={navClass}>
              <img src={assets.people_icon} alt="" />
              <p className="hidden md:block">Profile</p>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
