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
        <div className="InNumbersSection py-16 w-4/5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-4">
                {sectionTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 whitespace-pre-wrap">
                {sectionDescription}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </p>
            <div className="flex flex-col">
                {/* nanti mapping di bawah sini.. mungkin(?) */}
                <div className="flex flex-col lg:flex-row">
                    <Card
                        title="Headings"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua."
                    />
                    <Card
                        title="Headingo"
                        description="Durururu Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua."
                    />
                </div>
                <div className="flex flex-col lg:flex-row">
                    <Card
                        title="Headings"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua."
                    />
                    <Card
                        title="Headingo"
                        description="Durururu Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua."
                    />
                </div>
            </div>
        </div>
    );
}

function Card({ title, description }: CardProps) {
    return (
        <div className="w-full p-5 flex items-center border rounded-md mb-4 lg:me-4">
            <div className="flex-shrink-0 w-40 h-40 rounded-full">
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
