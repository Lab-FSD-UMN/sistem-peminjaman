import Guest from '@/Layouts/GuestLayout'
import { Link, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ReservationItemPage() {
    const pageInfo = usePage().props
    const Items: any = pageInfo.items
    useEffect(() => {
        console.log("Page Info", pageInfo.items)
    }, [])
    return (
        <Guest>

            <div
                className='flex flex-col p-[1rem] gap-[1rem]'
            >
                <h1
                    className='text-black uppercase text-[2rem] font-bold py-2 rounded'
                >
                    Reservation Item
                </h1>
                {
                    Items.map((item: any) => (
                        <Link
                            href={`/reservation/item/${item.id}`}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            key={item.id}>
                            <div className='flex gap-[0.4rem]'>
                                <h1
                                    className='text-white font-bold py-2 rounded'
                                >{item.name}</h1>
                                <p
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 '
                                >{item.is_available ? "available" : "unavailable"}</p>
                            </div>
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                        </Link>
                    ))
                }
            </div>
        </Guest>
    )
}
