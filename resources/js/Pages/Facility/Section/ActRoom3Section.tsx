import Slider from "@/Components/General/Slider";
import { usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";
import arrow from "/public/assets/arrow.png"
import PrimaryButton from "@/Components/PrimaryButton";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { GoHorizontalRule } from "react-icons/go";

// type Props = {
//     facilityTitle: string;
//     facilityDescription: string;
// };

function ActRoom3Section() {
    const TestimoniesData: any = usePage().props.testimonies;
    const FacilityData: any = usePage().props.rooms;
    const swiperRef = useRef<Swiper | null>(null);
    const [currentFacilityIndex, setCurrentFacilityIndex] = useState(0);

    function nextSlide() {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
            swiperRef.current.autoplay.start();
            
            if (currentFacilityIndex === filteredTestimonies.length - 1) {
                setCurrentFacilityIndex(0);
            } else {
                setCurrentFacilityIndex(currentFacilityIndex + 1);
            }
        }
    }

    function prevSlide() {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
            swiperRef.current.autoplay.start();
            
            if (currentFacilityIndex === 0) {
                setCurrentFacilityIndex(filteredTestimonies.length - 1);
            } else {
                setCurrentFacilityIndex(currentFacilityIndex - 1);
            }
        }
    }

    const handleSlideChange = () => {
        if (swiperRef.current) {
            if (currentFacilityIndex === filteredTestimonies.length - 1) {
                setCurrentFacilityIndex(0);
            } else {
                setCurrentFacilityIndex(currentFacilityIndex + 1);
            }
        }
    };
    
    const filteredTestimonies = TestimoniesData.filter((facility: any) => facility.name === "John Doe");

    return (
        <div className="FacilitySection flex flex-col md:flex-row items-center justify-end w-4/5 relative overflow-hidden mb-5 md:mb-16">
            <div className="md:w-2/3 md:pr-5 hidden md:block">
                <p className="text-base text-sky-500">Kode Ruangan</p>
                <h1 className="text-2xl font-semibold text-biru_umn">Judul Ruangan</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget</p>
                <div className="space-x-2 mt-5 flex flex-row items-center mr-5">
                    <button 
                        onClick={prevSlide} 
                        className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                        <GoArrowLeft size={25} className="text-center w-full"/></button>
                    <button onClick={nextSlide}
                        className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                    <GoArrowRight size={25} className="text-center w-full"/></button>
                    <GoHorizontalRule size={30} className="text-sky-500"/>
                    <p id="currentIndex" className="text-biru_umn">{currentFacilityIndex + 1}</p>
                    <p className="text-orange">/ {filteredTestimonies.length}</p>
                </div>
            </div>
            <Slider
                swiperRef={swiperRef}
                className="w-full h-72 mt-5 md:mt-0"
                autoplay={{
                    delay: 5000
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 20,
                        centeredSlides: false,
                    },
                }}
                pagination={{
                    clickable: false,
                    el: '.custom-pagination-class'
                }}
                onSlideChange={handleSlideChange}
            >
                {/* nanti seolah akan filter dengan kode ruangan */}
                {filteredTestimonies.map((facility: any) => {
                    return (
                        <SwiperSlide
                            key={facility.id}
                            className="relative w-full"
                        >
                            <img
                                src={facility.image}
                                // src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                                className="rounded-3xl inset-0 w-full h-72 object-cover object-center z-[0] filter brightness-[1]"
                            />
                        </SwiperSlide>
                    );
                })}
            </Slider>
            <div className="md:w-2/3 pt-5 block md:hidden">
                <p className="text-base text-sky-500">Kode Ruangan</p>
                <h1 className="text-2xl font-semibold text-biru_umn">Judul Ruangan</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget</p>
                <div className="space-x-2 mt-5 flex flex-row items-center mr-5">
                    <button 
                        onClick={prevSlide} 
                        className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                        <GoArrowLeft size={25} className="text-center w-full"/></button>
                    <button onClick={nextSlide}
                        className="w-1/5 text-biru_umn rounded-md border-2 border-biru_umn">
                    <GoArrowRight size={25} className="text-center w-full"/></button>
                    <GoHorizontalRule size={30} className="text-sky-500"/>
                    <p id="currentIndex" className="text-biru_umn">{currentFacilityIndex + 1}</p>
                    <p className="text-orange">/ {filteredTestimonies.length}</p>
                </div>
            </div>
        </div>
    );
}

export default ActRoom3Section;
