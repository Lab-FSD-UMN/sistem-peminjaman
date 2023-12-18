import Guest from '@/Layouts/GuestLayout'
import { Link, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import HeaderBackgroundImage from '@/Assets/image/reservationheroimg.webp'
import PinewheelImage from '@/Assets/image/pinewheel.svg'

export default function ReservationPage() {
    const pageInfo: any = usePage().props
    const userReservation: any = pageInfo
    const { userRoomReservation, userItemReservation } = pageInfo
    const auth: any = pageInfo.auth
    const user = auth.user
    const role = auth.user?.role

    // wait for the data to be fetched from the backend
    const username: any = pageInfo?.auth?.user?.name
    // const role = pageInfo?.auth?.user?.role


    const [tab, setTab] = React.useState(0); // 0 for room, 1 for item
    const [reservationData, setReservationData] = useState() as any[];
    // convert status code to string
    useEffect(() => {
        if (tab === 0) {
            setReservationData(userRoomReservation);
            console.log("room", userRoomReservation)
        }
        else {
            setReservationData(userItemReservation);
            console.log("item", userItemReservation)
        }
        console.log("username", username)
    }, [tab])

    useEffect(() => {
        console.log("Page Info: ", pageInfo);
    }, [pageInfo])

    //search logic
    const [searchTerm, setSearchTerm] = React.useState("");
    //debounce
    const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchTerm);
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            console.log("searching for", debouncedSearchTerm)
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    //filter
    useEffect(() => {
        if (debouncedSearchTerm) {
            const filteredData = reservationData?.filter((data: any) => {
                const { text, color } = statusToString(data.status); // Declare variables here
                return (
                    data.room.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                    data.room.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                    text.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                );
            });
            setReservationData(filteredData);
        } else {
            setReservationData(userRoomReservation);
        }
    }, [debouncedSearchTerm]);
    // handle search bar input
    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
    };


    return (
        <Guest>
            <section
                className='flex flex-col w-full min-h-[5rem] relative'
            >
                <div
                    className='flex flex-col p-[1rem] gap-[1rem]  text-white font-bold py-[3rem] px-[1rem]
                    sm:px-[5rem] xl:px-[10rem] relative overflow-hidden'
                >
                    <img src={HeaderBackgroundImage} alt="Header Background Image" className='absolute isolate top-0 left-0 z-[0] h-full w-full object-cover' />
                    <div
                        className='flex flex-col gap-[0.1rem] w-full min-h-[5rem] z-[1]'
                    >
                        <h2 className='text-biru_muda'>
                            Room and Item Reservation
                        </h2>
                        <h1
                            className='text-[2rem] w-full text-white font-bold capitalize'
                        >
                            {
                                username && `Welcome, ${username} `
                            }
                            Choose your reservation

                        </h1>
                        <p
                            className='text-sm w-full text-white opacity-[70%]'
                        >
                            FSD Lab is a laboratory under the faculty of art and design which functions as a support system for academic studies focused on Faculty of Art and Design, and general support for UMN.
                        </p>
                    </div>
                    <div
                        className='flex gap-[1rem] w-full min-h-[5rem] z-0'
                    >
                        <Card
                            title="Reservation Room"
                            description="Reserve room for your project"
                            href={route('reservation.room')}
                        />
                        <Card
                            title="Reservation Item"
                            description="Reserve item for your project"
                            href={route('reservation.item')}
                        />
                    </div>

                </div>
                <div
                    className='flex flex-row gap-[1rem] w-full min-h-[4rem] bg-biru_tua justify-between items-center 
                    px-[1rem] sm:px-[5rem] xl:px-[10rem]
                    '
                >
                    <div className='flex items-center  h-full bg-biru_muda rounded-l-[0.5rem] rounded-r-[0.5rem]'>
                        <img
                            className='w-[1.5rem] h-full invert-[1]
                            rounded-[0.5rem]
                            ml-[0.5rem]'
                            src="https://www.svgrepo.com/show/532555/search.svg" alt="" />
                        <input
                            onChange={handleSearch}
                            placeholder='Search for your reservation'
                            className='w-[15rem] md:w-[50rem] h-full bg-biru_muda text-white placeholder:text-white
                        placeholder:text-opacity-75 focus:outline-none focus:ring-0 
                        outline-none border-none rounded-[0.5rem]' />
                    </div>
                    <button className='border-white border-[1px] border-opacity-50 py-[0.5rem] px-[1rem] rounded-[2rem] text-white'>Sort by A-Z</button>
                </div>
                <div
                    className='flex flex-col gap-[1rem] w-full min-h-[5rem] p-[1rem] bg-white text-white font-bold py-[1rem] px-[1rem] sm:px-[5rem] xl:px-[10rem]'
                >
                    <h1 className='text-biru_umn font-bold text-[2rem]'>
                        My Reservation
                    </h1>
                    {/* tab */}
                    <div
                        className='flex flex-row gap-[1rem] w-full min-h-[5rem] border-b-[0.2rem] border-biru_umn border-opacity-[50%]'
                    >
                        <button
                            className={`flex w-full min-h-[3rem] justify-center items-center
                            rounded-t-[1rem] transition-all duration-300
                            ${tab === 0 ? 'text-white font-bold bg-biru_umn' : 'text-black font-bold hover:bg-biru_muda hover:text-white'}`}
                            onClick={() => {
                                setTab(0);
                                setReservationData(userRoomReservation);
                            }}
                        >
                            Room Reservation
                        </button>
                        <button
                            className={`flex w-full min-h-[3rem] justify-center items-center
                               rounded-t-[1rem] transition-all duration-300
                               ${tab === 1 ? 'text-white font-bold bg-biru_umn' :
                                    'text-black font-bold hover:bg-biru_muda hover:text-white'}`}
                            onClick={() => {
                                setTab(1);
                                setReservationData(userRoomReservation);
                            }}
                        >
                            Item Reservation
                        </button>
                    </div>
                    <div
                        className='flex flex-col font-bold justify-center gap-[1rem]'
                    >
                        {
                            reservationData?.length === 0 ?
                                <h1
                                    className='text-black uppercase text-[2rem] font-bold py-2 rounded'
                                >
                                    OOOPS! No Reservation Data Found
                                </h1> : null
                        }
                        {
                            reservationData?.map((data: any) => {
                                const { text, color } = statusToString(data.status); // Declare variables here
                                return (
                                    <ReserveCard
                                        {...data}
                                        text={text}
                                        color={color}
                                    />
                                );
                            })
                        }
                    </div>

                </div>
                <div
                    className='w-full h-[20rem] bg-repeat-space bg-[length:5rem] md:bg-[length:10rem]'
                    style={{
                        backgroundImage: `url(${PinewheelImage})`,
                        // backgroundSize: '100px'
                    }}
                />



                {/* // modal if not logged in */}
                {user === null &&
                    <div
                        className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[100] '
                        id="modal"
                    >
                        <div
                            className='bg-white w-[30rem] h-[20rem] flex flex-col justify-center items-center rounded-[1rem]'
                        >
                            <h1
                                className='text-[2rem] font-bold text-center'
                            >
                                Please Login First!
                            </h1>
                            <Link
                                href='/login'
                                className='bg-biru_umn hover:bg-biru_muda text-white font-bold py-2 px-4 rounded'
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                }
                {
                    role === "admin"

                    &&
                    <div
                        className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[100] '
                        id="modal"
                    >
                        <div
                            className='bg-white w-[30rem] h-[20rem] flex flex-col justify-center items-center rounded-[1rem] px-[1rem]'
                        >
                            <h1
                                className='text-[2rem] font-bold text-center'
                            >
                                Admin cannot make reservation!
                            </h1>
                            <Link
                                href='/admin'
                                className='bg-biru_umn hover:bg-biru_muda text-white font-bold py-2 px-4 rounded'
                            >
                                Go to Admin Page
                            </Link>
                        </div>
                    </div>
                }
            </section>
        </Guest>
    )
}


