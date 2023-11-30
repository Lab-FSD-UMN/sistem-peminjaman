import { useState, useEffect } from "react";
import evenList from "./EventData";

type EventsProps = {
    category: "DKV" | "GENERAL" | "FILM" | "LOREM";
    date: string;
    title: string;
    image: string;
    content: string;
    snippet?: string;
};

function EventsSection() {
    return (
        <div className="EventsGallery px-12 md:px-22 lg:px-28 my-16 flex-col justify-center items-center gap-5 inline-flex">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-top gap-8">
                {evenList.map((event) => {
                    return <EventCard event={event} />;
                })}
            </div>
        </div>
    );
}

function EventCard({ event }: { event: EventsProps }) {
    const catColor = (cat = event.category) => {
        if (cat === "DKV") return "orange";
        else if ((cat === "FILM")) return "fuchsia-800";
        else return "biru_muda";
    };

    return (
        <div className="flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-full">
                <img
                    className="w-full self-stretch grow shrink basis-0 rounded-[1.6vw]"
                    src="https://via.placeholder.com/373x240"
                    // src={event.image}
                />
            </div>
            <div className="w-full flex-col flex-grow justify-start items-start gap-6 flex">
                <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch">
                        <span
                            className={`text-${catColor()} text-base font-semibold`}
                        >
                            {event.category}{" "}
                        </span>
                        <span className="text-black text-opacity-40 text-base font-semibold">
                            • {event.date}
                        </span>
                    </div>
                    <div className="flex-col justify-start items-start gap-1 flex">
                        <div className="self-stretch text-sky-800 text-[28px] font-bold font-nexa">
                            {event.title}
                        </div>
                        <div className="self-stretch grow shrink basis-0 text-black text-opacity-60 text-base font-normal leading-[30px]">
                            {event.content}
                        </div>
                    </div>
                </div>
                <button className="px-6 py-2 bg-sky-600 hover:bg-biru_umn rounded-full justify-center items-center gap-2 inline-flex transition duration-150">
                    <div className="text-white text-base font-semibold">
                        Read more
                    </div>
                    <div className="w-6 h-6 relative">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 12H19M19 12L13 6M19 12L13 18"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default EventsSection;
