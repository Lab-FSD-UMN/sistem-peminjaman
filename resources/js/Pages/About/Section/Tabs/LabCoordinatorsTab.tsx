import { useState, useEffect } from "react";
import listCoor from "./CoorData";

function Coordinators() {
    return (
        <div className="Coordiinators px-8 md:px-28 flex-col justify-start items-center gap-5 md:gap-10 inline-flex">
            <div className="text-biru_umn text-3xl md:text-4xl font-bold font-nexa">
                Lab Coordinators
            </div>
            <form>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                                stroke="#005596"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="search-bar"
                        className="w-[75vw] md:w-[70vw] h-12 py-3 ps-16 bg-white rounded-xl border border-neutral-200 justify-start items-center text-sm rounded-lg focus:ring-biru_muda focus:border-biru_muda block text-base font-normal"
                        placeholder="Search by title or name..."
                    />
                </div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-8">
                {/* MAPPING DATA */}
                {listCoor.map((coor) => {
                    return (
                        <LabCard
                            coorName={coor.name}
                            coorFaculty={coor.faculty}
                        />
                    );
                })}
            </div>
        </div>
    );
}

type LabProps = {
    coorName: string;
    coorFaculty: string;
};

function LabCard({ coorName, coorFaculty }: LabProps) {
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

    // Get image dynamically
    useEffect(() => {
        const loadImage = async () => {
            // Taking the first name
            const imageName = coorName.split(" ")[0];
            try {
                // import image based on their first name
                const module = await import(
                    `../../../../../../public/images/labCoor/${imageName}LabCoorImage.png`
                );
                setImageSrc(module.default);
            } catch (error) {
                console.error("Error loading image: ", error);
            }
        };

        loadImage();
    }, [coorName]);

    return (
        <div className="relative rounded-xl inset-0 object-cover object-center overflow-hidden">
            <div
                className="
                absolute 
                flex justify-end items-start flex-col
                text-left gap-2
                opacity-0 hover:opacity-100
                w-full h-full p-4
                bg-biru_umn/50 
                top-0 bottom-0 left-0 right-0
                transition duration-500 ease-in-out
                cursor-default"
            >
                <p className="font-semibold text-white">{coorName}</p>
                <p className="font-md text-xs md:text-sm text-white">
                    {coorFaculty}
                </p>
            </div>
            <img src={imageSrc} alt={coorName} />
        </div>
    );
}

export default Coordinators