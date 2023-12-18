import AdminLayout from '@/Layouts/AdminLayout'
import React, { useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import axiosClient from '@/Services/axiosClient';
import { formatDateTime } from '@/Utils/RoomReservationUtils';


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
                                {...item}
                                handleApprove={handleApprove}
                                handleReject={handleReject}
                            />
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
const ReservationListCard = ({
    ...item
}: any) => {
    let color = () => {
        if (item.status == 0) return 'bg-yellow-500 hover:bg-yellow-700 text-white';
        if (item.status == 1) return 'bg-green-500 hover:bg-green-700 text-white';
        if (item.status == 2) return 'bg-red-500 hover:bg-red-700 text-white';
    }

    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <button
                className='flex flex-row p-[1rem] gap-[1rem] bg-white text-black font-bold py-[1rem] px-4
            hover:bg-gray-100'
                onClick={(e) => setShowModal(true)}
            >
                <img
                    src={item.isRoom ? item.room.image_url : item.item.image}
                    alt="image"
                    onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                    }}
                    className='w-[100px] h-[100px] object-cover rounded-[1rem]'
                />
                <div
                    className='flex flex-col gap-[1rem] w-full text-left'
                >
                    <div
                        className='text-[1.2rem] font-bold'
                    >
                        {item.isRoom ? `${item.room.location} - ${item.room.name}` : item.item.name}
                    </div>

                    <div
                        className='flex flex-row gap-[1rem] w-full'
                    >
                        <span>
                            {item.reservation_start_time}
                        </span>
                        -
                        <span>
                            {item.reservation_end_time}
                        </span>
                    </div>
                    <div
                        className={`font-bold py-2 px-4 rounded w-full max-w-[20rem] text-center ${color()}`}
                    >
                        {item.status == 0 && "Pending"}
                        {item.status == 1 && "Approved"}
                        {item.status == 2 && "Rejected"}
                    </div>
                </div>
            </button>
            {/* //modal */}
            <div
                className={`fixed z-10 inset-0 overflow-y-auto justify-center items-center ${showModal ? 'block' : 'hidden'}`}
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            // onClick={(e) => setShowModal(false)}
            >

                <div
                    className="flex  justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 items-center"
                    onClick={(e) => setShowModal(false)}
                >
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                    ></div>
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>


                    {/* Modal Content */}
                    <div
                        className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                        >
                            <div
                                className="sm:flex sm:items-start"
                            >
                                <div
                                    className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"
                                >
                                    <h3
                                        className="text-lg leading-6 text-left font-bold capitalize bg-biru_umn text-white  p-2 w-fit mb-2"
                                        id="modal-headline"
                                    >
                                        By {item.user.name}
                                    </h3>
                                    <h3
                                        className="text-lg leading-6 text-gray-900 text-left font-bold"
                                        id="modal-headline"
                                    >
                                        {item.isRoom ? `${item.room.location} - ${item.room.name}` : item.item.name}
                                    </h3>
                                    <hr />
                                    <div>
                                    </div>
                                    <div>
                                        <span>
                                            {formatDateTime(item.reservation_start_time)}
                                        </span>
                                        -
                                        <span>
                                            {formatDateTime(item.reservation_end_time)}
                                        </span>
                                    </div>
                                    <div
                                        className="mt-2"
                                    >
                                        <h3>
                                            Note:
                                        </h3>
                                        <p
                                            className="text-sm text-gray-500"
                                        >
                                            {item.note}
                                        </p>
                                    </div>
                                    <div
                                        className='flex flex-row gap-[1rem] w-full mt-[1rem] '
                                    >
                                        {
                                            item.status == 0 &&
                                            <>
                                                <button
                                                    onClick={(e: any) => item.handleApprove(item.id)}
                                                    className='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full'
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={(e: any) => item.handleReject(item.id)}
                                                    className='bg-red-700 hover:bg-red-40000 text-white font-bold py-2 px-4 rounded w-full'
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        }
                                        {
                                            item.status == 1 &&
                                            <button
                                                onClick={(e: any) => item.handleReject(item.id)}
                                                className='bg-red-700 hover:bg-red-40000 text-white font-bold py-2 px-4 rounded w-full'
                                            >
                                                Reject
                                            </button>
                                        }

                                        {
                                            item.status == 2 &&
                                            <button
                                                onClick={(e: any) => item.handleApprove(item.id)}
                                                className='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full'
                                            >
                                                Approve
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                        >
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={(e) => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}