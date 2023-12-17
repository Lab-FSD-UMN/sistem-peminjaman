import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
// import { Button } from 'antd';
import React, { useEffect } from 'react'

export default function ReservationRoomPage({ rooms }: any) {
    useEffect(() => {
        console.log("Page Info: ", rooms);
    }, [])
    return (
        <Guest>
            <div>
                <h1
                    className='text-2xl'
                >
                    Reservation Room Page
                </h1>
                <div>
                    {rooms?.map((room: any) => {
                        return (
                            <div
                                key={room.id}
                                className='flex flex-row gap-[1rem] w-full min-h-[5rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
                            >
                                <img src={room.image} alt=""
                                    className='w-[5rem] h-[5rem]'
                                    onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/150";
                                    }}
                                />
                                <Link
                                    href={`/reservation/room/${room.id}`}
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                                >
                                    {room.name}
                                </Link>
                            </div>
                        )

                    })}
                </div>
            </div>
        </Guest>
    )
}
