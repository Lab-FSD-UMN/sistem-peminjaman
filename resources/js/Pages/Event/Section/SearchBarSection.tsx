import { useState, useEffect, useRef, MouseEvent } from "react";

function SearchBarSection() {
    const sortMenu = ["yaha", "yamahayahdkjadskfjapdasdfsadfojf", "yaha", "yamaha"];

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const handleDropdownClick = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div
            className="
                w-full px-8 md:px-24 py-5 md:py-3 
                bg-sky-600 sticky top-20 z-10
                flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-auto"
        >
            <form>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="search-bar"
                        className="w-[86vw] md:w-[30vw] h-12 py-3 ps-16 bg-biru_muda rounded-xl border border-biru_muda justify-start items-center text-sm text-white placeholder-white rounded-lg block text-base font-normal"
                        placeholder="Search events..."
                    />
                </div>
            </form>
            <div className="flex justify-start md:justify-end items-center gap-2 w-full">
                <Dropdown
                    title="Sort by Most recent"
                    menuList={sortMenu}
                    isOpen={openDropdown === 0}
                    onClick={() => handleDropdownClick(0)}
                />
                <Dropdown
                    title="Category"
                    menuList={sortMenu}
                    isOpen={openDropdown === 1}
                    onClick={() => handleDropdownClick(1)}
                />
            </div>
        </div>
    );
}

type DropdownProps = {
    title: string;
    menuList: string[];
    isOpen: boolean;
    onClick: () => void;
};

function Dropdown({ title, menuList, isOpen, onClick }: DropdownProps) {
    return (
        <div className="relative inline-block">
            <button
                onClick={onClick}
                className="
                    px-5 py-2 md:py-3 rounded-full
                    flex items-center gap-3 
                    text-sm md:text-base text-white font-semibold 
                    bg-transparent border border-2 border-biru_muda focus:outline-white hover:opacity-50 
                    transition duration-150 ease-in-out"
            >
                {title}
                <span>
                    <img src="https://i.ibb.co/d5ZCxkj/dropdown-icon.png" />
                </span>
            </button>
            {isOpen && (
                <div className="absolute mt-2 md:max-w-[15vw] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {menuList.map((menu, index) => (
                        <a
                            key={index}
                            href="/about"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 whitespace-no-wrap break-words"
                        >
                            {menu}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBarSection;
