import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react';
// import { Button } from 'antd';
import React, { useEffect } from 'react'
import HeaderBackgroundImage from '@/Assets/image/reservationheroimg.webp'

export default function ReservationRoomPage({ rooms }: any) {
    useEffect(() => {
        console.log("Page Info: ", rooms);
    }, [])
    return (
        <Guest>
            <section
                className='flex flex-col w-full min-h-[5rem]'
            >
                <div
                    className='flex flex-col p-[1rem] gap-[1rem]  text-white font-bold py-[3rem] px-[1rem]
                    sm:px-[5rem] xl:px-[10rem] relative overflow-hidden'
                >
                    <img src={HeaderBackgroundImage} alt="Header Background Image" className='absolute isolate top-0 left-0 z-[0] h-full w-full object-cover' />
                    <div
                        className='flex flex-col gap-[0.1rem] w-full min-h-[5rem] z-[1]'
                    >
                        {/* <h2 className='text-biru_muda'>
                            Room and Item Reservation
                        </h2> */}
                        <h1
                            className='text-[2rem] w-full text-white font-bold'
                        >
                            Laboratory Room Reservation
                        </h1>
                        <p
                            className='text-sm w-full text-white opacity-[70%]'
                        >
                            FSD Lab is a laboratory under the faculty of art and design which functions as a support system for academic studies focused on Faculty of Art and Design, and general support for UMN.
                        </p>
                    </div>
                    <div
                        className='flex gap-[1rem] w-full  z-0'
                    >
                        <Link
                            className='bg-transparent text-white font-bold py-[0.5rem] px-[1rem] rounded-[1.5rem]
                            border-white border-[2px] border-opacity-50 flex flex-row gap-[0.5rem] items-center
                            hover:bg-white hover:bg-opacity-25 duration-75
                            '
                            href='/reservation/'
                        >

                            <img src="https://www.svgrepo.com/show/11307/task-list.svg"
                                className='w-[1.5rem] h-full invert-[1]'
                                alt="" />
                            My Reservation
                        </Link>
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
                            placeholder='Search for your reservation'
                            className='w-[15rem] md:w-[50rem] h-full bg-biru_muda text-white placeholder:text-white
                        placeholder:text-opacity-75 focus:outline-none focus:ring-0 
                        outline-none border-none rounded-[0.5rem]' />
                    </div>
                    <button className='border-white border-[1px] border-opacity-50 py-[0.5rem] px-[1rem] rounded-[2rem] text-white'>Sort by A-Z</button>
                </div>

                {/* Display All Room */}
                <div
                    className='w-full min-h-[5rem] p-[1rem] bg-white text-white font-bold py-[1rem] px-[1rem] sm:px-[5rem] xl:px-[10rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[1rem] '
                >
                    {rooms?.map((room: any) => {
                        return (
                            <Link
                                href={`/reservation/room/${room.id}`}
                                key={room.id}
                                className='w-full h-full flex flex-row rounded-[1rem] aspect-square relative overflow-hidden bg-neutral-400 hover:opacity-50 duration-100'
                            >
                                <img
                                    src={room.image}
                                    alt="image"
                                    className='absolute top-0 left-0 object-cover w-full h-full z-[0]'
                                    onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/150";
                                    }}
                                />
                                <div
                                    className='text-white font-bold py-[0.1rem] px-[1rem] rounded-[1rem] w-fit   right-[0.7rem] top-[0.7rem] absolute text-center bg-biru_tua border-2 border-white'
                                >
                                    {room.location ? room.location : "B000"}
                                </div>
                                <div
                                    id='content'
                                    className='z-[1] absolute bottom-0 bg-biru_umn bg-opacity-50 w-full h-[3rem] flex items-center 
                                    px-[1rem]'>
                                    <div>
                                        {room.name}
                                    </div>
                                </div>
                            </Link>
                        )

                    })}
                </div>
            </section>

        </Guest>
    )
}


function Card({ title, description, href }: any) {
    return (
        <Link
            href={href}
            className='flex flex-col gap-[0.5rem] w-full min-h-[5rem] bg-blue-700 text-white font-bold py-[1rem] px-4 rounded'
        >
            <h1
                className='text-[1.5rem]'
            >
                {title}
            </h1>
            <p
                className='text-sm'
            >
                {description}
            </p>
        </Link>
    )
}