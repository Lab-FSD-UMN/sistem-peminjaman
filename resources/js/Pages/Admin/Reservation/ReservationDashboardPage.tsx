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
                className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
            >
                <h1>
                    Reservation Dashboard Page
                </h1>
                <LinkButton href='/admin/reservation/list'>
                    Reservation List & Approval
                </LinkButton>
                <LinkButton href='/admin/reservation/item'>
                    Item Reservation
                </LinkButton>
                <LinkButton href='/'>
                    Room Reservation
                </LinkButton>
                <LinkButton href='/admin/reservation/history'>
                    Reservation History
                </LinkButton>
            </section>
        </AdminLayout>
    )
}

const LinkButton = ({ href, children }: any) => {
    return (
        <Link
            href={href}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
            {children}
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
            className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
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