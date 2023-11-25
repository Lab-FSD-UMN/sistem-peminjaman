import React from "react";
// import heroLogo from "/public/assets/Cube FSD 2.png"
import heroBg from "/public/assets/FacilityHeroBG.png"
import ornament1 from "/public/assets/ornament1.png"
import supergrafis1 from "/public/assets/Supergrafis1.png"

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
        <div>
            <div className="flex flex-col HeroSection items-center justify-center w-full relative overflow-hidden">
                <img id="hero"
                    // src={homeBackground}
                    src={heroBg}
                    className="absolute inset-0 w-full h-full object-cover object-center
                    z-[0] filter brightness-[0.6]"
                />
                <img src={ ornament1 } className="absolute right-0 -mt-32 md:-mt-48 z-[2] w-10 md:w-auto"/>
                <div className="flex justify-center items-center w-full text-start text-white z-[1] h-96 lg:h-screen bg-biru_umn bg-opacity-50">
                    <div className="w-5/6">
                        <h1 className="text-md md:text-2xl lg:text-xl leading-tight mb-5 lg:mb-7 text-sky-500 font-medium">
                            {heroTitle}
                        </h1>
                        <h4 className="text-xl md:text-4xl lg:text-6xl font-semibold mb-5 lg:mb-7 text-white">
                            {/* {heroSubTitle} */}
                            THIS IS FACILITY SECTION
                        </h4>
                        <p className="text-sm md:text-base lg:text-xl">
                            FSD Lab have 3 laboratory functions, for practice, work, and research. Every laboratory supports the function 
                            of research which is held by lecturers and students from faculty of art and design. Every laboratory have their 
                            own characteristics to support studying and teaching facilities Every academic civitas in faculty of art and 
                            design have access of using laboratory which is supported by campus information system.
                        </p>
                    </div>
                </div>
            </div>
            <img src={supergrafis1} className="w-full -mt-10 md:-mt-32 lg:-mt-56"/>
        </div>
    );
}
