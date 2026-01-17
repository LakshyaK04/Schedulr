import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const navClass = ({ isActive }) =>
  `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer
   ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`

const Sidebar = () => {
  const { atoken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className="min-h-screen bg-white border-r">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <li>
            <NavLink to="/admin-dashboard" className={navClass}>
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/all-appointments" className={navClass}>
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/add-doctor" className={navClass}>
              <img src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/doctor-list" className={navClass}>
              <img src={assets.people_icon} alt="" />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <li>
            <NavLink to="/doctor-dashboard" className={navClass}>
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/doctor-appointments" className={navClass}>
              <img src={assets.appointment_icon} alt="" />
              <p>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink to="/doctor-profile" className={navClass}>
              <img src={assets.people_icon} alt="" />
              <p>Profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}
export default Sidebar

const Sidebar = () => {
  const { atoken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  if (!atoken) return null

  return (
    <div className="min-h-screen bg-white border-r">
      <ul className="text-[#515151] mt-5">
        <li>
          <NavLink to="/admin-dashboard" className={navClass}>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/all-appointments" className={navClass}>
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/add-doctor" className={navClass}>
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>
        </li>

        <li>
          <NavLink to="/doctor-list" className={navClass}>
            <img src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
  )
}
export default Sidebar
