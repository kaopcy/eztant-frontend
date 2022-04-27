import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSort, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Studentsearchbar = () => {
    return (
        <div>
            <div className="flex w-full flex-wrap items-center justify-center md:space-x-1 lg:justify-between lg:space-x-2">
                <div className="static m-[1.8%] inline-block whitespace-nowrap text-2xl font-bold text-secondary xs:pl-0 lg:pl-[18%] lg:text-4xl">
                    รายชื่อนักศึกษา
                </div>
                <div className="static inline-block justify-between space-x-3 xs:justify-center xs:pl-0 lg:m-[1.8%] lg:pr-[20%] ">
                    <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer text-2xl text-text-light sm:hidden sm:text-xl " />
                    <input className="form-input h-7 w-44 rounded-lg px-3 py-2 ring-1 ring-gray-300"></input>
                    <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-2xl text-text-light  sm:text-xl" />
                    {
                        <select className=" m-0 h-7 w-20 rounded-lg ring-1 ring-gray-300 focus:text-gray-500">
                            <option className="text-sm">มาก-น้อย</option>
                            <option className="text-sm">น้อย-มาก</option>
                        </select>
                    }
                    <FontAwesomeIcon icon={faSort} className="cursor-pointer text-2xl text-text-light  sm:text-xl" />
                </div>
            </div>
        </div>
    );
};

export default Studentsearchbar;
