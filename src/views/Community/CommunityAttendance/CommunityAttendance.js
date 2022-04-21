import React, { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar";

import { AttendanceProvider } from "./AttendanceContext";

const CommunityAttendence = () => {
    return (
        <AttendanceProvider>
            <div className="relative flex w-full p-2">
                <CalendarWrapper />
            </div>
        </AttendanceProvider>
    );
};

const CalendarWrapper = () => {
    return (
        <div className="flex h-[485px] w-[568px] flex-col items-center rounded-md bg-secondary py-8 shadow-lg">
            <div className="mb-4 text-2xl font-bold text-white">DATA COMMUNICATION 01000123</div>

            <Calendar />
        </div>
    );
};

export default CommunityAttendence;
