type MissionProps = {
    missionIndex: string;
    missionTitle: string;
    missionDescription: string;
};

function MissionSection() {
    // Placeholder
    var desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <div className="MissionSection w-full px-[8vw] md:px-20 my-20">
            <div className="items-start text-biru_umn text-4xl md:text-5xl font-bold font-nexa mb-3 md:mb-6">
                Mission
            </div>

            <div className="flex flex-col lg:flex-row justify-start items-start mt-6 lg:mt-0 gap-6 lg:gap-12">
                {/* nanti mapping ae */}
                <Missions missionIndex="01" missionTitle="Lorem Ipsum" missionDescription={desc}/>
                <Missions missionIndex="02" missionTitle="Lorem Ipsum" missionDescription={desc}/>
                <Missions missionIndex="03" missionTitle="Lorem Ipsum" missionDescription={desc}/>
            </div>
        </div>
    );
}

function Missions({
    missionIndex,
    missionTitle,
    missionDescription,
}: MissionProps) {
    return (
        <div className="justify-start items-start gap-5 inline-flex">
            <div className="grow shrink basis-0 text-orange text-2xl md:text-3xl font-normal leading-[40px] ">
                {missionIndex}
            </div>
            <div>
                <div className="text-biru_muda text-xl md:text-2xl font-bold leading-10">
                    {missionTitle}
                </div>
                <div className="text-justify text-black text-opacity-60 text-base font-normal leading-[30px]">
                    {missionDescription}
                </div>
            </div>
        </div>
    );
}

export default MissionSection;
