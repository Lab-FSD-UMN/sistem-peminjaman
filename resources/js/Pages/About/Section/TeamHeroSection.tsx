import heroImage from "../../../../../public/images/teamHeroSection.png";

function TeamHeroSection() {
    return (
        <div className="TeamHeroSection relative bg-white flex items-center justify-center w-full h-full px-5 md:px-auto py-48 md:py-auto md:h-[50vw] lg:h-screen overflow-hidden">
            <img
                src={heroImage}
                className="absolute inset-0 w-full h-full object-cover object-center
                z-[0] isolate"
            />
            <BlobGraphic />
            <div className="text-center md:text-left z-[1] md:ms-[18vw] lg:ms-64">
                <div className="text-biru_umn text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-nexa mb-3 md:mb-8">
                    FSD Laboratorium
                </div>
                <div className="text-center md:text-left text-sky-600 md:ms-6 lg:ms-[18vw] text-2xl md:text-4xl lg:text-4xl font-bold font-nexa">
                    Team and Organization Structure
                </div>
            </div>
            {/* <div className="absolute ms-[20vw] md:ms-[18vw] lg:ms-64">
                <div className="text-biru_umn text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-nexa mb-3 md:mb-8">
                    FSD Laboratorium
                </div>
                <div className="text-right text-sky-600 ms-0 md:ms-6 lg:ms-[18vw] text-xl sm:text-2xl md:text-4xl lg:text-4xl font-bold font-nexa">
                    Team and Organization Structure
                </div>
            </div> */}
        </div>
    );
}

function BlobGraphic() {
    return (
        <svg
            className="absolute w-[60vw] md:w-[35vw] bottom-0 left-0"
            // width="476"
            // height="424"
            viewBox="0 0 476 424"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M230.813 250.602L230.831 250.625L230.852 250.646C274.271 293.164 326.34 294.376 371.383 294.988C371.945 294.995 372.505 295.003 373.065 295.01C394.966 295.305 415.105 295.576 431.787 300.492C448.849 305.521 462.273 315.404 470.201 335.201C477.148 352.549 477.008 368.452 471.278 382.925C465.543 397.411 454.19 410.509 438.641 422.193C407.534 445.567 359.752 463.197 307.068 474.957C254.395 486.715 196.875 492.594 146.334 492.499C95.7691 492.403 52.2712 486.327 27.5905 474.231C8.30871 464.781 -3.21035 450.972 -9.61318 434.225C-16.0233 417.459 -17.3143 397.724 -16.0792 376.427C-14.905 356.182 -11.4516 334.57 -7.97391 312.806C-7.79348 311.677 -7.61299 310.548 -7.43275 309.418C-3.78032 286.524 -0.230751 263.534 0.572317 241.921C1.87065 206.978 7.39338 160.272 20.9504 119.777C34.518 79.2504 56.0751 45.1095 89.3303 35.0194C105.605 30.0813 119.856 37.5189 132.827 52.5283C145.803 67.5429 157.396 90.0278 168.297 114.88C174.765 129.623 180.974 145.163 187.082 160.449C191.273 170.938 195.417 181.308 199.563 191.218C209.736 215.534 219.919 237.071 230.813 250.602Z"
                stroke="#006BBD"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M-104.735 239.163C-101.762 159.093 -79.4398 25.0396 -2.77002 1.76416C72.9812 -21.2324 110.102 187.086 159.73 248.764C258.73 345.764 397.148 254.369 433.73 345.764C497.73 505.661 39.9587 561.295 -73.5001 505.661C-162.284 462.125 -108.405 337.978 -104.735 239.163Z"
                fill="url(#paint0_linear_571_2796)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_571_2796"
                    x1="60.0236"
                    y1="534.659"
                    x2="60.0236"
                    y2="26.6186"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#005596" />
                    <stop offset="1" stop-color="#25C0FF" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default TeamHeroSection;
