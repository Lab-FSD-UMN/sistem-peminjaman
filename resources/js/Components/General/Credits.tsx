import { usePage } from '@inertiajs/react'
import React from 'react'
import ApplicationLogo from '../ApplicationLogo';
import supergrafis2 from "/public/assets/Supergrafis2.png"

export default function Credits() {
    const pageInfo = usePage();
    const [companyData, setCompanyData] = React.useState<any>(pageInfo?.props?.companyData)
    return (
        <div className='bg-greyBG'>
            <img src={supergrafis2} className="md:-mb-[70px] w-full"/>
            <div className='bg-biru_umn w-full py-14 flex justify-center relative z-20 md:mb-96'>
                <div className='flex flex-col md:flex-row justify-between w-5/6 md:w-4/5'>
                    <div className='flex justify-center mb-8'>
                        <h5 className="text-white text-xl">CREDITS</h5>
                    </div>
                    <div className='md:space-y-20 mb-10 md:mb-0 flex flex-row md:flex-col justify-between md:justify-normal'>
                        <div className='space-y-2 w-1/2 md:w-full'>
                            <p className="text-white text-sm">SUPERVISOR</p>
                            <div className='space-y-1'>    
                                <p className="text-white text-xs opacity-80">Tony Stark</p>
                            </div>
                        </div>
                        <div className='pl-1 md:pl-0 space-y-2 w-1/2 md:w-full'>
                            <p className="text-white text-sm">ACKNOWLEDGEMENT</p>
                            <div className='space-y-1'>    
                                <p className="text-white text-xs opacity-80">Tobey Maguire</p>
                                <p className="text-white text-xs opacity-80">Tom Holland</p>
                                <p className="text-white text-xs opacity-80">Andrew Garfield</p>
                            </div>
                        </div>
                    </div>
                    <div className='md:space-y-20 mb-10 md:mb-0 flex flex-row md:flex-col justify-between md:justify-normal'>
                        <div className='space-y-2 w-1/2 md:w-full'>
                            <p className="text-white text-sm">PROJECT MANAGER</p>
                            <div className='space-y-1'>    
                                <p className="text-white text-xs opacity-80">Aurelius Ivan Wijaya</p>
                            </div>
                        </div>
                        <div className='pl-1 md:pl-0 space-y-2 w-1/2 md:w-full'>
                            <p className="text-white text-sm">WEB DEVELOPER</p>
                            <div className='space-y-1'>    
                                <p className="text-white text-xs opacity-80">Farrel Dinarta</p>
                                <p className="text-white text-xs opacity-80">Maecyntha Irelynn Tantra</p>
                                <p className="text-white text-xs opacity-80">Prudence Tendy</p>
                                <p className="text-white text-xs opacity-80">Rasyid Alim Aulia</p>
                                <p className="text-white text-xs opacity-80">Rivo Juicer Wowor</p>
                            </div>
                        </div>
                    </div>
                    <div className='md:space-y-10 flex flex-row md:flex-col justify-between md:justify-normal'>
                        <div className='space-y-2 w-1/2 md:w-full'>
                            <p className="text-white text-sm">UI & UX DESIGNER</p>
                            <div className='space-y-1'>    
                                <p className="text-white text-xs opacity-80">Hendie Jason Achmadi</p>
                                <p className="text-white text-xs opacity-80">Muhammad Daffa Akbari Arissaputra</p>
                                <p className="text-white text-xs opacity-80">Silvia Theresia Onggo</p>
                            </div>
                        </div>
                        <div className='pl-1 md:pl-0 space-y-2 w-1/2 md:w-full'>
                            <p className="text-white text-sm">VERSION & CHANGELOG</p>
                            <div className='space-y-1'>    
                                <p className="text-white text-xs opacity-80">1.1.1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

