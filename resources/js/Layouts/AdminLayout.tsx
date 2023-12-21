import Navbar from '@/Components/General/Navbar/Navbar'
import React, { PropsWithChildren, ReactNode, useState, useEffect } from 'react'
import "@/Styles/global.scss"
import { Link, usePage } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { User } from '@/types'
import NavLink from '@/Components/NavLink'
import Dropdown from '@/Components/Dropdown'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import Credits from '@/Components/General/Credits'
import Footer from '@/Components/General/Footer'


export default function AdminLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const Usepage: any = usePage().props;
    const Role = Usepage.auth.user?.role ? Usepage.auth.user?.role : 'guest';

    useEffect(() => {
        console.log(Role);
    }, [])

    // const [showDropdown, setShowDropdown] = useState(false);
    // const toggleDropdown = () => {
    //     setShowDropdown(!showDropdown);
    // };

    return (
        <>
            <div className="min-h-screen bg-grayBG">
                <div className="bg-biru_navbar flex justify-center py-2">
                    <div className="w-4/5 flex flex-row space-x-5 justify-center md:justify-end">
                        <div><p className='text-gray-100 text-sm font-medium'>UMN</p></div>
                        <div><p className='text-gray-100 text-sm font-medium'>FSD</p></div>
                        <div><p className='text-gray-100 text-sm font-medium'>DKV</p></div>
                        <div><p className='text-gray-100 text-sm font-medium'>FILM</p></div>
                        <div><p className='text-gray-100 text-sm font-medium'>ARS</p></div>
                    </div>
                </div>
                <nav className="bg-biru_umn py-2 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:w-5/6">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <a href="/">
                                        <ApplicationLogo />
                                        {/* <img src={logoFSD}/> */}
                                    </a>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    {
                                        Route.map((item, index) => (
                                            <NavLink
                                                key={index} href={route(item.route)} active={route().current(item.route)}
                                                className='pt-1'>
                                                {item.name}
                                            </NavLink>
                                        ))

                                    }
                                    <div className="flex items-center pt-1">

                                        <Link href="/admin/reservation" className='flex flex-row items-center font-medium leading-5 transition duration-150  focus:outline-none
                                            bg-white bg-opacity-50 px-5 py-2 rounded-s-full hover:bg-opacity-30  ease-in-out'>
                                            <div className='mr-2'>
                                                <img src="https://i.ibb.co/gdzWDbZ/Vector.png" />
                                            </div>
                                            <div>
                                                <div className='font-semibold text-white'>Reservation</div>
                                            </div>

                                        </Link>

                                        {
                                            Role === "guest" ?
                                                <NavLink
                                                    href={route('login')}
                                                    active={route().current('login')} as="button"
                                                    className='font-medium leading-4 focus:outline-none
                                        bg-kuning px-5 py-2 rounded-e-full hover:bg-opacity-80 transition duration-150 ease-in-out'>
                                                    <a className="text-black font-bold">Log in</a>
                                                </NavLink>
                                                :
                                                <NavLink
                                                    active={route().current('logout')}
                                                    method="post" href={route('logout')} as="button"
                                                    className='font-medium leading-4 focus:outline-none
                                            bg-kuning px-5 py-2 rounded-e-full hover:bg-opacity-80 transition duration-150 ease-in-out'>
                                                    <a className="text-black font-bold">Log Out</a>
                                                </NavLink>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="-mr-1 flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="h-screen">
                            <div className="pt-14 pb-3 space-y-1">
                                {
                                    Route.map((item, index) => (
                                        <ResponsiveNavLink href={item.path} active={route().current(item.path)} key={index}>
                                            {item.name}
                                        </ResponsiveNavLink>
                                    ))
                                }
                            </div>

                            <div>
                                <div className="px-4">
                                    <div className="font-medium text-base text-white bg-orange flex justify-center py-2 rounded-full">
                                        {/* {user.name} */}
                                        <a href="/" className="font-extrabold">User</a>
                                    </div>
                                    <div className="font-medium text-sm text-white">
                                        {/* {user.email} */}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                    {
                                        Role === "guest" ?

                                            <ResponsiveNavLink href={route('login')} active={route().current('login')}>
                                                Login
                                            </ResponsiveNavLink>
                                            :
                                            <ResponsiveNavLink
                                                active={route().current('logout')}
                                                method="post" href={route('logout')} as="button">
                                                Log Out
                                            </ResponsiveNavLink>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </nav >

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )
                }

                <main>{children}</main>
            </div >
            {/* <Credits />
            <Footer /> */}
        </>
    )
}


const Route = [
    {
        name: 'Dashboard',
        path: '/admin',
        route: 'admin.index'
    },
    {
        name: 'Web Config',
        path: '/admin/webconfig',
        route: 'admin.webconfig'
    },
    {
        name: 'Product Config',
        path: '/admin/product',
        route: 'admin.product'
    },
    {
        name: 'Gallery Config',
        path: '/admin/gallery',
        route: 'admin.gallery'
    },
    // {
    //     name: 'Reservation',
    //     path: '/admin/reservation',
    //     route: 'admin.reservation.index'
    // }
]
