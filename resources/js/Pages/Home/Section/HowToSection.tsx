import vector from "/public/assets/vector.png"
import recycle from "/public/assets/recycle.png"
import checklist from "/public/assets/checklist.png"

type Props = {
    sectionTitle: string;
    sectionDescription: string;
    labRules_desc: string;
    reservationFlow_desc: string;
    reserveNow_desc: string;
};

type StepProps = {
    key: number,
    title: string,
    color: string,
}

function HowToSection({ 
    sectionTitle, 
    sectionDescription, 
    labRules_desc,
    reservationFlow_desc,
    reserveNow_desc,
}: Props) {
    return (
        <div className="InNumbersSection pt-20 md:pt-28 pb-24 w-full flex justify-center relative w-full bg-greyBG">
            <div className="md:mb-0 w-4/5">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-8 text-center text-biru_umn">
                    {sectionTitle}
                </h1>
                <p className="w-full text-md md:text-xl lg:text-xl mb-8 text-justify text-gray-500">
                    {sectionDescription}. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
                <div className="flex flex-col items-center mt-20">
                    {/* nanti mapping di sini
                    <Step key={0} title="Lab Rules" color="bg-sky-400"/>
                    <Step key={1} title="Reservation Flow" color="bg-sky-600"/>
                    <Step key={2} title="Reserve Now" color="bg-sky-800"/> */}

                    {/* https://i.ibb.co/8xZndP6/arrow-panjang.png */}
                    <div className="flex flex-col md:flex-row w-3/4 justify-between items-center">
                        <div className="p-6 bg-sky-400 rounded-3xl align-center mb-6">
                            <img
                                src={vector}
                                className="inset-0 w-30 h-30 object-cover object-center"
                            />
                        </div>
                        <div className="md:p-6 block md:hidden">
                            <h2 className="text-xl md:text-2xl font-semibold text-center">Lab Rules</h2>
                            <p className="text-sm text-gray-500 text-center mt-8">
                                {labRules_desc}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <img src="https://i.ibb.co/8xZndP6/arrow-panjang.png" className="py-20 md:py-0 w-2/3 rotate-90 md:rotate-0"/>
                        </div>
                        <div  className="p-6 bg-sky-600 rounded-3xl align-center mb-6">
                            <img
                                src={recycle}
                                className="inset-0 w-30 h-30 object-cover object-center"
                            />
                        </div>
                        <div className="md:-6 block md:hidden">
                            <h2 className="text-xl md:text-2xl font-semibold text-center">Reservation Flow</h2>
                            <p className="text-sm text-gray-500 text-center mt-8">
                                {reservationFlow_desc}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <img src="https://i.ibb.co/8xZndP6/arrow-panjang.png" className="py-20 md:py-0 w-2/3 rotate-90 md:rotate-0"/>
                        </div>
                        <div className="p-6 bg-sky-800 rounded-3xl align-center mb-6">
                            <img
                                src={checklist}
                                className="inset-0 w-30 h-30 object-cover object-center"
                            />
                        </div>
                        <div className="md:p-6 block md:hidden">
                            <h2 className="text-xl md:text-2xl font-semibold text-center">Reserve Now</h2>
                            <p className="text-sm text-gray-500 text-center mt-8">
                                {reserveNow_desc}
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-row w-full justify-between">
                        <div className="p-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-center">Lab Rules</h2>
                            <p className="text-sm text-gray-500 text-center mt-8">
                                {labRules_desc}
                            </p>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-center">Reservation Flow</h2>
                            <p className="text-sm text-gray-500 text-center mt-8">
                                {reservationFlow_desc}
                            </p>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-center">Reserve Now</h2>
                            <p className="text-sm text-gray-500 text-center mt-8">
                                {reserveNow_desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// function Step({ key, title, color }: StepProps) {
//     return (
//         <div key={key} className="md:w-96 md:flex-grow flex flex-col items-center justify-center overflow-hidden mb-6 lg:me-6">
//             <div id="tes" className={`p-6 rounded-3xl ${color} align-center mb-6`}>
//                 <img
//                     src="https://i.ibb.co/WsZXqPc/Vector.png"
//                     className="inset-0 w-30 h-30 rounded-2xl object-cover object-center"
//                 />
//             </div>
//             <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
//             <p className="text-sm text-gray-500 text-center mt-8 w-4/5">
//                 Lorem ipsum dolor sit amet, consectetur
//                 adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//                 dolore magna aliqua.
//             </p>
//         </div>
//     );
// }

export default HowToSection;