const Card = ({ title, description, href }: any) => {
    return <div>
        <Link
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold flex flex-col
            rounded-[1rem] overflow-hidden'
            href={href}
        >
            <div>
                <img
                    src={HeaderBackgroundImage}
                    className='max-h-[10rem] w-full object-cover' alt="" />
            </div>
            <div className='py-2 px-4 text-center'>
                {title}
                <svg
                    className='inline-block w-4 h-4 ml-2'
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
        </Link>
    </div>
}


const ReserveCard = ({ ...reservation }: any) => {
    const { text, color } = statusToString(reservation.status); // Declare variables here
    return (
        <div
            className='flex flex-row gap-[1rem] bg-white h-[10rem]
            border-b-[0.5px] border-biru_muda border-opacity-[50%] pb-[0rem] sm:pb-[1rem]'
        >
            <img
                className="h-full object-cover hidden sm:block"
                src={reservation.room.image} alt="image"
                onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400"
                }}
            />
            <div className='flex flex-col justify-start text-left w-full'>
                <h3
                    className='text-black font-bold rounded text-[1.5rem]'
                >
                    {
                        reservation.is_item ?
                            `${reservation.item.name}` :
                            `${reservation.room.location} - ${reservation.room.name}`
                    }
                </h3>
                {/* <p>Reservation ID: {reservation.id}</p> */}
                <p
                    className='text-black font-bold py-2 rounded'
                >{formatDateTime(reservation.reservation_start_time)} - {formatDateTime(reservation.reservation_end_time)}</p>
                <p
                    className={`${color} text-white font-bold py-2 px-4 rounded text-center w-full`}
                >
                    {text}
                </p>
            </div>
        </div>
    )
}


function formatDateTime(date: string) {
    const dateObject = new Date(date);

    // Define an array of short day names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Extract day of the week, day, month, year, hour, and minute
    const dayOfWeek = days[dateObject.getDay()];
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'short' });
    const year = dateObject.getFullYear();
    const hour = String(dateObject.getHours()).padStart(2, '0');
    const minute = String(dateObject.getMinutes()).padStart(2, '0');

    // Format the date and time
    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${hour}:${minute}`;

    return formattedDate;
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