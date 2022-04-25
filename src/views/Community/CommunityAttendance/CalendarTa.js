import React, { useState, useCallback, useEffect, useMemo } from "react";
import { getMonthDetails, getWeekDetail, MONTH_MAP_TH, DAY_MAP } from "../../../utils/calendarUtils";
import { DAY_COLOR } from "../../../generalConfig";
import { v4 as uuid } from "uuid";
import { useSelectedDay, useToday, useSetSelectedDay } from "./AttendanceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { COMMUNITY, DAY_FULL_TH, DAY_SHORT_EN } from "../../../generalConfig";

const CalendarMobile = () => {
    const selectedDay = useSelectedDay();
    const setSelectedDay = useSetSelectedDay();
    const weekDetail = useMemo(() => {
        return getMonthDetails(selectedDay.getFullYear(), selectedDay.getMonth());
    }, [selectedDay]);

    const nextWeek = () => {
        setSelectedDay(new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 1));
    };
    const prevWeek = () => {
        setSelectedDay(new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() - 1));
    };

    return (
        <div className="flex w-full flex-col items-center py-4 px-3  text-text">
            <div className="px-3 text-xl  font-semibold">
                {MONTH_MAP_TH[selectedDay.getMonth()]} {selectedDay.getFullYear()}
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
            <SectionList />
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

    const match = useMemo(() => {
        let list = [];
        COMMUNITY.tables.forEach(({ day }) => {
            if (day && !list.includes(day)) {
                list.push(day);
            }
        });
        console.log(list);
        return list;
    }, []);

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

const SectionList = () => {
    const selectedDay = useSelectedDay();

    const [post, setPost] = useState();

    useEffect(() => {
        const selectedDayString = Object.keys(DAY_SHORT_EN)[selectedDay.getDay()];
        setPost(COMMUNITY.tables.filter(e => e.day === selectedDayString));
    }, [selectedDay]);

    return (
        <div className=" flex  w-[90%] flex-col  overflow-hidden px-3   py-8 text-text ">
            {post?.length > 0 ? (
                post?.map(section => <Section key={uuid()} section={section} />)
            ) : (
                <div className="">ไม่มีการเรียนการสอนในวันนี้</div>
            )}
        </div>
    );
};

const Section = ({ section, setSelectedTa }) => {
    const selectedDay = useSelectedDay();

    const dayColor = useMemo(() => {
        return Object.values(DAY_COLOR)[selectedDay.getDay()];
    }, [selectedDay]);

    return (
        <div className="relative mb-1 flex h-24 w-full flex-col px-2">
            <div className="text-xl font-bold">เซค {section.section}</div>
            <div className="flex h-14 flex-wrap items-center space-x-2">
                <div
                    className="shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-sm outline outline-3 outline-orange-500"
                    style={{ outlineColor: dayColor }}>
                    {section.time_from} - {section.time_to}
                </div>
                {section.requested.length > 0 ? (
                    section.requested.map(({ user }) => (
                        <div
                            onClick={() => setSelectedTa(user)}
                            key={uuid()}
                            className={`relative mr-2 aspect-square w-11 shrink-0 cursor-pointer rounded-full ${!user.evidenceURL && "opacity-30"}`}>
                            <div className="absolute top-0 left-0 h-full w-full rounded-full opacity-20" style={{ backgroundColor: dayColor }}></div>
                            <img alt={user.imgURL} src={user.imgURL} className="z-10 h-full w-full rounded-full object-cover" />
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
