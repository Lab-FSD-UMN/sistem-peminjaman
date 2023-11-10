import Slider from "@/Components/General/Slider";
import { usePage } from "@inertiajs/react";
import { SwiperSlide } from "swiper/react";

import PrimaryButton from "@/Components/PrimaryButton";

type Props = {
    facilityTitle: string;
    facilityDescription: string;
};

function FacilitySection() {
    const TestimoniesData: any = usePage().props.testimonies;
    const FacilityData: any = usePage().props.rooms;

    return (
        <div className="FacilitySection flex items-center justify-end w-full h-96 md:h-screen relative overflow-hidden">
            <Slider
                className="w-full h-full"
                autoplay={{
                    delay: 5000
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                }}
            >
                {/* nanti yang di map url image */}
                {TestimoniesData.map((facility: any) => {
                    return (
                        <SwiperSlide
                            key={facility.id}
                            className="relative w-full"
                        >
                            <img
                                // src={facility.image}
                                src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                                className="absolute inset-0 w-full h-96 md:h-screen object-cover object-center z-[0] filter brightness-[1]"
                            />
                            <div className="absolute flex justify-center items-center h-96 md:h-screen px-16 md:px-40 text-white bg-biru_umn bg-opacity-70">
                                <div>
                                    <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-8">
                                        {/* {facility.name} */}
                                        Lab Photography
                                    </h1>
                                    <p className="w-full lg:w-3/5 text-sm md:text-xl lg:text-xl text-gray-200 mb-4 md:mb-12">
                                        {/* {facility.testimony} */}
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <PrimaryButton className="px-5 py-3 bg-g-500">
                                        Read more
                                        <span><img src="https://i.ibb.co/GFRFKQg/arrow-pendek.png" className="ml-3"/></span>
                                    </PrimaryButton>
                                </div>
                                <div className="hidden md:block">
                                    <a>
                                        <img src="https://i.ibb.co/GFRFKQg/arrow-pendek.png" className="w-20 hover:opacity-70 duration-150 hover:cursor-pointer"/>
                                    </a>
                                </div>
                                {/* <button
                                    type="button"
                                    className="flex items-center justify-center 
                                    text-white
                                    bg-white hover:bg-blue-100 bg-opacity-70 
                                    text-xl p-2.5 text-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                    >
                                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                    </svg>
                                </button> */}
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Slider>
        </div>
    );
}

export default FacilitySection;
