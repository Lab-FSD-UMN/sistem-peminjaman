import AdminLayout from '@/Layouts/AdminLayout'
import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'


export default function ShowAdminReservationItemMonitoringSchedule() {
    const item_schedule: any = usePage().props;
    // const schedule: any = JSON.parse(item_schedule);
    const Nov = item_schedule.November;
    useEffect(() => {
        console.log("Monitoring Props :", item_schedule);
    }, [])
    return (
        <AdminLayout>
            <section>
                <h1>
                    Monitor Item Current Reservation
                </h1>
                <div
                    className='flex flex-col gap-[1rem] relative p-[1rem] bg-blue-700 text-white font-bold py-[1rem] px-4 w-full text-center'
                >
                    <h3>
                        November
                    </h3>
                    {
                        // Nov.map((schedule: any) => {
                        //     return (
                        //         <div>
                        //             <h4>
                        //                 {schedule.reservation_date_start}
                        //             </h4>
                        //             <h4>
                        //                 {schedule.reservation_time_start}
                        //             </h4>
                        //             <h4>
                        //                 {schedule.reservation_date_end}
                        //             </h4>
                        //             <h4>
                        //                 {schedule.reservation_time_end}
                        //             </h4>
                        //         </div>
                        //     )
                        // }
                        // )
                    }
                </div>
            </section>
        </AdminLayout>
    )
}
