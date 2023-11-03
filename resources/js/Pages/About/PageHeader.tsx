type Props = {
    pageTitle: string;
    pageSubTitle: string;
    pageDescription: string;
};

export default function PageHeader({
    pageTitle,
    pageSubTitle,
    pageDescription,
}: Props) {
    return (
        <div className="PageHeader relative bg-biru_muda flex items-center w-full h-80 md:h-screen px-6 sm:px-10 md:px-24 relative overflow-hidden">
            <img
                src="https://res.cloudinary.com/dakp66ddf/image/upload/v1692149904/marshlands-8176000_fndgne.webp"
                className="absolute inset-0 w-full h-full object-cover object-center
                z-[0] filter brightness-[0.4] opacity-25
                isolate"
            />
            <div className="text-center md:text-left text-white z-[10]">
                <p className="text-sm md:text-md lg:text-lg mb-3 md:mb-6 text-biru_umn font-semibold tracking-widest drop-shadow-md">
                    {pageSubTitle}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-8">
                    {pageTitle}
                </h1>
                <p className="text-sm md:text-md lg:text-lg">
                    {pageDescription}. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
            </div>
            <div className="absolute right-0 flex flex-col">
                <div className="py-10 md:py-20 px-3 md:px-5 bg-white me-3 md:me-6" />
                <div className="py-4 md:py-8 bg-white ms-6 md:ms-10" />
            </div>
        </div>
    );
}
