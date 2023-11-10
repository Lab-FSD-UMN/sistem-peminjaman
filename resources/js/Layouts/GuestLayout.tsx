import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/General/Footer';
import Navbar from '@/Components/General/Navbar/Navbar';
import { Link } from '@inertiajs/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import "@/Styles/global.scss"
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';

export default function Guest({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = React.useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-biru_umn py-2" style={{ position: "fixed", width: "100%", top: 0, zIndex: 100 }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:w-5/6">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                {/* <div className="shrink-0 flex items-center pr-2">
                                    <Link href="/" className="flex items-center h-5/6">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div> */}
                                <div className="flex items-center">
                                    <a href="/home">
                                        <img src="https://i.ibb.co/4T01gt4/Logo-1-1.png" className="w-3/4"/>
                                    </a>
                                </div>
                            </div>
                            <div className="flex">

                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                    {
                                        Route.map((item, index) => (
                                            <NavLink
                                                key={index} href={route(item.route)} active={route().current(item.route)}>
                                                {item.name}
                                            </NavLink>
                                        ))
                                    }
                                    <div className="flex items-center pt-1">
                                        <div className="flex items-center pr-6">
                                            <div className="flex flex-row items-center hover:opacity-50 leading-5 transition duration-150 ease-in-out">
                                                <button onClick={toggleDropdown}
                                                    className="text-sm text-white font-semibold bg-transparent border-none focus:outline-none">
                                                    ABOUT</button>
                                                <span><img src="https://i.ibb.co/d5ZCxkj/dropdown-icon.png" className='pl-2'/></span>
                                            </div>
                                            {showDropdown && (
                                                <div className="absolute mt-44 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                                <a href="/product" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Vision & Mission</a>
                                                <a href="/product" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Organization Structure</a>
                                                <a href="/product" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lab Coordinators</a>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-row items-center font-medium leading-5 transition duration-150 ease-in-out focus:outline-none
                                            bg-white bg-opacity-50 px-5 py-2 rounded-s-full hover:bg-opacity-30 transition duration-150 ease-in-out'>
                                            <div className='mr-2'>
                                                <img src="https://i.ibb.co/gdzWDbZ/Vector.png" />
                                            </div>
                                            <div>
                                                <Link href="/product" className='font-semibold text-white'>RESERVATION</Link>
                                            </div>
                                        </div>
                                        <div className='font-medium leading-5 transition duration-150 ease-in-out focus:outline-none
                                            bg-orange px-5 py-2 rounded-e-full hover:bg-opacity-80 transition duration-150 ease-in-out'>
                                            <Link href='/product' className='font-semibold text-white'>LOGIN</Link>
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
                        <div className="pt-2 pb-3 space-y-1">
                            {
                                Route.map((item, index) => (
                                    <ResponsiveNavLink href={item.path} active={route().current(item.path)} key={index}>
                                        {item.name}
                                    </ResponsiveNavLink>
                                ))
                            }
                            <div className="px-4">
                                <div className="font-medium text-white pt-2 pb-5">
                                    <a href="/">ABOUT</a>
                                </div>
                                <div className="font-medium text-white pb-2">
                                    <a href="/">RESERVATION</a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4 pt-3">
                                <div className="font-medium text-base text-white">
                                    {/* {user.name} */}
                                    <a href="/">USER</a>
                                </div>
                                <div className="font-medium text-sm text-white">
                                    {/* {user.email} */}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>PROFILE</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
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
            <Footer />
        </>
    );
}


const Route = [
    {
        name: 'HOME',
        path: '/',
        route: 'home'
    },
    // {
    //     name: 'ABOUT',
    //     path: '/product',
    //     route: 'product'
    // },
    {
        name: 'EVENT',
        path: '/gallery',
        route: 'gallery'
    },
    {
        name: 'FACILITY',
        path: '/contact',
        route: 'contact'
    },

    // {
    //     name: 'LOGIN',
    //     path: '/login',
    //     route: 'login'
    // }
]