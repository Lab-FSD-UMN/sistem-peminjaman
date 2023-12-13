import AdminLayout from '@/Layouts/AdminLayout'
import React, { useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import axiosClient from '@/Services/axiosClient';


interface ReservationItemType {
    id: string;
    reservation_start_time: any;
    reservation_end_time: any;
    status: number;
    isRoom: boolean;
    isItem: boolean;
}




export default function ReservationListPage() {
    const pageProps = usePage().props;
    const [tab, setTab] = React.useState(0); // 0 = all, 1 = Room Only, 2 = Item Only

    const BookedItems: any = pageProps.booked_items;
    const BookedRooms = pageProps.booked_rooms as ReservationItemType[];
    const [ReservationItem, setReservationItem] = React.useState<ReservationItemType[]>([]);


    useEffect(() => {
        console.log("ItemBooked", BookedItems);
        console.log("RoomBooked", BookedRooms);

        setReservationItem((prev) => {
            return [...BookedRooms.map((item) => {
                return {
                    ...item,
                    isRoom: true,
                    isItem: false
                }
            })
                , ...BookedItems.map((item: any) => {
                    return {
                        ...item,
                        isRoom: false,
                        isItem: true
                    }
                })
            ]
        })
    }, [BookedItems, BookedRooms])


    useEffect(() => {
        console.log("ReservationItem", ReservationItem);
    }, [ReservationItem])

    // handle Approve
    const handleApprove = async (id: string) => {
        // try {
        //     await axiosClient.post(`/admin/room/reservation/list/status`, {
        //         status: 1,
        //         id: id
        //     },
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
        //             },
        //         }
        //     ).then((res) => {
        //         alert("Approve Success");
        //         console.log("res", res);
        //     }).catch((err) => {
        //         console.log("err", err);
        //     })
        // } catch (err) {
        //     console.log("err", err);
        // }
        router.post(`/admin/room/reservation/list/status`, {
            status: 1,
            id: id,
            web: true
        })  
    }

    // handle Reject
    const handleReject = async (id: string) => {
        router.post(`/admin/room/reservation/list/status`, {
            status: 2,
            id: id,
            web: true
        })
    }


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
            <section
                className='p-[1rem] gap-[1rem font-bold py-[1rem] px-4 w-full text-center'
            >
                <h1
                    className='text-2xl font-bold w-full text-left text-blue-700 '
                >
                    Reservation Approval
                </h1>

                <div
                    className='flex flex-col gap-[1rem] my-[2rem] w-full'
                >
                    {/* # tab button */}
                    <div
                        className='flex flex-row gap-[1rem] w-full'>
                        <button
                            onClick={(e) => setTab(0)}
                            className={`w-full hover:bg-blue-700 text-blue-500 font-bold py-2 px-4 rounded ${tab == 0 && 'bg-blue-700 text-white'}`}
                        >
                            All
                        </button>

                        <button
                            onClick={(e) => setTab(1)}
                            className={`w-full hover:bg-blue-700 text-blue-500 font-bold py-2 px-4 rounded ${tab == 1 && 'bg-blue-700 text-white'}`}
                        >
                            Room Only
                        </button>

                        <button
                            onClick={(e) => setTab(2)}
                            className={`w-full  hover:bg-blue-700 text-blue-500 font-bold py-2 px-4 rounded ${tab == 2 && 'bg-blue-700 text-white'}`}
                        >
                            Item Only
                        </button>
                    </div>


                </div>

                <div
                    className='flex flex-col gap-[2rem]'
                >
                    {ReservationItem.map((item: any) => {
                        if (tab == 1 && !item.isRoom) return null;
                        if (tab == 2 && !item.isItem) return null;
                        return (
                            <ReservationListCard
                                key={item.id}
                            >
                                <img
                                    // src={item?.image}
                                    // placeholder
                                    src="https://via.placeholder.com/150"
                                    alt="image"
                                    className='w-[100px] h-[100px] object-cover rounded-[1rem]'
                                />
                                <div
                                    className='flex flex-col gap-[1rem] w-full text-left'
                                >
                                    <div
                                        className='text-[1.2rem] font-bold'
                                    >
                                        {
                                            item.isRoom ? item.room.name : item.item.name
                                        }
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
                                        className='flex flex-row gap-[1rem] w-fit'
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
                                        <div>
                                            {item.status == 0 && "Pending"}
                                            {item.status == 1 && "Approved"}
                                            {item.status == 2 && "Rejected"}
                                        </div>
                                    </div>
                                </div>
                            </ReservationListCard>
                        )
                    }
                    )
                    }
                    {
                        ReservationItem.length == 0 &&
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
            className='flex flex-row p-[1rem] gap-[1rem] bg-white text-black font-bold py-[1rem] px-4'
        >
            {children}
        </div>
    )
}