import axiosClient from '@/Services/axiosClient'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ReservationDashboardPage() {
    const Items: any = usePage().props.items
    useEffect(() => {
        console.log("Items", Items)
    }, [])
    return (
        <div>
            Reservation Dashboard Page
            <CreateItemPage />
            <CreateRoomPage />
            <div className='flex flex-col gap-[1rem]'
            >

                {
                    Items?.map(
                        (item: any) => (
                            <div
                                className='flex flex-col p-[1rem] gap-[1rem] bg-green-400'
                                key={item.id}
                            >
                                <p>Item Name: {item.name}</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
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