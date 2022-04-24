import React, { useEffect, useMemo, useRef, useState } from "react";
import Calendar from "./Calendar";
import SectionList from "./SectionList";

import { AttendanceProvider } from "./AttendanceContext";
import { useSelector } from "react-redux";
import CalendarTa from "./CalendarTa";
import EvidenceSend from "./EvidenceSend";

const CommunityAttendence = () => {
    const { user } = useSelector(state => state.user);
    const isTeacher = useMemo(() => {
        return user.role === "teacher";
    }, [user]);
    return (
        <AttendanceProvider>
            <div className="relative mt-2 flex w-full space-x-1 px-2">
                {isTeacher ? (
                    <>
                        <div className="flex w-full flex-col  items-center rounded-md border-2 bg-secondary py-8 px-3 shadow-lg">
                            <div className="mb-4 flex flex-col items-center text-center font-bold text-white xl:flex-row">
                                <div className="md:text-base lg:text-xl xl:text-2xl  ">DATA COMMUNICATION</div>
                                <div className="ml-4 font-normal ">01000123</div>
                            </div>
                            <Calendar />
                        </div>
                        <SectionList />
                    </>
                ) : (
                    <div className="flex min-h-[500px] w-full flex-col items-center rounded-md bg-secondary py-8 px-4">
                        <div className="mb-4 flex  w-full items-center justify-center text-center font-bold text-white">
                            <div className="text-3xl">DATA COMMUNICATION</div>
                            <div className=" ml-4 text-3xl">01000123</div>
                        </div>
                        <div className="flex h-full w-full max-w-[850px] items-start rounded-md bg-white">
                            <CalendarTa />
                            <div className="h-[90%] w-[1px] self-center bg-gray-300"></div>
                            <EvidenceSend />
                        </div>
                    </div>
                )}
            </div>
        </AttendanceProvider>
    );
};

export default CommunityAttendence;
