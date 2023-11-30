import Slider from "@/Components/General/Slider";
import { usePage } from "@inertiajs/react";
import { useRef } from "react";
import { SwiperSlide } from "swiper/react";

type Props = {
    sectionTitle: string;
    sectionDescription: string;
};

export default function DescriptionSection({
    sectionTitle,
    sectionDescription,
}: Props) {
    const TestimoniesData: any = usePage().props.testimonies;
    const navigationprevref = useRef(null);
    const navigationnextref = useRef(null);

    return (
        <div className="AboutSection flex flex-col-reverse items-center md:flex-row justify-center py-16 w-4/5">
            <div className="overflow-hidden w-full md:w-3/4 relative">
                <Slider
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={false}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        }
                    }}
                    // navigation={{
                    //     prevel: navigationprevref.current,
                    //     nextel: navigationnextref.current,
                    // }}
                >
                    {/* nanti yang di map url image */}
                    {TestimoniesData.map((testimony: any) => {
                        return (
                            <SwiperSlide
                                key={testimony.id}
                                className="flex flex-col items-center justify-center w-full min-h-80 max-h-80 bg-gray-800
                                            rounded-md shadow-md"
                            >
                                <img
                                    src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                                    className="inset-0 w-full h-full object-cover object-center"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Slider>
                {/* ga mau ke tengah T.T, belom isa dipencet juga */}
                <div className="absolute top-0 bottom-0 right-0 z-10">
                    <button
                        ref={navigationnextref}
                        type="button"
                        className=" h-10 w-10 
                                    flex items-center justify-center 
                                    text-blue-700 
                                    bg-white hover:bg-blue-100 bg-opacity-70 
                                    rounded-full 
                                    text-xl p-2.5 text-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 320 512"
                        >
                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-full md: w-1/2 md:ms-12 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4">
                    {sectionTitle}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 whitespace-pre-wrap">
                    {sectionDescription}. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam
                </p>
                {/* <div className="flex justify-center">
                    <button className="btn">
                        Learn More
                    </button>
                </div> */}
            </div>
        </div>
    );
}
