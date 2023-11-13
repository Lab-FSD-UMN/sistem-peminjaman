type Props = {
    sectionTitle: string;
    sectionDescription: string;
};

type CardProps = {
    title: string;
    description: string;
};

function InNumbersSection({ sectionTitle, sectionDescription }: Props) {
    return (
        <div className="InNumbersSection mt-32 pb-32 md:pb-72 w-full flex justify-center relative bg-white">
            <div className="w-4/5">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 text-center text-biru_umn">
                    {sectionTitle}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-14 whitespace-pre-wrap text-justify">
                    {sectionDescription}. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                </p>
                <div className="flex flex-col">
                    {/* nanti mapping di bawah sini.. mungkin(?) */}
                    <div className="flex flex-col lg:flex-row">
                        <Card
                            title="Headings"
                            description="Lorem ipsum dolor sit amet."
                        />
                        <Card
                            title="Headingo"
                            description="Lorem ipsum dolor sit amet."
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row">
                        <Card
                            title="Headings"
                            description="Lorem ipsum dolor sit amet."
                        />
                        <Card
                            title="Headingo"
                            description="Lorem ipsum dolor sit amet."
                        />
                    </div>
                </div>
            </div>
            <img src="https://i.ibb.co/SX2GgRq/Supergrafis.png" className="bottom-0 md:-mb-36 absolute w-full"/>
        </div>
    );
}

function Card({ title, description }: CardProps) {
    return (
        <div className="w-full p-8 flex items-center border rounded-2xl mb-4 lg:me-4 bg-gradient-to-r from-white to-transparent">
            <div className="flex-shrink-0 w-20 h-20 rounded-full">
                <img
                    src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                    className="inset-0 rounded-full w-full h-full object-cover object-center"
                />
            </div>
            <div className="ms-10">
                <p className="text-xl md:text-2xl font-semibold mb-2">
                    {title}
                </p>
                <p className="text-sm md:text-md ">{description}</p>
            </div>
        </div>
    );
}

export default InNumbersSection;
