import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import assets from '../assets/assets'

const Sidebar = () => {
  
  const {aToken} = useContext(AdminContext)
  
  return (
    <div>
      {aToken && <ul>
        <NavLink>
          <img src={assets.home_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>

        <NavLink>
          <img src={assets.appointments_icon} alt="" />
          <p>Appointments</p>
        </NavLink>

        <NavLink>
          <img src={assets.add_icon} alt="" />
          <p>Add Doctor</p>
        </NavLink>

        <NavLink>
          <img src={assets.people_icon} alt="" />
          <p>Doctors List</p>
        </NavLink>
      </ul>}
    </div>
  )
}

export default Sidebar