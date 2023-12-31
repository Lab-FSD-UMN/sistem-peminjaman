import Slider from '@/Components/General/Slider'
import { usePage } from '@inertiajs/react'
import React, { useEffect, useRef } from 'react'
import { SwiperSlide } from 'swiper/react'
import { Swiper } from "swiper";
// import "swiper/swiper.min.css";
import 'swiper/css';

export default function TestimonySection(Testimonies: any) {
    const TestimoniesData: any = usePage().props.testimonies
    useEffect(() => {
        // console.log("testimonies :")
        console.log(TestimoniesData)
    }, [])
    const swiperRef = useRef<Swiper | null>(null);
    return (
        <div

            className='flex flex-col items-center justify-center w-full h-96 bg-gray-800 overflow-hidden'
        >
            <h1
                className='text-4xl font-bold text-center text-white'
            >
                Apa kata mereka?
            </h1>
            <div
                className='overflow-hidden'
            >
                <Slider
                    swiperRef={swiperRef}
                    className="w-full h-72 mt-5 md:mt-0"
                    autoplay={{
                        delay: 5000
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            centeredSlides: false,
                        },
                    }}
                >
                    {
                        TestimoniesData.map((testimony: any) => {
                            return (
                                <SwiperSlide
                                    key={testimony.id}
                                    className='flex flex-col items-center justify-center w-full  bg-gray-800
                                                border-2 border-gray-700 rounded-md shadow-md max-w-2xl h-screen
                                                p-4 m-2
                                                '
                                >
                                    <h1
                                        className='
                                    text-2xl font-bold text-left text-white'
                                    >
                                        {testimony.name}
                                    </h1>
                                    <h2
                                        className='text-xl font-semibold text-left text-gray-200'
                                    >
                                        {testimony.position}
                                    </h2>
                                    <p
                                        className='text-left text-gray-400'
                                    >
                                        {testimony.testimony}
                                    </p>
                                </SwiperSlide>
                            )
                        }
                        )
                    }
                </Slider>
            </div>
        </div>
    )
}
