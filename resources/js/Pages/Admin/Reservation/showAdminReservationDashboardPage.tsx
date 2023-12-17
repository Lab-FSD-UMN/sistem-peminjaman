import AdminLayout from '@/Layouts/AdminLayout'
import Guest from '@/Layouts/GuestLayout'
import axiosClient from '@/Services/axiosClient'
import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ReservationDashboardPage() {
    const Items: any = usePage().props.items;
    const Info = usePage();
    useEffect(() => {
        console.log("pageInfo", Info);
    }, [])
    return (
        <AdminLayout>
            <section
                className='bg-blue-700 text-white font-bold py-[1rem] px-4 w-full text-center'
            >
                <h1>
                    Admin Reservation Dashboard
                </h1>
                <br />
                <div
                    className='flex flex-row p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
                >
                    <LinkButton href='/admin/reservation/list'>
                        Reservation Monitoring
                    </LinkButton>
                    <LinkButton href='/admin/reservation/history'>
                        Reservation History
                    </LinkButton>
                </div>
            </section>
        </AdminLayout>
    )
}

const LinkButton = ({ href, children }: any) => {
    return (
        <Link
            href={href}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-[1rem] overflow-hidden 
            flex flex-col gap-[0.5rem] items-center w-[10rem]'
        >
            <img
                //  placeholder
                src="https://via.placeholder.com/50"
                alt=""
                className='w-full inline-block rounded'
            />
            <div
                className='text-left px-[0.5rem] pb-[0.5rem] w-full flex flex-row align-middle justify-between items-center'
            >
                {children}
                <svg width="141px" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
        </Link>
    )
}


// interface FormType {
//     name: string;
// }

function CreateItemPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        quantity: "",
        description: "This is a description",
    });

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value
        setData((data: any) => ({
            ...data,
            [key]: value,
        }))
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        axiosClient.post(`/item`, data).then((res) => {
            console.log("Success", res)
        }
        ).catch((err) => {
            console.log("Error", err)
        })
        // reset()
    }

    useEffect(() => {
        console.log("Form Data", data)
    }, [data])

    return (
        <form
            className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4
            '
        >
            <h1>
                Create Item
            </h1>
            <input
                onChange={handleChange}
                placeholder='Input Item Name'
                className='text-black font-bold py-2 px-4 rounded'
                type="text" name="name" id="name" />

            <input
                onChange={handleChange}
                placeholder='Input Item quantity'
                className='text-black font-bold py-2 px-4 rounded'
                type="number" name="quantity" id="quantity" />
            <textarea
                onChange={handleChange}
                placeholder='Input Item Description'
                className='text-black font-bold py-2 px-4 rounded'
                name="description" id="description" cols={30} rows={10}></textarea>
            <button
                onClick={handleSubmit}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                type='submit'
            >
                Create Item
            </button>
        </form>
    )
}



function CreateRoomPage() {
    return (
        <div>
            CreateRooms
        </div>
    )
}