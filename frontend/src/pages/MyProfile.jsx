import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const saveProfile = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  if (!userData) return null

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">

      {/* ===== PROFILE IMAGE (INSTRUCTOR STYLE) ===== */}
      <div className="flex items-center gap-4 mt-4">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div className="relative">
              <img
                className="w-36 h-36 rounded-full object-cover"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : userData.image
                }
                alt="profile"
              />

              <img
                className="w-8 absolute bottom-2 right-2"
                src={image ? '' : assets.upload_icon}
                alt=""
              />
            </div>

            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 rounded-full object-cover"
            src={userData.image}
            alt="profile"
          />
        )}
      </div>

      {/* ===== NAME ===== */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr />

      {/* ===== CONTACT INFO ===== */}
      <p className="underline mt-3">CONTACT INFORMATION</p>

      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5">
        <p>Email:</p>
        <p className="text-blue-500">{userData.email}</p>

        <p>Phone:</p>
        {isEdit ? (
          <input
            className="bg-gray-100 max-w-52"
            value={userData.phone}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        ) : (
          <p>{userData.phone}</p>
        )}

        <p>Address:</p>
        {isEdit ? (
          <div>
            <input
              className="bg-gray-50 mb-1"
              value={userData.address.line1}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              className="bg-gray-50"
              value={userData.address.line2}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </div>
        ) : (
          <p>
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
        )}
      </div>

      {/* ===== BASIC INFO ===== */}
      <p className="underline mt-4">BASIC INFORMATION</p>

      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5">
        <p>Gender:</p>
        {isEdit ? (
          <select
            value={userData.gender}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        ) : (
          <p>{userData.gender}</p>
        )}

        <p>Birthday:</p>
        {isEdit ? (
          <input
            type="date"
            value={userData.dob}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        ) : (
          <p>{userData.dob}</p>
        )}
      </div>

      {/* ===== ACTION BUTTON ===== */}
      <div className="mt-8">
        {isEdit ? (
          <button
            onClick={saveProfile}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile