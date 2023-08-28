import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

export default function AdminPage() {
    return (
        <AdminLayout
        >
            <div
                className='flex flex-col items-center justify-center w-full h-full'
            >
                <div
                    className='Heading
                    flex flex-col items-center justify-center
                    bg-blue-950 shadow-md p-5 w-full
                    '
                >
                    <h1
                        className='text-white text-4xl font-semibold mb-3'
                    >
                        Welcome to Admin Dashboard
                    </h1>
                    <p
                        className='text-gray-400'
                    >
                        Configure your website here
                    </p>
                </div>
            </div>
        </AdminLayout>
    )
}