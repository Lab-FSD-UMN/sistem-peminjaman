import Slider from "@/Components/General/Slider";
import { usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";
import PrimaryButton from "@/Components/PrimaryButton";

// type Props = {
//     facilityTitle: string;
//     facilityDescription: string;
// };

function HighlightsSection() {
    const TestimoniesData: any = usePage().props.testimonies;
    const FacilitiesData: any = usePage().props.facilities;
    const FacilityData: any = usePage().props.rooms;
    const swiperRef = useRef<Swiper | null>(null);
    const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          if (swiperRef.current) {
            swiperRef.current.slideNext();
          }
        }, 2000);
        return () => clearInterval(intervalId);
    }, [swiperRef]);

    // function nextSlide() {
    //     setCurrentFacilityIndex((prevIndex) => (prevIndex + 1) % TestimoniesData.length);
    
    //     if (swiperRef.current) {
    //         swiperRef.current.slideNext();
    //         swiperRef.current.autoplay.start();
    //     }
    // }

    return (
        <div className="FacilitySection flex items-center justify-end w-full relative overflow-hidden">
            <Slider
                swiperRef={swiperRef}
                className="w-full h-72 mb-5"
                // autoplay={{
                //     delay: 5000
                // }}
                breakpoints={{
                    0: {
                        slidesPerView: 1.5,
                        spaceBetween: 20,
                        centeredSlides: true,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                        centeredSlides: true,
                    },
                }}

            >
                {/* nanti yang di map url image */}
                {FacilitiesData.map((facility: any) => {
                    return (
                        <SwiperSlide
                            key={facility.id}
                            className="relative w-full"
                        >
                            <img
                                src={facility.image}
                                // src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                                className="w-full h-60 rounded-3xl object-cover object-center z-[0] filter brightness-[1]"
                            />
                        </SwiperSlide>
                    );
                })}
            </Slider>
        </div>
    );
}

export default HighlightsSection;
