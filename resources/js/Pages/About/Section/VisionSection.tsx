import React, { useState } from "react";

type Props = {
    sectionTitle: string;
    sectionDescription: string;
};

function VisionSection({
    sectionTitle,
    sectionDescription,
}: Props) {

    return (
        <div className="VisionSection w-full px-[8vw] md:px-20">
            <div className="items-start text-biru_umn text-4xl md:text-5xl font-bold font-nexa mb-3 md:mb-6">
                Vision
            </div>
            {/* Pakein Accordion disini (nanti mapping data) */}
            <div className="flex flex-col md:flex-row justify-start items-start gap-12">
                <div className="text-justify text-black text-opacity-60 text-lg md:text-xl font-normal md:leading-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5">
                        <div className="pt-2 pb-2.5 border-b border-orange justify-start items-center inline-flex">
                            <h4 className="text-orange text-xl md:text-2xl font-bold">
                                1. Kreatif dan Inovatif
                            </h4>
                        </div>
                        <p className="text-justify text-zinc-800 text-base font-semibold leading-[25px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="pt-2 pb-2.5 border-b border-gray justify-start items-center inline-flex">
                            <h4 className="text-biru_muda text-xl md:text-2xl font-bold">
                                2. Kompeten
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="pt-2 pb-2.5 border-b border-gray justify-start items-center inline-flex">
                            <h4 className="text-biru_muda text-xl md:text-2xl font-bold">
                                3. Bertaraf Internasional
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="pt-2 pb-2.5 border-b border-gray justify-start items-center inline-flex">
                            <h4 className="text-biru_muda text-xl md:text-2xl font-bold">
                                4. Wirausaha
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="pt-2 pb-2.5 border-b border-gray justify-start items-center inline-flex">
                            <h4 className="text-biru_muda text-xl md:text-2xl font-bold">
                                5. Berbudi pekerti luhur
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisionSection