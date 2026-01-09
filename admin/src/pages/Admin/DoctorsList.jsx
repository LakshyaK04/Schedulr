import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {doctors.map((item, index) => (
          <div key={index}>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList