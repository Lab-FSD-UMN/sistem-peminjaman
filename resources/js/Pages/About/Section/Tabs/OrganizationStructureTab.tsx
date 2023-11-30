import StructureDiagram from "@/Components/About/StructureDiagram";

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

export default Structure;