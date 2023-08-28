import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function ProductCard({ ProductData }: PageProps<{ ProductData: any }>) {
    return (
        <>
            <div className="
        p-4 w-full border-2 border-gray-300 shadow-sm rounded-md flex flex-col justify-center items-center hover:shadow-md transition duration-300">
                <h1 className="text-2xl w-full text-center font-bold mb-2">{ProductData.title}</h1>
                <h2 className="text-gray-500 mb-2">{ProductData.created_at}</h2>
                {ProductData.image.image && (
                    <img
                        src={ProductData.image.image}
                        alt={ProductData.title}
                        className="w-full h-[15rem] object-cover rounded-md mb-2"
                    />
                )}
                <p className="
            text-ellipsis
            overflow-hidden
            text-gray-800 line-clamp-3 h-full">{ProductData.description}</p>
                <Link
                    href={`/product/${ProductData.slug}`}
                    className="mt-2 text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out rounded-md p-2 text-center w-full"
                >
                    Read More
                </Link>
            </div>

        </>
    )
}
