type SuperGraphicsProps = {
    style: "fill-color" | "fill-white" | "outline-blue" | "outline-color";
    className?: string;
};

export default function SuperGraphics(props: SuperGraphicsProps) {
    return (
        <div className={`overflow-x-hidden ${props.className}`}>
            {props.style === "fill-color" ? <SuperGraphicsFillColor /> : null}
            {props.style === "fill-white" ? <SuperGraphicsFillWhite /> : null}
            {props.style === "outline-color" ? (
                <SuperGraphicsOutlineColor />
            ) : null}
            {props.style === "outline-blue" ? (
                <SuperGraphicsOutlineBlue />
            ) : null}
        </div>
    );
}

function SuperGraphicsFillWhite() {
    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M160 120L80 160V80L160 120Z" fill="white" />
            <path d="M120 0L160 80H80L120 0Z" fill="white" />
            <path d="M0 80H80L0 160V80Z" fill="white" />
            <path d="M0 0H80V80L0 0Z" fill="white" />
            <path d="M320 120L240 160V80L320 120Z" fill="white" />
            <path d="M280 0L320 80H240L280 0Z" fill="white" />
            <path d="M160 80H240L160 160V80Z" fill="white" />
            <path d="M160 0H240V80L160 0Z" fill="white" />
            <path d="M480 120L400 160V80L480 120Z" fill="white" />
            <path d="M440 0L480 80H400L440 0Z" fill="white" />
            <path d="M320 80H400L320 160V80Z" fill="white" />
            <path d="M320 0H400V80L320 0Z" fill="white" />
            <path d="M640 120L560 160V80L640 120Z" fill="white" />
            <path d="M600 0L640 80H560L600 0Z" fill="white" />
            <path d="M480 80H560L480 160V80Z" fill="white" />
            <path d="M480 0H560V80L480 0Z" fill="white" />
            <path d="M800 120L720 160V80L800 120Z" fill="white" />
            <path d="M760 0L800 80H720L760 0Z" fill="white" />
            <path d="M640 80H720L640 160V80Z" fill="white" />
            <path d="M640 0H720V80L640 0Z" fill="white" />
            <path d="M960 120L880 160V80L960 120Z" fill="white" />
            <path d="M920 0L960 80H880L920 0Z" fill="white" />
            <path d="M800 80H880L800 160V80Z" fill="white" />
            <path d="M800 0H880V80L800 0Z" fill="white" />
            <path d="M1120 120L1040 160V80L1120 120Z" fill="white" />
            <path d="M1080 0L1120 80H1040L1080 0Z" fill="white" />
            <path d="M960 80H1040L960 160V80Z" fill="white" />
            <path d="M960 0H1040V80L960 0Z" fill="white" />
            <path d="M1280 120L1200 160V80L1280 120Z" fill="white" />
            <path d="M1240 0L1280 80H1200L1240 0Z" fill="white" />
            <path d="M1120 80H1200L1120 160V80Z" fill="white" />
            <path d="M1120 0H1200V80L1120 0Z" fill="white" />
            <path d="M1440 120L1360 160V80L1440 120Z" fill="white" />
            <path d="M1400 0L1440 80H1360L1400 0Z" fill="white" />
            <path d="M1280 80H1360L1280 160V80Z" fill="white" />
            <path d="M1280 0H1360V80L1280 0Z" fill="white" />
        </svg>
    );
}

function SuperGraphicsFillColor() {
    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M160 120L80 160V80L160 120Z" fill="#005596" />
            <path d="M120 0L160 80H80L120 0Z" fill="#F28A15" />
            <path d="M0 80H80L0 160V80Z" fill="#904992" />
            <path d="M0 0H80V80L0 0Z" fill="#1C968F" />
            <path d="M320 120L240 160V80L320 120Z" fill="#005596" />
            <path d="M280 0L320 80H240L280 0Z" fill="#F28A15" />
            <path d="M160 80H240L160 160V80Z" fill="#904992" />
            <path d="M160 0H240V80L160 0Z" fill="#1C968F" />
            <path d="M480 120L400 160V80L480 120Z" fill="#005596" />
            <path d="M440 0L480 80H400L440 0Z" fill="#F28A15" />
            <path d="M320 80H400L320 160V80Z" fill="#904992" />
            <path d="M320 0H400V80L320 0Z" fill="#1C968F" />
            <path d="M640 120L560 160V80L640 120Z" fill="#005596" />
            <path d="M600 0L640 80H560L600 0Z" fill="#F28A15" />
            <path d="M480 80H560L480 160V80Z" fill="#904992" />
            <path d="M480 0H560V80L480 0Z" fill="#1C968F" />
            <path d="M800 120L720 160V80L800 120Z" fill="#005596" />
            <path d="M760 0L800 80H720L760 0Z" fill="#F28A15" />
            <path d="M640 80H720L640 160V80Z" fill="#904992" />
            <path d="M640 0H720V80L640 0Z" fill="#1C968F" />
            <path d="M960 120L880 160V80L960 120Z" fill="#005596" />
            <path d="M920 0L960 80H880L920 0Z" fill="#F28A15" />
            <path d="M800 80H880L800 160V80Z" fill="#904992" />
            <path d="M800 0H880V80L800 0Z" fill="#1C968F" />
            <path d="M1120 120L1040 160V80L1120 120Z" fill="#005596" />
            <path d="M1080 0L1120 80H1040L1080 0Z" fill="#F28A15" />
            <path d="M960 80H1040L960 160V80Z" fill="#904992" />
            <path d="M960 0H1040V80L960 0Z" fill="#1C968F" />
            <path d="M1280 120L1200 160V80L1280 120Z" fill="#005596" />
            <path d="M1240 0L1280 80H1200L1240 0Z" fill="#F28A15" />
            <path d="M1120 80H1200L1120 160V80Z" fill="#904992" />
            <path d="M1120 0H1200V80L1120 0Z" fill="#1C968F" />
            <path d="M1440 120L1360 160V80L1440 120Z" fill="#005596" />
            <path d="M1400 0L1440 80H1360L1400 0Z" fill="#F28A15" />
            <path d="M1280 80H1360L1280 160V80Z" fill="#904992" />
            <path d="M1280 0H1360V80L1280 0Z" fill="#1C968F" />
        </svg>
    );
}

