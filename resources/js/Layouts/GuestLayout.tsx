import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/General/Footer';
import Credits from '@/Components/General/Credits';
import Navbar from '@/Components/General/Navbar/Navbar';
import { Link, usePage } from '@inertiajs/react';
import React, { PropsWithChildren, ReactNode } from 'react';

import "@/Styles/global.scss"
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import logoFSD from "/public/assets/logoFSD.png"

export default function Guest({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = React.useState(false);

    const Usepage: any = usePage().props;
    const Role = Usepage.auth.user?.role ? Usepage.auth.user?.role : 'guest';
    useEffect(() => {
        console.log(Role);
    }, [])

    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
            <div className="min-h-screen bg-greyBG">
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
                                        <div className="flex items-center pr-6">
                                            <div className="flex flex-row items-center hover:opacity-50 leading-5 transition duration-150 ease-in-out">
                                                <button onClick={toggleDropdown}
                                                    className="text-sm text-white font-semibold bg-transparent border-none focus:outline-none">
                                                    About</button>
                                                <span><img src="https://i.ibb.co/d5ZCxkj/dropdown-icon.png" className='pl-2' /></span>
                                            </div>
                                            {showDropdown && (
                                                <div className="absolute mt-44 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                    <a href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Vision & Mission</a>
                                                    <a href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Organization Structure</a>
                                                    <a href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lab Coordinators</a>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-row items-center font-medium leading-5 transition duration-150  focus:outline-none
                                            bg-white bg-opacity-50 px-5 py-2 rounded-s-full hover:bg-opacity-30  ease-in-out'>
                                            <div className='mr-2'>
                                                <img src="https://i.ibb.co/gdzWDbZ/Vector.png" />
                                            </div>
                                            <div>
                                                <Link href="/reservation" className='font-semibold text-white'>Reservation</Link>
                                            </div>
                                        </div>
                                        <div className='font-medium leading-4 transition duration-150 ease-in-out focus:outline-none
                                            bg-kuning px-5 py-2 rounded-e-full hover:bg-opacity-80'>
                                            {
                                                Role === "guest" ?

                                                    <NavLink href={route('login')} active={route().current('login')}>
                                                        <a className="text-black font-bold">Login</a>
                                                    </NavLink>
                                                    :
                                                    <NavLink
                                                        active={route().current('logout')}
                                                        method="post" href={route('logout')} as="button">
                                                        <a className="text-black font-bold">Log Out</a>
                                                    </NavLink>
                                            }
                                        </div>
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
                                <div className="pb-2">
                                    <div className="w-full flex flex-col justify-center items-center text-white mb-5 py-4 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
                                        <a href="/about" className="font-medium">About</a>
                                    </div>
                                    <div className="mx-4 mt-2 font-medium text-white py-2 bg-white bg-opacity-50 flex justify-center rounded-full">
                                        <a href="/reservation" className="font-extrabold">Reservation</a>
                                    </div>
                                </div>
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
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>
            <Credits />
            <Footer />
        </>
    );
}


const Route = [
    {
        name: 'Home',
        path: '/',
        route: 'home'
    },
    // {
    //     name: 'About',
    //     path: '/about',
    //     route: 'about'
    // },
    // {
    //     name: 'Products',
    //     path: '/product',
    //     route: 'product'
    // },
    // {
    //     name: 'Gallery',
    //     path: '/gallery',
    //     route: 'gallery'
    // },
    {
        name: 'Contact',
        path: '/contact',
        route: 'contact'
    },

    // {
    //     name: 'Login',
    //     path: '/login',
    //     route: 'login'
    // }
]
