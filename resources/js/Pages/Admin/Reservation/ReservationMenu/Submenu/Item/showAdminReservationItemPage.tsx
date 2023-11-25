import React, { useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Calendar } from 'primereact/calendar';

export default function ItemReservationPage() {
    const PageInfo = usePage().props;
    return (
        <AdminLayout>
            <section
                className='flex flex-col p-[1rem] gap-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4'
            >
                <h1>
                    Item Reservation Page
                </h1>
                <div
                    className='flex flex-col gap-[1rem] p-[1rem]'
                >
                    <Link
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        href='/admin/reservation/item/schedule'
                    >
                        Monitoring Item Reservation Schedule
                    </Link>
                    <Link
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        href='/admin/reservation/item/data'
                    >
                        Manage Item Data
                    </Link>
                </div>
            </section>
        </AdminLayout>
    )
}