function SuperGraphicsOutlineBlue() {
    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M81 81.618L157.764 120L81 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M81.618 79L120 2.23607L158.382 79H81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1 81H77.5858L1 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M79 77.5858L2.41421 1H79V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M241 81.618L317.764 120L241 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M241.618 79L280 2.23607L318.382 79H241.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M161 81H237.586L161 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M239 77.5858L162.414 1H239V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M401 81.618L477.764 120L401 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M401.618 79L440 2.23607L478.382 79H401.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M321 81H397.586L321 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M399 77.5858L322.414 1H399V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M561 81.618L637.764 120L561 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M561.618 79L600 2.23607L638.382 79H561.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M481 81H557.586L481 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M559 77.5858L482.414 1H559V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M721 81.618L797.764 120L721 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M721.618 79L760 2.23607L798.382 79H721.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M641 81H717.586L641 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M719 77.5858L642.414 1H719V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M881 81.618L957.764 120L881 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M881.618 79L920 2.23607L958.382 79H881.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M801 81H877.586L801 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M879 77.5858L802.414 1H879V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1041 81.618L1117.76 120L1041 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1041.62 79L1080 2.23607L1118.38 79H1041.62Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M961 81H1037.59L961 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1039 77.5858L962.414 1H1039V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1201 81.618L1277.76 120L1201 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1201.62 79L1240 2.23607L1278.38 79H1201.62Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1121 81H1197.59L1121 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1199 77.5858L1122.41 1H1199V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1361 81.618L1437.76 120L1361 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1361.62 79L1400 2.23607L1438.38 79H1361.62Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1281 81H1357.59L1281 157.586V81Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1359 77.5858L1282.41 1H1359V77.5858Z"
                stroke="#005596"
                stroke-width="2"
            />
        </svg>
    );
}

function SuperGraphicsOutlineColor() {
    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M81 81.618L157.764 120L81 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M81.618 79L120 2.23607L158.382 79H81.618Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M1 81H77.5858L1 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M79 77.5858L2.41421 1H79V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M241 81.618L317.764 120L241 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M241.618 79L280 2.23607L318.382 79H241.618Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M161 81H237.586L161 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M239 77.5858L162.414 1H239V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M401 81.618L477.764 120L401 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M401.618 79L440 2.23607L478.382 79H401.618Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M321 81H397.586L321 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M399 77.5858L322.414 1H399V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M561 81.618L637.764 120L561 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M561.618 79L600 2.23607L638.382 79H561.618Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M481 81H557.586L481 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M559 77.5858L482.414 1H559V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M721 81.618L797.764 120L721 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M721.618 79L760 2.23607L798.382 79H721.618Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M641 81H717.586L641 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M719 77.5858L642.414 1H719V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M881 81.618L957.764 120L881 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M881.618 79L920 2.23607L958.382 79H881.618Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M801 81H877.586L801 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M879 77.5858L802.414 1H879V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M1041 81.618L1117.76 120L1041 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1041.62 79L1080 2.23607L1118.38 79H1041.62Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M961 81H1037.59L961 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M1039 77.5858L962.414 1H1039V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M1201 81.618L1277.76 120L1201 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1201.62 79L1240 2.23607L1278.38 79H1201.62Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M1121 81H1197.59L1121 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M1199 77.5858L1122.41 1H1199V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
            <path
                d="M1361 81.618L1437.76 120L1361 158.382V81.618Z"
                stroke="#005596"
                stroke-width="2"
            />
            <path
                d="M1361.62 79L1400 2.23607L1438.38 79H1361.62Z"
                stroke="#F28A15"
                stroke-width="2"
            />
            <path
                d="M1281 81H1357.59L1281 157.586V81Z"
                stroke="#904992"
                stroke-width="2"
            />
            <path
                d="M1359 77.5858L1282.41 1H1359V77.5858Z"
                stroke="#1C968F"
                stroke-width="2"
            />
        </svg>
    );
}
