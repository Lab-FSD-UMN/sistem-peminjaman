type EventsProps = {
    category: "DKV" | "GENERAL" | "FILM" | "LOREM";
    date: string;
    title: string;
    image: string;
    content: string;
    snippet?: string;
};

const evenList: EventsProps[] = [
    {
        category: "DKV",
        date: "January 6, 2023",
        title: "Ultigraph 2023: Akhirnya hadir kembali!",
        image: "",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        category: "GENERAL",
        date: "January 6, 2023",
        title: "Ultigraph 2023: Akhirnya hadir kembali!",
        image: "",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        category: "FILM",
        date: "January 6, 2023",
        title: "Sekarang jam 2.56 WIB",
        image: "",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        category: "GENERAL",
        date: "January 10, 2023",
        title: "Ultigraph 2023: WOAH WOAH",
        image: "",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        category: "FILM",
        date: "January 6, 2023",
        title: "Ultigraph 2023: Akhirnya hadir kembali!",
        image: "",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
        category: "FILM",
        date: "January 6, 2023",
        title: "Harus Terus Semangat Meski Ngantuk Menyerang",
        image: "",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
];

export default evenList;
