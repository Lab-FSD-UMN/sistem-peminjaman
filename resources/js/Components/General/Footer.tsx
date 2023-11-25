import { usePage } from '@inertiajs/react'
import React from 'react'
import ApplicationLogo from '../ApplicationLogo';

export default function Footer() {
    const pageInfo = usePage();
    const [companyData, setCompanyData] = React.useState<any>(pageInfo?.props?.companyData)
    return (
        // style={{ position: "fixed", width: "100%", bottom: 0, zIndex: -100 }}
        <footer className="-mb-5">
            <div className="md:h-24"></div>
            <div className="bg-grey_footer text-white md:fixed w-full bottom-0 md:-z-20">
                <div className="mx-auto w-4/5 max-w-screen-xl py-14">
                    <div className="md:flex md:justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0 space-y-4">
                            <a href="https://flowbite.com/" className="flex items-center">
                                <ApplicationLogo />
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" /> */}
                                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                    {companyData.company_name}
                                </span> */}
                            </a>
                            <p className="text-white text-xs opacity-50">FAKULTAS SENI & DESAIN<br/>UNIVERSITAS MULTIMEDIA NUSANTARA</p>
                            <p className="text-white text-xs opacity-50">Jalan Scientia Boulevard, Gading Serpong Tangerang<br/>15811, Banten, Indonesia</p>
                            <p className="text-white text-xs opacity-50">T +62-21 5422 0808<br/>F +62-21 5422 0800</p>
                        </div>
                        <div className="md:w-1/2 md:space-x-5 flex flex-col md:flex-row">
                            <div className='md:w-1/2 space-y-8 md:space-y-8 mb-10 md:mb-0 flex flex-col justify-between md:justify-normal'>
                                <div className='space-y-2'>
                                    <p className="text-white text-sm">PROGRAM STUDI</p>
                                    <div className='space-y-1'>    
                                        <p className="text-white text-xs opacity-50">Desain Komunikasi Visual</p>
                                        <p className="text-white text-xs opacity-50">Film</p>
                                        <p className="text-white text-xs opacity-50">Arsitektur</p>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <p className="text-white text-sm">INFORMASI LAB FSD</p>
                                    <div className='space-y-1'>    
                                        <p className="text-white text-xs opacity-50">Email : labfsd@umn.ac.id</p>
                                        <div className='flex flex-row items-center space-x-2'>
                                            <div>
                                                <a href="#">
                                                    <img className="w-7" src="https://i.ibb.co/HLyFN9H/instagram.png"/>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <img className="w-7" src="https://i.ibb.co/ZVrppMK/youtube.png"/>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <img className="w-6" src="https://i.ibb.co/QFHXCm4/facebook.png"/>
                                                </a>
                                            </div>
                                        </div>
                                        <a href="/" className="text-white text-xs opacity-50 underline">FAQ</a>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <p className="text-white text-sm">INFORMASI ADMISI</p>
                                    <div className='space-y-1'>    
                                        <p className="text-white text-xs opacity-50">Email : admisi@umn.ac.id</p>
                                        <p className="text-white text-xs opacity-50">Format : Nama, ALamat, No. Telepon, Jurusan yang diminati, dan keterangan</p>
                                    </div>
                                </div>
                            </div>
                            <div className='md:w-1/2 md:space-y-24 md:mb-0 flex flex-row md:flex-col justify-between md:justify-normal'>
                                <div className='space-y-2'>
                                    <p className="text-white text-sm">TAUTAN</p>
                                    <div className='space-y-1'>    
                                        <a href="/" className="text-white text-xs opacity-50">Admisi</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">Single Sign On</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">My UMN</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">E-Learning</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">E-Journals</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">Gapura</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">Service Desk</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">Library Catalog</a><br/>
                                        <a href="/" className="text-white text-xs opacity-50">Career Development Center</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-grey_copyrights flex justify-center w-full py-5">
                    <div>
                        <span className="opacity-60 text-white text-xxs md:text-sm">© 2024 <a href="https://flowbite.com/" className="hover:underline border-r pr-2 mr-3"></a>Fakultas Seni & Desain, 
                        Universitas Multimedia Nusantara</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

