import Guest from '@/Layouts/GuestLayout'
import axiosClient from '@/Services/axiosClient'
import { router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect } from 'react'


export default function ReservationItemDetailPage() {
    const pageInfo: any = usePage().props
    const Item: any = pageInfo.item


    // Form Values
    // ✨ form logic
    const { data, setData, post, progress, errors } = useForm({
        item_id: Item.id,
        user_id: pageInfo.auth.user.id,
        quantity: "",
        reservation_date_start: "",
        reservation_time_start: "",
        reservation_date_end: "",
        reservation_time_end: "",
        note: "",
    })

    useEffect(() => {
        console.log("Data :", data)
        console.log("user id", pageInfo.auth.user.id)
    }, [])


    useEffect(() => {
        console.error("Erorr", errors)
        // console.log("Form Data", data)
    }, [errors])

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log("Form Data", data)
        
        axiosClient.post(`/reservation/item`, data).then((res) => {
            console.log("Success", res)
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
        console.log("Form Data", data)
        const { hours } = CalculateTime({
            dateStart: data.reservation_date_start,
            dateEnd: data.reservation_date_end,
            timeStart: data.reservation_time_start,
            timeEnd: data.reservation_time_end
        })
        // console.log("Time", hours)
    }, [data])



    return (
        <Guest>
            <div
                className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-2 px-4'
            >
                <h1>{Item.name}</h1>
                <p>{Item.description}</p>
                <p
                    className=' text-white font-bold '
                >
                    Available: {Item.is_available ? "Yes" : "No"}
                </p>
                <p>Quantity Available: {Item.quantity}</p>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col p-[1rem] gap-[1rem] text-white font-bold  rounded'
                >
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        placeholder="Quantity"
                        className=' text-black font-bold py-2 px-4 rounded'
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="">
                        Reservation Date From - To
                    </label>
                    {/* Reservation Date */}
                    <div
                        className='flex flex-row gap-[1rem]'
                    >
                        <input
                            type="date"
                            name="reservation_date_start"
                            id="reservation_date_start"
                            placeholder="Reservation Date"
                            // className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            className=' text-black font-bold py-2 px-4 rounded'
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            name="reservation_time_start"
                            id="reservation_time_start"
                            placeholder="Reservation Time"
                            // className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            className=' text-black font-bold py-2 px-4 rounded'
                            onChange={handleChange}

                        />
                    </div>
                    <div
                        className='flex flex-row gap-[1rem]'
                    >
                        <input
                            type="date"
                            name="reservation_date_end"
                            id="reservation_date_end"
                            placeholder="Reservation Date"
                            // className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            className=' text-black font-bold py-2 px-4 rounded'
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            name="reservation_time_end"
                            id="reservation_time_end"
                            placeholder="Reservation Time"
                            // className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            className=' text-black font-bold py-2 px-4 rounded'
                            onChange={handleChange}
                        />
                    </div>
                    {/* Description */}
                    <textarea
                        onChange={handleChange}
                        name="note"
                        id="note"
                        placeholder="Description"
                        className=' text-black font-bold py-2 px-4 rounded'
                    ></textarea>
                    <button
                        type="submit"
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Guest>
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


// Validation Needed:
// 1. Quantity should not exceed the available quantity
// 2. Reservation Date should not be in the past
// 3. Reservation Time should not be in the past
// 4. Cannot reserve if the item is not available
// 5. Cannot submit if the form is empty or incomplete or invalid
