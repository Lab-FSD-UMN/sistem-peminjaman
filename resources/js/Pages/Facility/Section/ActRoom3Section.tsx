import Slider from "@/Components/General/Slider";
import { usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";
import PrimaryButton from "@/Components/PrimaryButton";
import { GoHorizontalRule } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";


// type Props = {
//     facilityTitle: string;
//     facilityDescription: string;
// };

function ActRoom3Section() {
    const TestimoniesData: any = usePage().props.testimonies;
    const FacilitiesData: any = usePage().props.facilities;
    const FacilityData: any = usePage().props.rooms;
    const swiperRef = useRef<Swiper | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);

    function nextSlide() {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
            swiperRef.current.autoplay.start();
        }
    }

    function prevSlide() {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
            swiperRef.current.autoplay.start();
        }
    }

    return (
        <div className="FacilitySection flex items-center justify-center w-4/5 relative overflow-hidden">
            {/* <div className="w-2/5 pr-5">
                <p className="text-base text-sky-500">Kode Ruangan</p>
                <h1 className="text-2xl font-semibold text-biru_umn">Judul Ruangan</h1>
                <p>Description Ruan gan Descr iption Ruan gan Descri ption Ruan gan Descri ption Ruan gan 
                    Descri ption Ruan gan Descri ption Ruan gan Descri ption Ruan gan</p>
            </div> */}
            {/* <div className="w-3/5"> */}
                <Slider
                    onSlideChange={(swiper: any) => {
                        // Update the active index state when the slide changes
                        setActiveIndex(swiper.realIndex);
                    }}
                    swiperRef={swiperRef}
                    className="w-full md:h-80 mb-5"
                    autoplay={{
                        delay: 5000,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                            centeredSlides: false,
                        },
                    }}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination-class'
                    }}

                >
                    {/* nanti yang di map url image */}
                    {FacilitiesData.map((facility: any, index: any) => {
                        return (
                            <SwiperSlide
                                key={facility.id}
                                className="relative w-full"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                                    {activeIndex === index && (
                                        <div className="md:w-2/5 md:pr-5 hidden md:block">
                                            <p className="text-base text-sky-500">Kode Ruangan</p>
                                            <h1 className="text-2xl font-semibold text-biru_umn">{facility.name}</h1>
                                            <p>{facility.description}</p>
                                            <div className="space-x-2 mt-5 flex flex-row items-center mr-5">
                                                <button onClick={prevSlide} 
                                                    className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                                                    <GoArrowLeft size={25} className="text-center w-full"/></button>
                                                <button onClick={nextSlide}
                                                    className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                                                    <GoArrowRight size={25} className="text-center w-full"/></button>
                                                <GoHorizontalRule size={30} className="text-sky-500"/>
                                                <p className="text-biru_umn">{facility.id}</p>
                                                <p className="text-orange">/ {TestimoniesData.length}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="md:w-3/5">
                                        <img
                                            src={facility.image}
                                            className="w-full h-72 rounded-3xl object-cover object-center z-[0] filter brightness-[1]"
                                        />
                                    </div>
                                    {activeIndex === index && (
                                        <div className="block md:hidden mt-2 px-3 md:px-0">
                                            <p className="text-base text-sky-500">Kode Ruangan</p>
                                            <h1 className="text-2xl font-semibold text-biru_umn">Judul Ruangan</h1>
                                            <p>
                                                Description Ruan gan Descr iption Ruan gan Descri ption Ruan gan Descri ption Ruan gan Descri ption Ruan
                                                gan Descri ption Ruan gan Descri ption Ruan gan
                                            </p>
                                            <div className="space-x-2 mt-5 flex flex-row items-center mr-5">
                                                <button onClick={prevSlide} 
                                                    className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                                                    <GoArrowLeft size={25} className="text-center w-full"/></button>
                                                <button onClick={nextSlide}
                                                    className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                                                    <GoArrowRight size={25} className="text-center w-full"/></button>
                                                <GoHorizontalRule size={30} className="text-sky-500"/>
                                                <p className="text-biru_umn">{facility.id}</p>
                                                <p className="text-orange">/ {TestimoniesData.length}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                    {/* <div className="custom-pagination-class absolute text-end"></div> */}
                </Slider>
            {/* </div> */}
        </div>
    );
}

export default ActRoom3Section;
