// import { StepsProps } from "antd";

type Props = {
    sectionTitle: string;
    sectionDescription: string;
};

type StepProps = {
    key: number,
    title: string,
}

function HowToSection({ sectionTitle, sectionDescription }: Props) {
    return (
        <div className="InNumbersSection py-16 w-4/5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-8">
                {sectionTitle}
            </h1>
            <p className="w-full text-md md:text-xl lg:text-xl mb-8">
                {sectionDescription}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
            </p>
            <div className="flex flex-col md:flex-row items-center">
                {/* nanti mapping di sini */}
                <Step key={0} title="Lab Rules" />
                <Step key={1} title="Loan Flow" />
                <Step key={2} title="Reserve Now" />
            </div>
        </div>
    );
}

function Step({ title }: any) {
    return (
        <div className="w-96 md:flex-grow flex flex-col items-center justify-center p-6 bg-gray-200 rounded-3xl overflow-hidden mb-6 lg:me-6">
            <img
                src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                className="inset-0 w-full h-80 rounded-2xl object-cover object-center mb-4"
            />
            <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        </div>
    );
}

export default HowToSection;
