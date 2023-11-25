import "../../Styles/global.scss";

type Props = {
    pageImage: string;
    pageTitle: string;
    pageSubTitle: string;
    pageDescription: string;
};

export function PageHeaderV1({
    pageImage,
    pageTitle,
    pageSubTitle,
    pageDescription,
}: Props) {
    return (
        <div className="PageHeader relative bg-biru_muda flex items-center w-full h-full md:h-screen px-6 py-20 md:py-auto sm:px-10 md:px-24 relative overflow-hidden">
            <img
                src={pageImage}
                className="absolute inset-0 w-full h-full object-cover object-center
                z-[0] isolate"
            />
            <div className="text-left text-white z-[10]">
                <p className="text-sm md:text-lg lg:text-xl mb-3 md:mb-6 text-sky-800 font-bold font-nunito-sans tracking-[5px]">
                    {pageSubTitle}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-nexa md:leading-[50px] lg:leading-[70px] mb-4 md:mb-8">
                    {pageTitle}
                </h1>
                <p className="text-md lg:text-xl md:font-semibold font-nunito-sans md:leading-[20px] lg:leading-[30px]">
                    {pageDescription}
                </p>
            </div>
            <div className="absolute right-0 flex flex-col hidden md:block">
                <svg
                    className="w-10 md:w-16"
                    viewBox="0 0 58 211"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 0H37V135H0V0Z" fill="white" />
                    <path d="M37 135H58V211H37V135Z" fill="white" />
                </svg>
            </div>
        </div>
    );
}

// Khusus buat halaman Facilities
export function PageHeaderV2({
    pageImage,
    pageTitle,
    pageSubTitle,
    pageDescription,
}: Props) {
    return (
        <div className="PageHeader relative bg-biru_muda flex items-center w-full h-80 md:h-screen px-6 sm:px-10 md:px-24 relative overflow-hidden">
            <img
                src={pageImage}
                className="absolute inset-0 w-full h-full object-cover object-center
                z-[0] isolate"
            />
            <div className="text-center md:text-left text-white z-[10]">
                <p className="text-sm md:text-lg lg:text-xl mb-3 md:mb-6 text-sky-400 font-bold font-nunito-sans tracking-[5px]">
                    {pageSubTitle}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-nexa md:leading-[50px] lg:leading-[70px] mb-4 md:mb-8">
                    {pageTitle}
                </h1>
                <p className="text-sm md:text-md lg:text-xl md:font-semibold font-nunito-sans md:leading-[20px] lg:leading-[30px]">
                    {pageDescription}
                </p>
            </div>
            <div className="absolute right-0 flex flex-col hidden md:block">
                <svg
                    className="w-10 md:w-16"
                    viewBox="0 0 58 211"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 0H37V135H0V0Z" fill="#25C0FF" />
                    <path d="M37 135H58V211H37V135Z" fill="#25C0FF" />
                </svg>
            </div>
        </div>
    );
}
