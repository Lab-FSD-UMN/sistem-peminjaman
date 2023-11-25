import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

type SliderProps = {
    children: React.ReactNode;
    slidesPerView?: number;
    spaceBetween?: number;
    centeredSlides?: boolean;
    loop?: boolean;
    autoplay?: boolean | {
        delay: number
    }
    pagination?: boolean | {
        clickable: boolean
    },
    // navigation?: {
    //     prevel: HTMLElement | null;
    //     nextel: HTMLElement | null;
    // };
    breakpoints?: {
        [key: number]: {
            slidesPerView: number;
            spaceBetween: number;
            // centeredSlides: boolean;
        };
    };
    className?: string;
    swiperRef: React.MutableRefObject<any>;
};

export default function Slider({ children, swiperRef, ...props }: SliderProps) {
    return (
        <Swiper
            slidesPerView={2}
            spaceBetween={50}
            loop={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
            onSwiper={(swiper: any) => {
                if (swiper) {
                    swiperRef.current = swiper;
                }
            }}
            modules={[Pagination, Navigation, A11y, Autoplay]}
            navigation={false}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    // centeredSlides: true,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                },
            }}
            className="w-full h-full max-w-7xl overflow-visible gap-[2.66rem]"
            {...props}
        >
            {children}
        </Swiper>
    );
}
