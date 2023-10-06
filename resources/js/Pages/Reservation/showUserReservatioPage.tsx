import Guest from '@/Layouts/GuestLayout'
import { Link, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ReservationPage() {
    const pageInfo = usePage().props
    const Info = usePage()

    useEffect(() => {
        console.log("Page Info", Info)
        console.log("Page Info", pageInfo)
    }, [])

    return (
        <Guest>
            <div
                className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
            >
                <h1>
                    Reservation Pages
                </h1>

                <div
                    className='flex flex-col gap-[1rem]'
                >
                    <Link
                        href={"/reservation/myreservation"}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        View My Reservation
                    </Link>
                    <div
                        className='flex flex-row gap-[1rem] w-full min-h-[5rem]'
                    >
                        <Link
                            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full'
                            href={route('reservation.item')}>
                            Reservation Item
                        </Link>
                        <Link
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full'
                            href={route('reservation.room')}>
                            Reservation Room
                        </Link>
                    </div>
                </div>
            </div>
        </Guest>
    )
}
