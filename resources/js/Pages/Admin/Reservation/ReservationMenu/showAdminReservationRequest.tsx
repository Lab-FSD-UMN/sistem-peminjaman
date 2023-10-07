import AdminLayout from '@/Layouts/AdminLayout'
import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import axiosClient from '@/Services/axiosClient';



export default function ReservationListPage() {
    const BookedItems: any = usePage().props.booked_items;
    const BookedRooms = usePage().props.booked_rooms;
    useEffect(() => {
        console.log("ItemBooked", BookedItems);
    }, [])


    // handle Approve
    const handleApprove = async (id: string) => {
        try {
            await axiosClient.post(`/reservation/list/item/status`, {
                status: 1,
                id: id
            }).then((res) => {
                alert("Approve Success");
                console.log("res", res);
            }).catch((err) => {
                console.log("err", err);
            })
        } catch (err) {
            console.log("err", err);
        }
    }

    // handle Reject
    const handleReject = async (id: string) => {
        try {
            await axiosClient.post(`/reservation/list/item/status`, {
                status: 2,
                id: id
            }).then((res) => {
                alert("Rejected")
                console.log("res", res);
            }).catch((err) => {
                console.log("err", err);
            })
        } catch (err) {
            console.log("err", err);
        }
    }

    return (
        <AdminLayout>
            <section
                className='p-[1rem] gap-[1rem font-bold py-[1rem] px-4 w-full text-center'
            >
                {/* TODO: add back button */}
                <h1
                    className='text-2xl font-bold w-full text-center'
                >
                    Reservation request
                </h1>
                <div
                    className='flex flex-col gap-[2rem]'
                >
                    {BookedItems.map((item: any) => {
                        return (
                            <ReservationListCard
                                key={item.id}
                            >
                                <h3
                                    className='text-[1.5rem]'
                                >
                                    {item.item.name}
                                </h3>
                                <div>
                                    Jumlah : {item.quantity}
                                </div>
                                <div>
                                    {/* {item.description} */}
                                    <span>
                                        {item.reservation_start_time}
                                    </span>
                                    -
                                    <span>
                                        {item.reservation_end_time}
                                    </span>
                                </div>
                                <div
                                    className='flex flex-row gap-[1rem] w-full'
                                >
                                    <button
                                        onClick={(e: any) => handleApprove(item.id)}
                                        className='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full'
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={(e: any) => handleReject(item.id)}
                                        className='bg-red-700 hover:bg-red-40000 text-white font-bold py-2 px-4 rounded w-full'
                                    >
                                        Reject
                                    </button>
                                </div>
                            </ReservationListCard>
                        )
                    }
                    )
                    }
                    {
                        BookedItems.length == 0 &&
                        <h1
                            className='text-[1.5rem]'
                        >
                            No Item Request
                        </h1>
                    }
                </div>
            </section>
        </AdminLayout>
    )
}
const ReservationListCard = ({ children }: any) => {
    return (
        <div
            className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
        >
            {children}
        </div>
    )
}