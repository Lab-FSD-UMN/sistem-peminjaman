import AdminLayout from '@/Layouts/AdminLayout'
import { router, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ReservationHistory() {
    const Data = usePage().props;
    const BookedItem: any = Data.booked_items;
    const BookedRoom: any = Data.booked_rooms
    useEffect(() => {
        console.log(BookedItem);
    }, [])


    const [tab, setTab] = React.useState(0);

    return (
        <AdminLayout>
            <div
                className='flex flex-row gap-[1rem] w-full bg-blue-600 justify-between items-center px-[5rem] '
            >
                <div
                    className='flex flex-row  rounded-[1rem]  gap-[1rem] items-center w-[50%]
                    max-w-[30rem]
                    '
                >
                    <button
                        className=' hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit'

                        onClick={(e) => router.visit('/admin/reservation')}
                    >
                        Back
                    </button>

                    <input
                        type="text" name="search" id="search" placeholder='Search for your reservation...'
                        className='flex flex-row gap-[1rem] w-full bg-blue-500 text-white font-bold py-2 px-4 rounded
                                    items-center placeholder-white my-[1rem] truncate'
                    />
                </div>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                    '
                >
                    Sort By:
                </button>
            </div>
            {/* content section */}
            <section

                className='p-[1rem] gap-[1rem font-bold py-[1rem] px-4 w-full text-center'
            >
                <h1
                    className='text-4xl font-bold text-left text-biru_umn w-full py-[1rem] px-4'
                >
                    Reservation History
                </h1>
                <div
                    className='flex flex-col gap-[1rem] p-[1rem]'
                >
                    <div
                        className='flex flex-row gap-[1rem]'
                    >
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={() => {
                                setTab(0)
                            }}
                        >
                            Room Reservation
                        </button>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={() => {
                                setTab(1)
                            }}
                        >
                            Item Reservation
                        </button>

                    </div>

                    {
                        tab == 1 ?
                            <div
                                className='flex flex-col gap-[1rem]'
                            >
                                {
                                    BookedItem.length == 0 ?
                                        <h1
                                            className='text-black uppercase text-[2rem] font-bold py-2 rounded'
                                        >
                                            OOOPS! No Item Found
                                        </h1> :
                                        BookedItem.map((item: any) => (
                                            <ItemCard
                                                {...item}
                                            />
                                        ))
                                }
                            </div>
                            :
                            <div
                                className='flex flex-col gap-[1rem] p-[1rem]'
                            >
                                {
                                    BookedRoom.length == 0 ?
                                        <h1
                                            className='text-black uppercase text-[2rem] font-bold py-2 rounded'
                                        >
                                            OOOPS! No Room Found
                                        </h1> :
                                        BookedRoom.map((item: any) => (
                                            <RoomCard
                                                {...item}
                                            />
                                        ))
                                }
                            </div>
                    }
                </div>
            </section>
        </AdminLayout>
    )
}

const ItemCard = ({ ...item }: any) => {
    return (
        <div
            className='flex flex-col gap-[1rem] p-[1rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            <div>
                <h1>
                    Item Name: {item.item.name}
                </h1>
                <h1>
                    Item Quantity: {item.quantity}
                </h1>
                <h1>
                    Item Description: {item.item.description}
                </h1>
            </div>
            <div>
                <h1>
                    Reservation Date Start: {item.reservation_date_start}
                </h1>
                <h1>
                    Reservation Time Start: {item.reservation_time_start}
                </h1>
                <h1>
                    Reservation Date End: {item.reservation_date_end}
                </h1>
                <h1>
                    Reservation Time End: {item.reservation_time_end}
                </h1>
            </div>
            <div>
                <h1>
                    Note: {item.note}
                </h1>
            </div>
        </div>
    )
}

const RoomCard = ({ ...item }: any) => {
    return (
        <div
            className='flex flex-col gap-[1rem]  text-white font-bold py-2 px-4 rounded
            shadow  hover:bg-gray-100 bg-biru_muda
            '
        >
            <div>
                <h1>
                    {item.room.location} - {item.room.name}
                </h1>
                <h1>
                    Room Capacity: {item.room.capacity}
                </h1>
                <h1>
                    Room Description: {item.room.description}
                </h1>
            </div>
            <div>
                <h1>
                    Reservation Date Start: {item.reservation_date_start}
                </h1>
                <h1>
                    Reservation Time Start: {item.reservation_time_start}
                </h1>
                <h1>
                    Reservation Date End: {item.reservation_date_end}
                </h1>
                <h1>
                    Reservation Time End: {item.reservation_time_end}
                </h1>
            </div>
            <div>
                <h1>
                    Note: {item.note}
                </h1>
            </div>
        </div>
    )
}