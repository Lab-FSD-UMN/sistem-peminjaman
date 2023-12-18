import Guest from '@/Layouts/GuestLayout'
import axiosClient from '@/Services/axiosClient'
import { Link, router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect } from 'react'


export default function ReservationRoomDetailPage({ room }: any) {
  // const pageInfo: any = usePage().props
  // const Item: any = pageInfo.item

  const [setMessages, messages] = React.useState<any>([])
  const [submitted, setSubmitted] = React.useState(false)
  // Form Values
  // ✨ form logic
  const { data, setData, post, progress, errors } = useForm({
    room_id: room.id,
    reservation_date_start: "",
    reservation_time_start: "",
    reservation_date_end: "",
    reservation_time_end: "",
    note: "",
    web: true,
  })

  useEffect(() => {
    console.log("Data :", data)
  }, [])


  useEffect(() => {
    console.error("Erorr", errors)
    // console.log("Form Data", data)
  }, [errors])

  function handleSubmit(e: any) {
    e.preventDefault();
    axiosClient.post(`/user/reservation/room`, {
      room_id: room.id,
      reservation_date_start: data.reservation_date_start,
      reservation_time_start: ConvertTimeFormat(data.reservation_time_start), // convert date to HH:MM:SS
      reservation_date_end: data.reservation_date_end,
      reservation_time_end: ConvertTimeFormat(data.reservation_time_end),
      note: data.note
    }
    ).then((res) => {
      console.log("Success", res)
      setSubmitted(true)
    }
    ).catch((err) => {
      console.log("Error", err)
    })
  }

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value
    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  useEffect(() => {
    console.log("Data :", room)
  }, [data])



  return (
    <Guest>
      <section
        className='flex flex-col gap-[1rem]'
      >
        {/* Back button */}
        <div
          className='flex flex-row justify-between items-center bg-biru_tua px-[1rem] sm:px-[5rem] xl:px-[10rem]
          h-[3rem]'
        >
          <Link
            href='/reservation/room'
            className='hover:opacity-60 text-white px-[0.5rem] rounded text-[1.2rem] flex items-center   '
          >
            <img
              src="https://www.svgrepo.com/show/500472/back.svg"
              className='w-[2rem] h-[1.5rem] invert-[1]'
              alt="" /> Back
          </Link>
        </div>
        <div
          className='px-[1rem] sm:px-[5rem] xl:px-[10rem]'
        >
          <h1
            className='capitalize text-biru_umn font-bold text-[2rem]'
          >
            Room Reservation Form
          </h1>
          <div
            className='flex flex-row gap-[1rem] h-[10rem] p-[0.5rem] items-center'
          >
            <img
              className='h-full object-cover rounded-[1rem]'
              src={room.image}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            <h2
              className='text-biru_umn font-bold   text-[1.5rem] text-center'
            >
              {room.location ? room.location : "B000"} - {room.name}
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-[0.5rem] font-bold rounded p-[1rem] pb-[5rem]'
          >
            <label
              className='text-black font-bold text-[1.2rem]'
              htmlFor="reservation_date_start">Date Start</label>
            <input
              type="date"
              name="reservation_date_start"
              id="reservation_date_start"
              placeholder="Reservation Date"
              className=' text-black font-bold rounded placeholder:text-opacity-60 text-opacity-60'
              onChange={handleChange}
            />

            <label
              className='text-black font-bold text-[1.2rem]'
              htmlFor="reservation_date_end">Date End</label>

            <input
              type="date"
              name="reservation_date_end"
              id="reservation_date_end"
              placeholder="Reservation Date"
              className=' text-black font-bold rounded placeholder:text-opacity-60 text-opacity-60'
              onChange={handleChange}
            />

            <label
              className='text-black font-bold text-[1.2rem]'
              htmlFor="reservation_time_start">Time Start</label>
            <input
              type="time"
              name="reservation_time_start"
              id="reservation_time_start"
              placeholder="Reservation Time"
              className=' text-black font-bold py-2 px-4 rounded'
              onChange={handleChange}
            />

            <label
              className='text-black font-bold text-[1.2rem]'
              htmlFor="reservation_time_start">Time End</label>
            <input
              type="time"
              name="reservation_time_end"
              id="reservation_time_end"
              placeholder="Reservation Time"
              className=' text-black font-bold py-2 px-4 rounded'
              onChange={handleChange}
            />

            <label
              className='text-black font-bold text-[1.2rem]'
              htmlFor="reservation_time_start">Note</label>
            <textarea
              onChange={handleChange}
              name="note"
              id="note"
              placeholder="Description"
              className=' text-black font-bold py-2 px-4 rounded'
            ></textarea>
            <br />
            <button
              disabled={
                data.reservation_date_start === "" ||
                data.reservation_time_start === "" ||
                data.reservation_date_end === "" ||
                data.reservation_time_end === ""
              }
              type="submit"
              className='bg-biru_umn hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded-[1rem]
              disabled:opacity-50 disabled:cursor-not-allowed
              '
            >
              Submit
            </button>
          </form>
        </div>
      </section>


      {
        //modal 
        submitted ?
          <div
            className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50
            z-[100]
            '
          >
            <div
              className='flex flex-col gap-[1rem] bg-white rounded p-[1rem]'
            >
              <h1
                className='text-black font-bold text-[1.5rem] text-center'
              >
                Reservation Success
              </h1>
              <Link
                href='/reservation/'
                className='bg-biru_umn hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded-[1rem] text-center'
              >
                Back
              </Link>
            </div>
          </div> : null
      }
    </Guest >
  )
}

// Reservation/ReservationGroup/Item/ReservationItemDetailPage
function CalculateTime({ dateStart, dateEnd, timeStart, timeEnd }: any) {
  const startDateTime: any = new Date(`${dateStart}T${timeStart}`);
  const endDateTime: any = new Date(`${dateEnd}T${timeEnd}`);

  const timeDiffInMilliseconds = endDateTime - startDateTime;

  const hours = Math.floor(timeDiffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiffInMilliseconds % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}


function ConvertTimeFormat(time: string) {
  const timeArray = time.split(":")
  const hour = timeArray[0]
  const minute = timeArray[1]

  return `${hour}:${minute}:00`
}