// styling
// import style from '../../../css/Home/HomePage.module.scss';
import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import HeroSection from './Section/HeroSection';
import HighlightsSection from './Section/HighlightsSection';
import ActRoom1Section from './Section/ActRoom1Section';
import ActRoom2Section from './Section/ActRoom2Section';
import ActRoom3Section from './Section/ActRoom3Section';
import ActRoom4Section from './Section/ActRoom4Section';
import ActRoom5Section from './Section/ActRoom5Section';
import ornament3 from '/public/assets/ornament3.png';

export default function FacilityPage({ auth, WebconfigData, cache, helper, testimonies }: PageProps<{ WebconfigData: any, cache: any, helper: string, testimonies: any }>) {
    const currentYear = new Date().getDate();
    const companyData: any = usePage().props.companyData; //get page info
    const data = usePage();
    useEffect(() => {
        console.log("DATA: ", data);
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
                    <HighlightsSection />
                    <div className='relative w-full pt-10 pb-20 flex flex-col items-center justify-center'>
                        <div className='w-4/5'>
                            <h1 className='text-center text-5xl text-biru_umn font-bold mb-10'>Laboratory List</h1>
                        </div>
                        <div className='w-4/5 z-[1]'>
                            <p className='text-center text-xl font-semibold'>FSD Lab is supported by experienced and 
                                expert academic staff to support students learning process and 
                                synergize with the study programme in the faculty of art and design.
                            </p>
                        </div>
                        <img src={ornament3} className='absolute right-0 bottom-0 z-[0]' />
                    </div>
                    <ActRoom1Section />
                    <ActRoom2Section />
                    <ActRoom3Section />
                    <ActRoom4Section />
                    <ActRoom5Section />
                </div>
            </Guest>
        </>
    )
}