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
        <div className="AboutSection flex justify-center h-96 lg:h-screen mb-32 md:mb-0 lg:mb-10 w-full bg-white">
            <div className="flex items-center flex-col justify-center pt-20 pb-16 w-4/5 absolute">
                <div className="flex justify-center items-center">
                    <div className="flex h-96 lg:h-screen justify-center">
                        <div className="hidden lg:block flex flex-col justify-between">
                            <div className="w-56">
                                <img src="https://i.ibb.co/4WtjCfs/photo-1.png"/>
                            </div>
                            <div className="w-56 mt-56">
                                <img src="https://i.ibb.co/4WtjCfs/photo-1.png"
                                    className="absolute w-44 -mt-12 ml-8"/>
                                <img src="https://i.ibb.co/rtg0j9C/Ornament-2-removebg-preview.png"
                                    className="w-32"/>
                            </div>
                        </div>
                        <div className="lg:w-2/3 space-y-8 md:mt-10 lg:mt-36">
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
                        <div className="hidden lg:block flex flex-col justify-between">
                            <div>
                                <img src="https://i.ibb.co/xLkczXD/Ornament-63-removebg-preview.png"
                                    className="w-24"/>
                                <img src="https://i.ibb.co/4WtjCfs/photo-1.png" 
                                    className="absolute w-44 -mt-16 ml-8"/>
                            </div>
                            <div className="w-56 mt-64">
                                <img src="https://i.ibb.co/4WtjCfs/photo-1.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
