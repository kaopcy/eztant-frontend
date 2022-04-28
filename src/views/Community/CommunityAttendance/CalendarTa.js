import React, { useState, useCallback, useEffect, useMemo } from "react";
import { getMonthDetails, getWeekDetail, MONTH_MAP_TH, DAY_MAP } from "../../../utils/calendarUtils";
import { DAY_COLOR } from "../../../generalConfig";
import { v4 as uuid } from "uuid";
import { useSelectedDay, useToday, useSetSelectedDay } from "./AttendanceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { DAY_FULL_TH, DAY_SHORT_EN } from "../../../generalConfig";
import { useFetchCommunityByID } from "../../../composables/fetch/useFetchCommunity";
import Moment from "react-moment";

const CalendarMobile = () => {
    const selectedDay = useSelectedDay();
    const setSelectedDay = useSetSelectedDay();
    const today = useToday();

    const weekDetail = useMemo(() => {
        return getMonthDetails(selectedDay.getFullYear(), selectedDay.getMonth());
    }, [selectedDay]);

    const isFuture = useMemo(() => selectedDay.getTime() > today.getTime(), [selectedDay, today]);
    const isPast = useMemo(() => selectedDay.getTime() < today.getTime(), [selectedDay, today]);
    const isToday = useMemo(() => selectedDay.getTime() === today.getTime(), [selectedDay, today]);

    const nextWeek = () => {
        setSelectedDay(new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 1));
    };
    const prevWeek = () => {
        setSelectedDay(new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() - 1));
    };

    const dayString = useMemo(() => {
        return Object.values(DAY_FULL_TH)[selectedDay.getDay()];
    }, [selectedDay]);
    const [post, setPost] = useState();

    const dayColor = useMemo(() => {
        return Object.values(DAY_COLOR)[selectedDay.getDay()];
    }, [selectedDay]);

    const fullDay = useMemo(() => {
        const MONTH_MAP_TH = [
            "มกราคม ",
            "กุมภาพันธ์ ",
            "มีนาคม ",
            "เมษายน ",
            "พฤษภาคม ",
            "มิถุนายน ",
            "กรกฎาคม ",
            "สิงหาคม ",
            "กันยายน ",
            "ตุลาคม ",
            "พฤศจิกายน ",
            "ธันวาคม ",
        ];
        return `${selectedDay.getDate()} ${MONTH_MAP_TH[selectedDay.getMonth()]} ${selectedDay.getFullYear()}`;
    }, [selectedDay]);

    return (
        <div className="relative flex w-full flex-col items-center overflow-hidden  py-4 px-3 text-text">
            <div
                onClick={() => setSelectedDay(today)}
                className={`absolute top-5 left-3 flex cursor-pointer  items-center space-x-1 text-sm text-[#74c0fc] transition-all  hover:underline ${
                    !isFuture ? "translate-x-[-300%]" : "translate-x-0"
                }`}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <div className="">วันนี้</div>
            </div>
            <div
                onClick={() => setSelectedDay(today)}
                className={`absolute top-5 right-3 flex cursor-pointer  items-center space-x-1 text-sm text-[#74c0fc] transition-all  hover:underline ${
                    !isPast ? "translate-x-[300%]" : "translate-x-0"
                }`}>
                <FontAwesomeIcon icon={faArrowRightLong} />
                <div className="">วันนี้</div>
            </div>
            <div className="mb-6 flex items-center space-x-2 px-2 text-xl font-bold">
                <div className="h-4 w-4 rounded-full " style={{ backgroundColor: dayColor }}></div>
                <div className="flex ">
                    วัน{dayString}ที่
                    <div className="ml-2 font-normal"> {fullDay}</div>
                </div>
            </div>
            <div className="3 mt-4  flex w-[90%]  justify-between">
                {DAY_MAP.map((day, i) => (
                    <div key={uuid()} className="flex-col-cen w-[13%] ">
                        <div className="text-sm font-bold uppercase opacity-50" style={{ color: Object.values(DAY_COLOR)[i] }}>
                            {day}
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative mt-4 flex w-full items-center justify-center ">
                <FontAwesomeIcon className="absolute -left-4 cursor-pointer p-4 text-text" icon={faChevronLeft} onClick={() => prevWeek()} />
                <Week week={weekDetail} />
                <FontAwesomeIcon className="absolute -right-4 cursor-pointer p-4 text-text" icon={faChevronRight} onClick={() => nextWeek()} />
            </div>
            <SectionList isToday={isToday} />
        </div>
    );
};

const Week = ({ week }) => {
    const selectedDay = useSelectedDay();
    const setSelectedDay = useSetSelectedDay();
    const today = useToday();

    const handleOnDayClick = day => {
        setSelectedDay(new Date(day.timestamp));
    };

    const isCurrentDay = day => {
        return day.month === 0 && new Date(today).getTime() === new Date(day.timestamp).getTime();
    };

    const isSelectedDay = day => {
        return day.month === 0 && new Date(selectedDay).getTime() === new Date(day.timestamp).getTime();
    };

    const { data: community, isLoading, error: communityLoading } = useFetchCommunityByID();

    const match = useMemo(() => {
        let list = [];
        community?.data?.recruit_post_id?.schedules.forEach(({ day }) => {
            if (day && !list.includes(day)) {
                list.push(day);
            }
        });
        return list;
    }, [community]);

    const isHaveTeach = day => {
        return match.includes(Object.keys(DAY_FULL_TH)[day.day]);
    };

    const isCurrentMonth = day => {
        return day.month === 0;
    };

    const currentWeek = useMemo(() => {
        let index;
        week.forEach((day, i) => {
            if (day.timestamp === selectedDay.getTime()) {
                index = i;
            }
        });
        return Math.floor(index / 7);
    }, [selectedDay, week]);

    return (
        <div className="relative w-[90%] items-center overflow-hidden rounded-md bg-zinc-200 py-7 ">
            <div
                className="absolute top-1/2 flex  w-[calc(100%*6)] -translate-y-1/2 items-center justify-between transition-all"
                style={{ left: `-${currentWeek}00%` }}>
                {week.map(day => (
                    <div
                        onClick={() => handleOnDayClick(day)}
                        className={`flex-col-cen group relative w-[13%] cursor-pointer  ${isCurrentMonth(day) ? "text-text" : "text-text-light"}
                    
                    `}
                        key={uuid()}>
                        <div className="z-20">{day.date}</div>
                        <div className={`absolute aspect-square w-10`}>
                            <div
                                style={{
                                    backgroundColor: isSelectedDay(day) ? Object.values(DAY_COLOR)[new Date(day.timestamp).getDay()] : "transparent",
                                }}
                                className="absolute inset-0   z-10 rounded-full opacity-20"></div>
                            {isHaveTeach(day) && <div className="absolute -top-0 -right-1 h-2 w-2 rounded-full bg-red-500"></div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SectionList = ({ isToday }) => {
    const selectedDay = useSelectedDay();

    // const [post, setPost] = useState();
    const { data: community, isLoading, error: communityLoading } = useFetchCommunityByID();

    const post = useMemo(() => {
        const selectedDayString = Object.keys(DAY_SHORT_EN)[selectedDay.getDay()];
        return community?.data?.recruit_post_id?.schedules.filter(e => e.day === selectedDayString);
    }, [community, selectedDay]);

    return (
        <div className=" flex  w-[90%] flex-col  overflow-hidden px-3   py-8 text-text ">
            {post?.length > 0 ? (
                post?.map(section => <Section key={uuid()} section={section} />)
            ) : (
                <div className="">ไม่มีการเรียนการสอน{isToday ? "ในวันนี้" : "ในวันที่เลือก"}</div>
            )}
        </div>
    );
};

const Section = ({ section }) => {
    const selectedDay = useSelectedDay();

    const dayColor = useMemo(() => {
        return Object.values(DAY_COLOR)[selectedDay.getDay()];
    }, [selectedDay]);

    return (
        <div className="relative mb-1 flex h-24 w-full flex-col px-2">
            <div className="text-xl font-bold">เซค {section.section}</div>
            <div className="flex h-14 flex-wrap items-center space-x-2">
                <div
                    className="outline-3 mr-3 shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-sm outline outline-orange-500"
                    style={{ outlineColor: dayColor }}>
                    {section.time_from} - {section.time_to}
                </div>
                {section.accepted.length > 0 ? (
                    section.accepted.map(user => (
                        <div key={uuid()} className={`group relative mr-2 aspect-square w-11 shrink-0 cursor-pointer rounded-full `}>
                            <div className="invisible absolute bottom-[110%] z-20  left-0 whitespace-nowrap rounded-md border px-4 py-2 text-sm group-hover:visible">
                               {user?.student_id}  {user?.firstname} {user?.lastname}
                            </div>
                            {/* className={`relative mr-2 aspect-square w-11 shrink-0 cursor-pointer rounded-full ${!user.evidenceURL && "opacity-30"}`}> */}
                            <div className="absolute top-0 left-0 h-full w-full rounded-full opacity-20" style={{ backgroundColor: dayColor }}></div>
                            <div className="z-10 h-full w-full overflow-hidden rounded-full object-cover">
                                <img alt={user?.imgURL || ""} src={user?.imgURL || ""} className="h-full w-full " />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="">ว่าง</div>
                )}
            </div>
        </div>
    );
};

export default CalendarMobile;
