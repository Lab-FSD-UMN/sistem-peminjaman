import { PageProps } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { Popconfirm } from 'antd'


export default function WebConfigPage({ webconfigs }: PageProps<{ webconfigs: any }>) {
    const [tipeCategory, setTipeCategory] = useState<string>('general');
    const handleCategoryClick = (kategori: string) => {
        setTipeCategory(kategori);
    };

    return (
        <AdminLayout>
            <div
                className="text-black flex flex-col justify-center items-center"
            >
                <div
                    className='Heading
                    flex flex-col items-center justify-center
                    bg-blue-950 shadow-md p-5 w-full'
                >
                    <h1
                        className='text-white text-4xl font-semibold mb-3'
                    >
                        Website Configurations
                    </h1>
                    <p
                        className='text-gray-400'
                    >
                        Edit your website configurations here
                    </p>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-center w-4/5 space-y-2 md:space-y-0 md:space-x-4 mt-10 text-center'>
                    <div
                        id='general'
                        className={`w-full md:w-1/4 bg-black border-solid border-2 text-white ${tipeCategory === 'general' ? 
                            'bg-blue-600' : ''}`}
                        onClick={() => handleCategoryClick('general')}
                    >
                        general
                    </div>
                    <div
                        id='home'
                        className={`w-full md:w-1/4 bg-black border-solid border-2 text-white ${tipeCategory === 'home' ? 
                            'bg-blue-600' : ''}`}
                        onClick={() => handleCategoryClick('home')}
                    >
                        home
                    </div>
                    <div
                        id='reservation'
                        className={`w-full md:w-1/4 bg-black border-solid border-2 text-white ${tipeCategory === 'reservation' ? 
                            'bg-blue-600' : ''}`}
                        onClick={() => handleCategoryClick('reservation')}
                    >
                        reservation
                    </div>
                    <div
                        id='contact'
                        className={`w-full md:w-1/4 bg-black border-solid border-2 text-white ${tipeCategory === 'contact' ? 
                            'bg-blue-600' : ''}`}
                        onClick={() => handleCategoryClick('contact')}
                    >
                        contact
                    </div>
                </div>
                <div
                    className='bg-white overflow-hidden sm:rounded-lg
                    w-4/5 md:w-3/5 m-10 flex flex-col shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'
                >
                    {
                        webconfigs.map((webconfig: any) => {
                            if (webconfig.category === tipeCategory) {
                                return (
                                    <WebconfigItemCard key={webconfig.id} {...webconfig} />
                                );
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </AdminLayout>
    )
}


// Card

const WebconfigItemCard = (webconfig: any) => {
    const defaultData = {
        id: webconfig.id,
        title: webconfig.title,
        category: webconfig.category,
        value: webconfig.value,
    }

    const { data, setData, post, processing, errors } = useForm({
        id: webconfig.id,
        title: webconfig.title,
        category: webconfig.category,
        value: webconfig.value,
    })
    // submit form 

    const [isDisabled, setIsDisabled] = React.useState(false);

    // handle change
    const handleChange = (e: any) => {
        const key = e.target.id;
        const value = e.target.value
        setData(data => ({
            ...data,
            [key]: value,
        }))
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(data)
        router.post(`/admin/webconfig`, data, {
            forceFormData: true,
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white overflow-hidden
            py-5 px-10
            w-full flex flex-col gap-3
            border-b-2 border-gray-400"
        >
            <h1 className="text-2xl font-bold">{webconfig.alias}</h1>
            {webconfig.type === 'image' ? (
                <input type='file' className='input border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black'
                    id="value"
                    onChange={(event: any) => setData('value', event.target.files[0])} />
            ) : webconfig.type === 'text' ? (
                <input className="text-gray-500"
                    defaultValue={webconfig.value}
                    onChange={handleChange}
                    id='value'
                />
            ) : webconfig.type === 'textarea' ? (
                <textarea
                    className="text-gray-500"
                    defaultValue={webconfig.value}
                    onChange={handleChange}
                    id='value'
                />
            ) : (
                <input className="text-gray-500"
                    defaultValue={webconfig.value}
                    onChange={handleChange}
                    id='value'
                />
            )}
            {
                webconfig.updated_at &&
                <p className="text-gray-500">Last updated at: {webconfig.updated_at}</p>
            }

            <Popconfirm
                title="Ubah data"
                description="
                Apakah anda yakin ingin mengubah data ini?"
                onConfirm={handleSubmit}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
                disabled={processing}
            >
                <button
                    type='button'
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                    Submit
                </button>
            </Popconfirm>
        </form>
    )
}
