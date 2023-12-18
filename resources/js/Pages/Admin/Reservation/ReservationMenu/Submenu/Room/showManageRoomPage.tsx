import AdminLayout from '@/Layouts/AdminLayout'
import axiosClient from '@/Services/axiosClient'
import { router } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function showManageRoomPage({ room }: any) {
    const [modal, setModal] = React.useState(false)
    const [imagePreview, setImagePreview] = React.useState<any>(null)

    const [data, setData] = React.useState<any>({
        name: "",
        location: "",
        description: "",
        image: "",
    })

    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value
        setData({
            ...data,
            [key]: value
        })
    }


    const handleImageUpload = (e: any) => {
        setData({
            ...data,
            image: e.target.files[0]
        })
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("image", data.image)
        formData.append("name", data.name)
        formData.append("location", data.location)
        formData.append("description", data.description)
        // console.log("Form Data", data.image)
        axiosClient.post(`/room/create`, formData)
            .then((res) => {
                console.log("Success", res)
                setModal(false)
                router.reload()
            }).catch((err) => {
                console.log("Error", err)
            })
    }

    useEffect(() => {
        console.log("Data :", data)
    }, [data])

    return (
        <>
            <AdminLayout>
                <section
                    className='gap-[1rem font-bold w-full text-center'
                >
                    {/* Search Item */}
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
                                type="text" name="search" id="search" placeholder='Search Room Name ...'
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

                    {/*  Room Data */}
                    <section
                        className='gap-[1rem font-bold w-full text-center py-[1rem] px-[1rem]
                    sm:px-[5rem] xl:px-[10rem] '
                    >
                        <div
                            className='w-full flex justify-between mb-[1rem] items-center'
                        >
                            <h1
                                className='text-4xl font-bold text-left text-biru_umn w-full py-[1rem] px-4'
                            >
                                Room Data
                            </h1>
                            <button
                                onClick={() => setModal(true)}
                                className="gap-4 bg-biru_umn hover:bg-opacity-50 text-white font-bold rounded-[1rem] items-center inline-flex flex-nowrap w-[3rem] h-[3rem] justify-center"
                            >
                                +
                            </button>

                        </div>
                        <div
                            //grid
                            className='grid grid-cols-3 gap-4'
                        >
                            {room.map((data: any) => {
                                return (
                                    <Card
                                        {...data}
                                    />
                                )

                            })}
                        </div>
                    </section>
                </section>



            </AdminLayout>
            {/* modal add */}
            <div>
                <div
                    className={`fixed z-[100] inset-0 overflow-y-auto ${modal ? "block" : "hidden"}`}
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setModal(false)}
                >
                    <div
                        className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'
                    >
                        <div
                            className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
                            aria-hidden="true"
                        ></div>
                        <span
                            className='hidden sm:inline-block sm:align-middle sm:h-screen'
                            aria-hidden="true"
                        >&#8203;</span>
                        <form
                            onClick={(e) => e.stopPropagation()}
                            className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                        >
                            <div
                                className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'
                            >
                                <div
                                    className='sm:flex sm:items-start'
                                >
                                    <div
                                        className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'
                                    >
                                        <h3
                                            className='text-lg leading-6 font-medium text-gray-900'
                                            id="modal-title"
                                        >
                                            Add Room
                                        </h3>
                                        {/* add room form */}
                                        <div
                                            className='mt-2'
                                        >
                                            <input
                                                onChange={handleChange}
                                                type="text" name="name" id="name" placeholder='Room Name'
                                                className='w-full bg-gray-50 text-black font-bold py-2 px-4 rounded
                                        items-center placeholder-black my-[1rem] truncate'
                                            />
                                            <input
                                                onChange={handleChange}
                                                type="text" name="location" id="location" placeholder='Room Location'
                                                className='w-full bg-gray-50 text-black font-bold py-2 px-4 rounded
                                        items-center placeholder-black my-[1rem] truncate'
                                            />
                                            {/* <input
                                                onChange={handleChange}
                                                type="text" name="status" id="status" placeholder='Room Status'
                                                className='w-full bg-gray-50 text-black font-bold py-2 px-4 rounded
                                        items-center placeholder-black my-[1rem] truncate'
                                            /> */}
                                            <input
                                                onChange={handleChange}
                                                type="text" name="description" id="description" placeholder='Room Description'
                                                className='w-full bg-gray-50 text-black font-bold py-2 px-4 rounded
                                        items-center placeholder-black my-[1rem] truncate'
                                            />
                                            <input
                                                onChange={handleImageUpload}
                                                type="file"
                                                accept='image/*'
                                                name="image" id="image" placeholder='Room Image'
                                                className='w-full bg-gray-50 text-black font-bold py-2 px-4 rounded
                                        items-center placeholder-black my-[1rem] truncate'
                                            />
                                            {imagePreview && (
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className='w-full h-[10rem] object-cover rounded-[1rem]
                                                    my-[1rem]'
                                                />
                                            )}
                                        </div>
                                        <button
                                            disabled={data.name == "" || data.location == "" || data.description == "" || data.image == ""}
                                            onClick={handleSubmit}
                                            type="button"
                                            className='bg-biru_umn hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded-[1rem] items-center inline-flex flex-nowrap w-full h-[3rem] justify-center
                                            disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'
                            >
                                <button
                                    onClick={() => setModal(false)}
                                    type="button"
                                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm'
                                >
                                    Close
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}




const Card = ({ ...data }: any) => {
    const [modal, setModal] = React.useState(false)


    //delete room
    const handleDelete = (id: any) => {
        axiosClient.delete(`/room/${id}/delete`).then((res) => {
            console.log("Success", res)
            setModal(false)
            router.reload()
        }).catch((err) => {
            console.log("Error", err)
        })
    }
    return (
        <>
            <button

                onClick={() => setModal(true)}
                className='flex flex-row gap-[1rem]  bg-blue-700 text-white font-bold py-[1rem] px-4 w-full rounded-[1rem]
            items-center'
            >
                <img
                    className='w-[7rem] h-[7rem] rounded-[1rem] object-cover'
                    src={data.image}
                    alt={data.name}
                    onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150"
                    }}
                />
                <div
                    className='flex flex-col gap-[0.5rem] w-full'
                >
                    <h2
                        className='text-white font-bold text-[1.5rem] text-left'
                    >
                        {data.location} - {data.name}
                    </h2>
                    <p>
                        {data.status}
                    </p>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        View Detail
                    </button>
                </div>
            </button>


            {/* Modal */}
            <div
                className={`fixed z-10 inset-0 overflow-y-auto ${modal ? "block" : "hidden"}`}
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div
                    className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'
                >
                    <div
                        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
                        aria-hidden="true"
                    ></div>
                    <span
                        className='hidden sm:inline-block sm:align-middle sm:h-screen'
                        aria-hidden="true"
                    >&#8203;</span>
                    <div
                        className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                    >
                        <div
                            className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'
                        >
                            <div
                                className='sm:flex sm:items-start'
                            >
                                <div
                                    className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'
                                >
                                    <h3
                                        className='text-lg leading-6 font-medium text-gray-900'
                                        id="modal-title"
                                    >
                                        {data.location} - {data.name}
                                    </h3>
                                    <div
                                        className='mt-2'
                                    >
                                        <p
                                            className='text-sm text-gray-500'
                                        >
                                            {data.description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(data.id)}
                                        type="button"
                                        className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'
                        >
                            <button
                                type="button"
                                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm'
                                onClick={() => setModal(false)}
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