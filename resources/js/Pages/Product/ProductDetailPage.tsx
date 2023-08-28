import { PageProps } from '@/types'
import React, { useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Guest from '@/Layouts/GuestLayout'
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';



export default function ProductDetailPage({ auth, ProductData, RecommendedProduct }: PageProps<{ auth: any, ProductData: any, RecommendedProduct: any }>) {
    useEffect(() => {
        console.log(ProductData)
        console.log(RecommendedProduct)
    }, [])

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Copied to clipboard',
            // descrPiption:
            //     'Copied to clipboard',
        });
    };
    return (
        <>
            {contextHolder}
            <Guest>
                <div className="flex items-start min-h-screen bg-gray-100">
                    <div className="w-2/3 p-10">
                        <div className="bg-white rounded-lg shadow-lg p-6 
                    ">
                            <h1 className="text-4xl font-semibold mb-2">{ProductData.title}</h1>
                            <h2 className="text-gray-500 mb-4">{ProductData.created_at}</h2>
                            {ProductData.image && (
                                <img
                                    src={ProductData.image.image}
                                    alt={ProductData.title}
                                    className="w-full h-80 object-cover rounded-lg mb-4"
                                />
                            )}

                            <div
                                className='flex gap-2'
                            >
                                <button
                                    className='bg-blue-500 text-white px-4 py-2 rounded-lg
                                hover:bg-blue-300 transition-colors duration-300'
                                >
                                    Share
                                </button>
                                <button
                                    className='bg-blue-500 text-white px-4 py-2 rounded-lg
                                hover:bg-blue-300 transition-colors duration-300'
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        openNotificationWithIcon('success')
                                    }}
                                >
                                    Copy Link
                                </button>
                            </div>
                            <p className="
                        
                        text-lg my-5
                        whitespace-pre-wrap
                        first-letter:capitalize first-letter:font-extrabold
                        first-letter:mb-4 first-letter:text-4xl
                        "
                            >
                                {ProductData.description}</p>
                        </div>
                    </div>
                    <div className="w-1/3 p-10">
                        <div className="grid gap-4">
                            {RecommendedProduct?.map((product: any) => (
                                <Link
                                    href={route('product.detail', product.slug)}
                                    key={product.id} className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform">
                                    <img
                                        src={product.image.image}
                                        alt={product.title}
                                        className="w-full h-40 object-cover rounded-lg mb-2"
                                    />
                                    <h1 className="text-lg font-semibold">{product.title}</h1>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Guest >
        </>
    )
}
