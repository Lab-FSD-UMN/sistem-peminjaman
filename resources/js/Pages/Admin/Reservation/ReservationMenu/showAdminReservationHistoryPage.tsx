import AdminLayout from '@/Layouts/AdminLayout'
import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ReservationHistory() {
    const Data = usePage().props;
    const BookedItem: any = Data.booked_items;
    useEffect(() => {
        console.log(BookedItem);
    }, [])
    return (
        <AdminLayout>
            <section

                className='p-[1rem] gap-[1rem font-bold py-[1rem] px-4 w-full text-center'
            >
                <h1>
                    Reservation History
                </h1>
                <div>
                    Search Bar (nanti disini kali)
                </div>
                <div>
                    Sort By:
                </div>
                <div
                    className='flex flex-col gap-[1rem] p-[1rem]'
                >
                    {
                        BookedItem.map((item: any) => {
                            return (
                                <div
                                    key={item.id}
                                    className='flex flex-row gap-[1rem]  bg-blue-700 text-white font-bold py-[1rem] px-4 w-full rounded-[1rem]
                                    items-center
                                    '
                                >
                                    <p>
                                        {item.user.name}
                                    </p>
                                    <p>
                                        {item.item.name}
                                    </p>
                                    <p>
                                        {item.image}
                                    </p>
                                    <p>
                                        {item.status}
                                    </p>
                                    <button
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    >
                                        View Detail
                                    </button>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </section>
        </AdminLayout>
    )
}