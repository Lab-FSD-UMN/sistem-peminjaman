import React from 'react'

type Props = {
    companyName: string,
    companyDescription: string
}

export default function HeroSection({ companyName, companyDescription }: Props) {
    return (
        <div className="HeroSection bg-black flex items-center justify-center w-full h-screen px-6
        relative overflow-hidden
        ">
            <img
                src='https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp'
                className="absolute inset-0 w-full h-full object-cover object-center
                z-[0] filter brightness-[0.2]
                isolate"
            />
            <div className="max-w-3xl mx-auto text-center text-white
            z-[10]
            ">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                    {companyName}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8">
                    {companyDescription}
                </p>
                <button className="btn ">
                    Learn More
                </button>
            </div>
        </div>


    )
}
