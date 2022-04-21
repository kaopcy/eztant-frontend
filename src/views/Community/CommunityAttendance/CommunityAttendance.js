import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";
import SectionList from "./SectionList";

import { AttendanceProvider } from "./AttendanceContext";

const CommunityAttendence = () => {
    return (
        <AttendanceProvider>
            <div className="relative flex w-full px-2 space-x-1 mt-2">
                <div className="flex w-full flex-col  border-2 items-center rounded-md bg-secondary py-8 px-3 shadow-lg">
                    <div className="mb-4 flex text-center items-center font-bold text-white xl:flex-row flex-col">
                        <div className="md:text-base lg:text-xl xl:text-2xl  ">DATA COMMUNICATION</div>
                        <div className="ml-4 font-normal ">01000123</div>
                    </div>
                    <Calendar />
                </div>
                <SectionList />
            </div>
        </AttendanceProvider>
    );
};

export default CommunityAttendence;
