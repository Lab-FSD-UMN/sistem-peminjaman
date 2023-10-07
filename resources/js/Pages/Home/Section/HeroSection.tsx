import React from "react";

type Props = {
    heroTitle: string;
    heroSubTitle: string;
    heroDescription: string;
};

export default function HeroSection({
    heroTitle,
    heroSubTitle,
    heroDescription,
}: Props) {
    return (
        <div className="HeroSection bg-black flex items-center justify-end w-full h-screen px-6 relative overflow-hidden">
            <img
                src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                className="absolute inset-0 w-full h-full object-cover object-center
                z-[0] filter brightness-[0.4]
                isolate"
            />
            <div className="max-w-3xl text-center md:text-left text-white z-[10]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
                    {heroTitle}
                </h1>
                <h4 className="text-2xl md:text-3xl lg:text-4xl text-gray-100 mb-6">
                    {heroSubTitle}
                </h4>
                <p className="text-md md:text-xl lg:text-xl text-gray-300">
                    {heroDescription}. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat
                </p>
            </div>
        </div>
    );
}
