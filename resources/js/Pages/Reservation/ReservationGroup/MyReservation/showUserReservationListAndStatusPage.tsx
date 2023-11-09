import Guest from '@/Layouts/GuestLayout'
import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export default function MyReservationPage() {
    const pageInfo = usePage().props
    // fetch initial data from the backend
    const userReservation: any = pageInfo.userReservation
    // wait for the data to be fetched from the backend

    // convert status code to string
    return (
        <Guest>
            <div
                className='flex flex-col p-[1rem] gap-[1rem] font-bold py-[1rem] px-4 text-center align-middle
                min-h-screen justify-center
                '
            >
                <h1>
                    My Reservation
                </h1>
                {
                    userReservation.length === 0 ?
                        <h1
                            className='text-black uppercase text-[2rem] font-bold py-2 rounded'
                        >
                            OOOPS! No Reservation Data Found
                        </h1> : null
                }
                {
                    userReservation.map((reservation: any) => {
                        const { text, color } = statusToString(reservation.status); // Declare variables here
                        useEffect(() => {
                            console.log("dari dalem", reservation)
                        }, [])
                        return (
                            <div
                                className='flex flex-col p-[1rem] gap-[1rem] bg-gray-700'
                                key={reservation.id}
                            >
                                <h3
                                    className='text-white font-bold py-2 rounded'
                                >
                                    Reservation Item: {reservation.item.name}
                                </h3>
                                {/* <p>Reservation ID: {reservation.id}</p> */}
                                <p>{reservation.reservation_start_time} - {reservation.reservation_end_time}</p>
                                <p
                                    className={`${color} text-white font-bold py-2 px-4 rounded`}
                                >
                                    Reservation Status: {text}
                                </p>
                            </div>
                        );
                    })
                }

            </div>
        </Guest>
    )
}


function statusToString(status: number) {
    let statusText = "";
    let statusColor = "";

    switch (status) {
        case 0:
            statusText = "Pending";
            statusColor = "bg-yellow-500";
            break;
        case 1:
            statusText = "Approved";
            statusColor = "bg-green-500";
            break;
        case 2:
            statusText = "Rejected";
            statusColor = "bg-red-500";
            break;
        default:
            statusText = "Pending";
            statusColor = "bg-yellow-500";
            break;
    }

    return { text: statusText, color: statusColor };
}
