import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()

  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)

  // NEW STRUCTURE:
  // docSlots = [
  //   { date: Date, slots: [{ datetime: Date, time: "10:00 AM" }, ...] },
  //   ...
  // ]
  const [docSlots, setDocSlots] = useState([])

  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = useCallback(async () => {
    const doc = doctors.find((doc) => doc._id === docId)
    setDocInfo(doc)
  }, [doctors, docId])

  const getAvailableSlots = useCallback(async () => {
    if (!docInfo) return

    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      // This is the date shown in the selector (fixed, stable)
      const dayDate = new Date(today)
      dayDate.setDate(today.getDate() + i)
      dayDate.setHours(0, 0, 0, 0)

      // This will be used for generating slots (changes time)
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // if today -> start from next available slot
      if (today.toDateString() === currentDate.toDateString()) {
        let currentHour = today.getHours()
        let currentMinute = today.getMinutes()

        if (currentHour < 10) {
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        } else {
          currentDate.setHours(currentHour)

          if (currentMinute > 30) {
            currentDate.setHours(currentHour + 1)
            currentDate.setMinutes(0)
          } else {
            currentDate.setMinutes(30)
          }
        }
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year
        const slotTimeStr = formattedTime

        const isSlotAvailable =
          docInfo?.slots_booked?.[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTimeStr)
            ? false
            : true

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      // Store date + slots (even if slots are empty)
      setDocSlots((prev) => [
        ...prev,
        {
          date: dayDate,
          slots: timeSlots,
        },
      ])
    }
  }, [docInfo])

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.warn('Please select a slot time')
      return
    }

    try {
      // Use the selected day date (stable)
      const date = docSlots?.[slotIndex]?.date

      if (!date) {
        toast.error('Please select a valid date')
        return
      }

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = day + '_' + month + '_' + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          docId,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId, fetchDocInfo])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo, getAvailableSlots])

  // Reset selected time when date changes
  useEffect(() => {
    setSlotTime('')
  }, [slotIndex])

  return (
    docInfo && (
      <div>
        {/* -------------------Doc Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{' '}
              <span className="text-gray-600 ">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* -------------Booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* DATE SELECTOR */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((dayObj, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? 'bg-primary text-white'
                      : 'border border-gray-200'
                  }`}
                  key={index}
                >
                  <p>{daysOfWeek[dayObj.date.getDay()]}</p>
                  <p>{dayObj.date.getDate()}</p>
                </div>
              ))}
          </div>

          {/* TIME SLOTS */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.slots?.length > 0 &&
              docSlots[slotIndex].slots.map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? 'bg-primary text-white'
                      : 'text-gray-400 border border-gray-300'
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}

            {/* OPTIONAL: show message when no slots */}
            {docSlots.length > 0 && docSlots[slotIndex]?.slots?.length === 0 && (
              <p className="text-sm text-gray-400">
                No slots available for this day
              </p>
            )}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  )
}

export default Appointment
