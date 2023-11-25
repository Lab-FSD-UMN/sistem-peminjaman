import React from "react";
// import heroLogo from "/public/assets/Cube FSD 2.png"
import heroBg from "/public/assets/umn background.png"

type Props = {
    heroTitle: string;
    heroSubTitle: string;
    heroDescription: string;
    homeBackground: string;
    labCoorPhoto : string;
    labCoorName: string;
    labCoorPosition: string;
    heroLogo: string;
};

export default function HeroSection({
    heroTitle,
    heroSubTitle,
    heroDescription,
    homeBackground,
    labCoorPhoto,
    labCoorName,
    labCoorPosition,
    heroLogo,
}: Props) {
    return (
        <div className="flex flex-col HeroSection items-center justify-center w-full relative overflow-hidden">
            <img id="hero"
                src={homeBackground}
                // src={heroBg}
                className="absolute inset-0 w-full h-full object-cover object-center
                z-[0] filter brightness-[0.6]"
            />
            <div className="flex justify-center w-full text-center md:text-center text-white z-[10] h-96 lg:h-screen bg-white bg-opacity-70">
                <div className="w-5/6">
                    <h1 className="text-md md:text-2xl lg:text-xl leading-tight mt-24 lg:mt-32 mb-5 text-black font-semibold">
                        {heroTitle}
                    </h1>
                    <h4 className="text-5xl lg:text-7xl font-extrabold mb-6 text-biru_umn">
                        {heroSubTitle}
                    </h4>
                </div>
            </div>
            <img 
                src={heroLogo}
                className="z-[10] absolute w-4/6 md:w-1/3 lg:w-3/5"/>
            <div className="flex justify-center text-justify text-white z-[9] h-96 lg:h-screen w-full bg-biru_muda bg-opacity-70">
                <div className="w-5/6 md:w-4/6 mt-28 lg:mt-72">
                    <img src="https://i.ibb.co/0YbgjHG/tanda-petik.png" className="mb-4 w-5 md:w-7"/>
                    <p className="text-sm md:text-xl lg:text-xl text-white">
                        {heroDescription}. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris.
                    </p>
                    <div className="flex flex-row mt-5">
                        <div>
                            <img 
                                className="bg-blue-700 hover:bg-blue-900 rounded-full object-cover w-12 h-12" 
                                // src={labCoorPhoto}
                                src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                                >
                            </img>
                        </div>
                        <div className="flex flex-col items-start ml-5 h-full">
                            <div className="text-base text-center font-semibold">{labCoorName}</div>
                            <div className="text-base text-center">{labCoorPosition}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
