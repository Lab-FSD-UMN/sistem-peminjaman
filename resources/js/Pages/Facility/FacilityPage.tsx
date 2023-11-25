// styling
// import style from '../../../css/Home/HomePage.module.scss';
import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import HeroSection from './Section/HeroSection';


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
                </div>
            </Guest>
        </>
    )
}