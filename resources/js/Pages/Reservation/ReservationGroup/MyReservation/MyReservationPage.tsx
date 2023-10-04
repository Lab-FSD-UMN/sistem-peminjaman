import Guest from '@/Layouts/GuestLayout'
import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

export default function MyReservationPage() {
    const pageInfo = usePage().props
    const userReservation: any = pageInfo.userReservation
    useEffect(() => {
        console.log("Page Info", userReservation)
    }, [])

    return (
        <Guest>
            <div
                className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
            >
                <h1>
                    My Reservation
                </h1>
                {
                    userReservation.map((reservation: any) => (
                        <div
                            className='flex flex-col p-[1rem] gap-[1rem] bg-green-400'
                            key={reservation.id}
                        >
                            <p>Reservation ID: {reservation.id}</p>
                            <p>Reservation Start: {reservation.reservation_start_time}</p>
                            <p>Reservation End: {reservation.reservation_end_time}</p>
                            <p>Reservation Status: {reservation.status}</p>
                            <p>Reservation Note: {reservation.note}</p>
                            <p>Reservation Created At: {reservation.created_at}</p>
                            <p>Reservation Updated At: {reservation.updated_at}</p>
                            <p>Reservation Deleted At: {reservation.deleted_at}</p>
                        </div>
                    ))

                }
            </div>
        </Guest>
    )
}
