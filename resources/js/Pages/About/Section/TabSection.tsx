import { useState } from "react";
import Structure from "./OrganizationStructureTab";
import Coordinators from "./LabCoordinatorsTab";

function TabSection() {
    const [tab, setTab] = useState(2);

    const tabStyle = {
        base: "hover:text-gray-600 hover:bg-gray-50",
        active: "text-white bg-biru_umn",
    };

    return (
        <div className="TabSection flex flex-col items-center justify-center text-center w-full py-20">
            <ul className="flex flex-wrap mb-10 md:mb-20 text-sm font-medium text-center text-gray-500 border-b border-gray-400">
                <li className="me-2" onClick={() => setTab(1)}>
                    <div
                        className={`inline-block py-3 px-10 md:px-16 rounded-t-xl cursor-pointer ${
                            tab == 1 ? tabStyle.active : tabStyle.base
                        }`}
                    >
                        Organization Structure
                    </div>
                </li>
                <li className="me-2" onClick={() => setTab(2)}>
                    <div
                        className={`inline-block py-3 px-10 md:px-16 rounded-t-xl cursor-pointer ${
                            tab == 2 ? tabStyle.active : tabStyle.base
                        }`}
                    >
                        Lab Coordinators
                    </div>
                </li>
            </ul>
            {tab == 1 ? <Structure /> : <Coordinators />}
        </div>
    );
}

export default TabSection;
