import StructureDiagram from "@/Components/About/StructureDiagram";
import React, { useState } from "react";

function TabSection() {
    const [tab, setTab] = useState(2);

    const tabStyle = {
        base: "hover:text-gray-600 hover:bg-gray-50",
        active: "text-white bg-biru_umn",
    };

    return (
        <div className="TabSection flex flex-col items-center justify-center text-center w-full py-20">
            <ul className="flex flex-wrap mb-10 md:mb-20 text-sm font-medium text-center text-gray-500 border-b border-gray-400">
                <li className="me-2" onClick={() => setTab(1)}>
                    <div
                        className={`inline-block py-3 px-10 md:px-16 rounded-t-xl cursor-pointer ${
                            tab == 1 ? tabStyle.active : tabStyle.base
                        }`}
                    >
                        Organization Structure
                    </div>
                </li>
                <li className="me-2" onClick={() => setTab(2)}>
                    <div
                        className={`inline-block py-3 px-10 md:px-16 rounded-t-xl cursor-pointer ${
                            tab == 2 ? tabStyle.active : tabStyle.base
                        }`}
                    >
                        Lab Coordinators
                    </div>
                </li>
            </ul>
            {tab == 1 ? <Structure /> : <Coordinators />}
        </div>
    );
}

function Structure() {
    const structureData = [
        {
            title: "Laboratory Coordinator",
            desc: "Directly under the faculty Dean, the Coordinator will help coordinate, plan, and manage laboratories and the study programme's expectations.",
        },
        {
            title: "Laboratory OFFicer", // huruf f nya aneh
            desc: "Will help Laboratory Coordinator manage and execute the laboratory programme and tutor students in supplementary classes. Each officer will be responsible for their respective laboratories tied with their expertise.",
        },
        {
            title: "Associate Laboratory Assistant",
            desc: "Students could apply to help laboratory officers to operate in specific tasks in their respective laboratories with a contract term of 1 semester.",
        },
    ];

    return (
        <div className="Structure px-8 md:px-28 flex-col justify-start items-center gap-5 md:gap-10 inline-flex">
            <div className="text-biru_umn text-3xl md:text-4xl font-bold font-nexa">
                Organization Structure
            </div>
            <div className="self-stretch text-center text-black ext-opacity-60 text-md md:text-xl">
                FSD Lab is supported by experienced and expert academic staff to
                support students learning process and synergize with the study
                programme in the faculty of art and design.
            </div>
            <StructureDiagram />
            <div className="flex flex-col gap-8 md:gap-10">
                {structureData.map((lab: any) => {
                    return (
                        <div className="flex-col justify-start items-start gap-2 inline-flex">
                            <div className="text-sky-800 text-2xl md:text-3xl font-bold font-nexa">
                                {lab.title}
                            </div>
                            <div className="self-stretch text-justify text-black text-opacity-60 text-md md:text-xl font-semibold">
                                {lab.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Coordinators() {
    return (
        <div className="Structure px-8 md:px-28 flex-col justify-start items-center gap-5 md:gap-10 inline-flex">
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
            <div className="grid grid-cols-4 gap-8">
                <div className="relative absolute inset-0 object-cover object-center overflow-hidden">
                    <p className="absolute top-1/2 left-1/2">YAHYAHA</p>
                    <img
                        className="rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default TabSection;
