import AdminLayout from '@/Layouts/AdminLayout'
import axiosClient from '@/Services/axiosClient';
import { router, useForm, usePage } from '@inertiajs/react'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'

export default function ShowAdminReservationItemDataPage() {
    const ItemData: any = usePage().props.items;
    useEffect(() => {
        console.log(ItemData)
    }, [])
    return (
        <AdminLayout>
            <section
                className='flex flex-col gap-[1rem] relative p-[1rem]'
            >
                <h1
                    className='text-2xl font-bold w-full text-center'
                >
                    Configure Item Data
                </h1>
                <div
                    className='flex flex-col gap-[2rem] p-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4 w-full text-center'
                >
                    Search Bar (nanti disini kali)
                </div>

                <CreateItemModalComponent />
                <div
                    className='grid grid-cols-4 gap-4'
                >
                    {ItemData.map((item: any) => {
                        useEffect(() => {
                            console.log(item.item_images)
                        }, [])
                        return (
                            <div
                                key={item.id}
                                className='flex flex-col gap-[1rem] p-[0.5rem] bg-blue-700 text-white font-bold w-full text-center'
                            >

                                <div>
                                    {
                                        item.item_images.length > 0 ?
                                            <img

                                                src={item.item_images[0].link}
                                                alt=""
                                                className='w-full object-cover h-[10rem]'
                                                onError={(e: any) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://via.placeholder.com/150"
                                                }}
                                            />
                                            :
                                            <img
                                                src="https://via.placeholder.com/150"
                                                alt=""
                                                className='w-full object-cover h-[10rem]'

                                            />
                                    }
                                </div>
                                <div
                                    className='flex flex-col gap-[0.5rem] px-[0.5rem] bg-blue-700 text-white font-bold  w-full text-center'
                                    key={item.id}
                                >
                                    <h1
                                        className='text-2xl font-bold w-full text-center'
                                    >
                                        {item.name}
                                    </h1>
                                    <div
                                        className='flex flex-col gap-[1rem] bg-blue-700 text-white font-bold w-full text-center'
                                    >
                                        <p
                                            className='text-2xl font-bold w-full text-center'
                                        >
                                            {item.description}
                                        </p>
                                        <p
                                            className='text-2xl font-bold w-full text-center'
                                        >
                                            {item.price}
                                        </p>
                                        <p
                                            className='text-2xl font-bold w-full text-center'
                                        >
                                            Status : {item.is_available ? "Available" : "Unavailable"}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className='bg-blue-100 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded w-full'
                                >
                                    Edit
                                </button>
                                <button
                                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full'
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            </section>
        </AdminLayout>
    )
}




const CreateItemModalComponent = () => {
    // const [image, setImage] = React.useState(null);
    const { data, setData, post, progress } = useForm({
        name: "",
        description: "",
        quantity: "",
        image: "",
    })


    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.post('/item', data, {
            forceFormData: true,
        })
    }
    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value
        setData((data: any) => ({
            ...data,
            [key]: value,
        }))
    }


    useEffect(() => {
        // console.log("Form Data", formik.values)
        console.log("Image", data)
    }, [data])

    // modal logic
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full pointer-events-auto'
                onClick={() => setShowModal(true)}
            >
                Add Item +
            </button>
            <section
                className={`${showModal ? "flex" : "hidden"} fixed z-10 overflow-y-auto
                w-full h-full justify-center items-center bg-[rgba(0,0,0,0.5)] p-[1rem]`}
                onClick={() => setShowModal(false)}
            >
                <form
                    className={` overflow-y-auto bg-white rounded-lg p-[1rem] w-full min-h-fit justify-center items-center flex flex-col gap-[1rem]
                    `}
                    onClick={e => e.stopPropagation()}
                    onSubmit={handleSubmit}
                >
                    <div
                        className='flex flex-col text-black font-bold w-full text-left'
                    >
                        <label htmlFor="name">Title</label>
                        <input
                            onChange={handleChange}
                            className='text-black font-bold py-2 px-4 rounded'
                            type="text" name="name" id="name" />
                    </div>
                    <div
                        className='flex flex-col text-black font-bold w-full text-left'
                    >
                        <label htmlFor="name">Quantity</label>
                        <input
                            onChange={handleChange}
                            className='text-black font-bold py-2 px-4 rounded'
                            type="number" name="quantity" id="quantity" />
                    </div>
                    <div
                        className='flex flex-col text-black font-bold w-full text-left'
                    >
                        <label htmlFor="name">Description</label>
                        <input
                            onChange={handleChange}
                            className='text-black font-bold py-2 px-4 rounded'
                            type="text" name="description" id="description" />
                    </div>
                    <div
                        className='flex flex-col text-black font-bold w-full text-left'
                    >
                        <label htmlFor="name">Image</label>
                        <input
                            accept='image/*'
                            onChange={(event: any) => setData('image', event.target.files[0])}
                            className='text-black font-bold py-2 px-4 rounded'
                            type="file" name="name" id="name" />
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                    >
                        Submit
                    </button>
                </form>
            </section >
        </>
    )
}
