// styling
// import style from '../../../css/Home/HomePage.module.scss';
import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import HeroSection from './Section/HeroSection';
import DescriptionSection from './Section/DescriptionSection';
import InNumbersSection from './Section/InNumbers';
import TestimonySection from './Section/TestimonySection';
import Slider from '@/Components/General/Slider';
// import { SwiperSlide } from 'swiper/vue';
import { SwiperSlide } from 'swiper/react';
import FacilitySection from './Section/FacilitySection';
import HowToSection from './Section/HowToSection';


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
                <div className='flex flex-col justify-center items-center'>
                    <HeroSection
                        homeBackground={companyData.home_bg}
                        heroLogo={companyData.hero_logo}
                        heroTitle={companyData.hero_title}
                        heroSubTitle={companyData.hero_subtitle}
                        heroDescription={companyData.hero_description}
                        labCoorPhoto={companyData.photo_labHead}
                        labCoorName={companyData.name_labHead}
                        labCoorPosition={companyData.position_labHead}
                    />
                    <DescriptionSection
                        sectionTitle={companyData.description_title}
                        sectionDescription={companyData.description_desc}
                    />
                    <InNumbersSection
                        sectionTitle={companyData.inNumbers_title}
                        sectionDescription={companyData.inNumbers_desc}
                    />
                    <FacilitySection />
                    <HowToSection 
                        sectionTitle={companyData.HowTo_title}
                        sectionDescription={companyData.HowTo_desc}
                        labRules_desc={companyData.labRules_desc}
                        reservationFlow_desc={companyData.reservationFlow_desc}
                        reserveNow_desc={companyData.reserveNow_desc}
                    />
                    {/* <TestimonySection
                        {...testimonies}
                    /> */}
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
