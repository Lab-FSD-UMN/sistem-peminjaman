// styling
// import style from '../../../css/Home/HomePage.module.scss';
import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import HeroSection from './Section/HeroSection';
import DescriptionSection from './Section/DescriptionSection';
import TestimonySection from './Section/TestimonySection';
import Slider from '@/Components/General/Slider';
import { SwiperSlide } from 'swiper/vue';


export default function HomePage({ auth, WebconfigData, cache, helper, testimonies }: PageProps<{ WebconfigData: any, cache: any, helper: string, testimonies: any }>) {
    const currentYear = new Date().getDate();
    const companyData: any = usePage().props.companyData; //get page info
    useEffect(() => {
        console.log(companyData);
    }, [])

    return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
            </Head>
            <Guest>
                <div
                    className='flex flex-col justify-center items-center'
                >
                    <HeroSection
                        companyName={companyData.company_name}
                        companyDescription={companyData.company_description}
                    />
                    <DescriptionSection
                        companyDescription={companyData.company_description}
                    />
                    <TestimonySection
                        {...testimonies}
                    />
                    <div>
                        {/* {
                            WebconfigData.map((webconfig: any) => {
                                return (
                                    <div key={webconfig.id}
                                        className='p-4 m-2 w-full  border-2 rounded-md shadow-sm m-y shadow-red-100'
                                    >
                                        <h1
                                            className='text-2xl'
                                        >{webconfig.alias}</h1>
                                        <p>{webconfig.value}</p>
                                    </div>
                                )
                            }
                            )
                        } */}

                     
                    </div>
                </div>
            </Guest>
        </>
    )
}