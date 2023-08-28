import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import React, { useEffect } from 'react'
// import { Inertia } from '@inertiajs/inertia'
import Card from '@/Components/Admin/Product/ProductEditCard'
// import ProductEditCard from '@/Components/Admin/Product/ProductEditCard'
import ProductAddCard from '@/Components/Admin/Product/ProductAddCard'
import AdminLayout from '@/Layouts/AdminLayout'

export default function ProductPage({ auth, ProductData }: PageProps<{ ProductData: any }>) {
    
    return (
        <AdminLayout>
            <div
                className='flex flex-row justify-center items-start relative'
            >
                {/* <div
                    className='flex flex-col justify-center items-center p-10'
                >
                    <h1>Add Product</h1>
                    <ProductAddCard />
                </div> */}
                <div
                    className='flex flex-col justify-center items-center  gap-3'
                >
                    <div
                        className='Heading
                    flex flex-col items-center justify-center
                    bg-blue-950 shadow-md p-5 w-full'
                    >
                        <h1
                            className='text-white text-4xl font-semibold mb-3'
                        >
                            Product Configurations
                        </h1>
                        <p
                            className='text-gray-400'
                        >
                            Edit your Product configurations here
                        </p>
                    </div>
                    <div
                        className='justify-center items-center gap-3
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                        '
                    >
                        {
                            ProductData.data?.map((product: any) => {
                                return (
                                    <Card key={product.id}
                                        {...product}
                                    />
                                )
                            }
                            )
                        }

                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}


// ProductPage.layout = (page: React.ReactNode) => <Authenticated>{page}</Authenticated>
