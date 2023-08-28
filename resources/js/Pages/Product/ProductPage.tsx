import ProductCard from '@/Components/Product/ProductCard'
import Guest from '@/Layouts/GuestLayout'
import { PageProps } from '@/types'
import { Head, Link } from '@inertiajs/react'
import React, { useEffect } from 'react'


export default function ProductPage({ auth, ProductData }: PageProps<{ ProductData: any }>) {
    useEffect(() => {
        console.log(ProductData)
    }, [])
    return (
        <>
            <Head>
                <title>Product</title>
                <meta name="description" content="Product" />
                <meta name="keywords" content="Product" />
            </Head>
            <Guest>
                <div
                    className='flex flex-col items-center'
                >
                    <div
                        className='Heading
                    flex flex-col items-center justify-center
                    bg-gray-700 shadow-md p-5 w-full
                    '
                    >
                        <h1
                            className='text-white text-4xl font-semibold mb-3'
                        >Product
                        </h1>
                        <p
                            className='text-gray-400
                            text-center
                            '
                        >
                            This is Product Page for showing all the products
                        </p>
                    </div>
                    <div
                        className='grid grid-cols-1 justify-center items-center gap-2
                        w-full md:grid-cols-2 md:gap-4 md:px-4
                        lg:grid-cols-4 lg:gap-4 lg:px-4
                        py-6
                        '>
                        {
                            ProductData?.data.map((product: any) => {
                                return <ProductCard key={product.id} ProductData={product} auth={auth} />
                            })
                        }
                    </div>
                    <div
                        className='flex flex-row justify-center items-center w-full
                        flex-wrap
                        py-6
                        '
                    >
                        {ProductData?.links.map((link: any) => {
                            return (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    className={`p-2 m-2 border-2 rounded-md shadow-sm m-y shadow-red-100  ${link.active && "text-white bg-black"}`}
                                >
                                    {`${link.label}`}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </Guest>
        </>
    )
}
