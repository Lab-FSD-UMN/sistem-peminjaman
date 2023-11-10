import { StepsProps } from "antd";

type Props = {
    sectionTitle: string;
    sectionDescription: string;
};

type StepProps = {
    key: number,
    title: string,
    color: string,
}

function HowToSection({ sectionTitle, sectionDescription }: Props) {
    return (
        <div className="InNumbersSection py-16 w-4/5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-8 text-center text-biru_umn">
                {sectionTitle}
            </h1>
            <p className="w-full text-md md:text-xl lg:text-xl mb-8 text-justify text-gray-600">
                {sectionDescription}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
            </p>
            <div className="flex flex-col md:flex-row items-center mt-20">
                {/* nanti mapping di sini */}
                <Step key={0} title="Lab Rules" color="bg-sky-400"/>
                <Step key={1} title="Reservation Flow" color="bg-sky-600"/>
                <Step key={2} title="Reserve Now" color="bg-sky-800"/>
            </div>
        </div>
    );
}

function Step({ key, title, color }: StepProps) {
    return (
        <div key={key} className="md:w-96 md:flex-grow flex flex-col items-center justify-center overflow-hidden mb-6 lg:me-6">
            <div id="tes" className={`p-6 rounded-3xl ${color} align-center mb-6`}>
                <img
                    src="https://i.ibb.co/WsZXqPc/Vector.png"
                    className="inset-0 w-30 h-30 rounded-2xl object-cover object-center"
                />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        </div>
    );
}

export default HowToSection;
