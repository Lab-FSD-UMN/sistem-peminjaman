import Slider from "@/Components/General/Slider";
import { usePage } from "@inertiajs/react";
import { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import photo1 from "/public/assets/photo 1.png"
import photo2 from "/public/assets/photo 2.png"
import photo3 from "/public/assets/photo 3.png"
import photo4 from "/public/assets/photo 4.png"
import ornament1 from "/public/assets/Ornament_63.png"
import ornament2 from "/public/assets/Ornament_2.png"


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
        <div className="DescriptionSection flex justify-center w-full bg-greyBG mt-32">
            <div className="flex flex-col justify-center items-center w-full">
                <div className="flex flex-col w-full items-center justify-center">
                    <div className="flex flex-row items-center justify-between w-2/3 mb-12 md:mb-0">
                        <div>
                            <div className="-mt-16 md:mt-0 -ml-9 md:ml-0">
                                <img src={photo1} className="-mb-4 w-28 md:w-48"/>
                            </div>
                        </div>
                        <div>
                            <div className="-ml-24 md:-ml-52">
                                <img src={ornament1}
                                    className="absolute -mt-20 w-16 md:w-24"/>
                                <img src={photo4} 
                                    className="absolute w-28 md:w-44 -mt-16 ml-5 md:ml-8"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/5 md:w-1/3 space-y-8">
                        <h1 className="text-4xl font-bold text-center text-biru_umn">What We Do?</h1>
                            <p className="text-gray-600 text-justify">
                                {sectionDescription}. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi
                                ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniamLorem ipsum dolor sit amet consectetur. 
                                Adipiscing at eu aenean justo nullam eu. Ullamcorper 
                                tellus magnis semper et et et. 
                            </p>
                        </div>
                    <div className="flex flex-row items-center justify-between w-2/3 mt-12 md:mt-0">
                        <div>
                            <div className="mt-16 md:mt-0 -ml-5 md:ml-5">
                                <img src={photo2} 
                                    className="absolute w-28 md:w-44 -mt-24 -mr-5 md:mr-8 z-[1]"/>
                                <img src={ornament2}
                                    className="absolute w-16 -mt-8 md:mt-0 md:w-24 z-[0]"/>
                            </div>
                        </div>
                        <div>
                            <div className="-mr-9 md:mr-0">   
                                <img src={photo3} className="-mb-4 w-28 md:w-48"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
