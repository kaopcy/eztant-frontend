import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { v4 as uuid } from "uuid";
import gsap from "gsap";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DAY_COLOR, DAY_SHORT_EN } from "../../../generalConfig";
import { getMonthDetails, DAY_MAP, MONTH_MAP_TH } from "../../../utils/calendarUtils";

import { useToday, useSelectedDay, useSetSelectedDay } from "./AttendanceContext";
import { useFetchCommunityByID } from "../../../composables/fetch/useFetchCommunity";

const Calendar = forwardRef((_, ref) => {
    const [monthDetail, setMonthDetail] = useState([]);
    const [nextMonthDetail, setNextMonthDetail] = useState([]);
    const [previousMonthDetail, setPreviousMonthDetail] = useState([]);

    const today = useToday();
    const selectedDay = useSelectedDay();
    const setSelectedDay = useSetSelectedDay();

    //* animation
    const [activeCalendar, setActiveCalendar] = useState(502);
    const rightAnimate = useRef(null);
    const leftAnimate = useRef(null);
    const wrapperRef = useRef(null);

    const addAnimate = isRight => {
        const width = document.querySelector(".calendar").clientWidth;
        const modWidth = width * 3;

        return gsap.to(".calendar", {
            paused: true,
            duration: 0.3,
            ease: "power2.inOut",
            x: isRight ? `+=${width}` : `-=${width}`,
            modifiers: {
                x: gsap.utils.unitize(x => {
                    return parseFloat(x) % modWidth < 0 ? (parseFloat(x) % modWidth) + modWidth : parseFloat(x) % modWidth;
                }),
            },
        });
    };
    useEffect(() => {
        leftAnimate.current = addAnimate(false);
        rightAnimate.current = addAnimate(true);

        const onResize = () => {
            console.log("resized");
            const width = document.querySelector(".calendar").clientWidth;
            setTimeout(() => {
                const height = document.querySelector(".calendar").clientHeight;
                gsap.set(wrapperRef.current, {
                    left: `-${width}px`,
                    height: height,
                });
            }, 1);

            gsap.set(".calendar", {
                x: i => i * width,
            });
        };

        onResize();

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const getArrayOfMonth = useCallback(
        index => {
            return [previousMonthDetail, monthDetail, nextMonthDetail][index];
        },
        [previousMonthDetail, monthDetail, nextMonthDetail]
    );

    // main logic

    useEffect(() => {
        const year = selectedDay.getFullYear();
        const month = selectedDay.getMonth();
        setMonthDetail(getMonthDetails(year, month));
        setNextMonthDetail(getMonthDetails(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1));
        setPreviousMonthDetail(getMonthDetails(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1));
    }, [selectedDay]);

    const handleNextMonth = () => {
        if (leftAnimate.current.isActive() || rightAnimate.current.isActive()) return;
        setActiveCalendar(e => e + 1);
        setSelectedDay(old => {
            return new Date(old.getMonth() === 0 ? old.getFullYear() - 1 : old.getFullYear(), old.getMonth() === 0 ? 11 : old.getMonth() - 1, 1);
        });

        rightAnimate.current = addAnimate(true);
        rightAnimate.current.play().eventCallback("onComplete", () => {});
    };

    const handlePreviousMonth = () => {
        if (leftAnimate.current.isActive() || rightAnimate.current.isActive()) return;
        setActiveCalendar(e => e - 1);
        setSelectedDay(old => {
            return new Date(old.getMonth() === 11 ? old.getFullYear() + 1 : old.getFullYear(), old.getMonth() === 11 ? 0 : old.getMonth() + 1, 1);
        });

        leftAnimate.current = addAnimate(false);
        leftAnimate.current.play().eventCallback("onComplete", () => {});
    };

    const handleClick = day => {
        const curDate = day.date;
        const curMonth = selectedDay.getMonth();
        const curYear = selectedDay.getFullYear();

        const isPreviousYear = curMonth + day.month < 0;
        const isNewYear = curMonth + day.month > 11;

        const isPreviousMonth = day.month === -1;
        const isNextMonth = day.month === 1;

        setSelectedDay(
            new Date(
                isPreviousYear ? curYear - 1 : isNewYear ? curYear + 1 : curYear,
                isPreviousYear ? 11 : isNewYear ? 0 : isNextMonth ? curMonth + 1 : isPreviousMonth ? curMonth - 1 : curMonth,
                curDate
            )
        );
    };

    const { data: community, isLoading, error } = useFetchCommunityByID();

    const isActiveIndex = useCallback(
        index => community?.data?.recruit_post_id?.schedules?.map(e => Object.keys(DAY_SHORT_EN).indexOf(e.day)).includes(index),
        [community]
    );

    return (
        <div className="flex w-full max-w-[400px] flex-col items-center">
            <div className="mb-4 flex  w-full items-center justify-center space-x-2 text-xl text-white ">
                {/* <div className="opacity-0">today</div> */}
                <div className="flex items-center">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={() => handleNextMonth()}
                        className="h-3  w-3 shrink-0 rotate-180 cursor-pointer rounded-full p-1 hover:bg-white hover:text-secondary"
                    />
                    <div className="flex w-40 justify-center space-x-2">
                        <div className="font-bold">{MONTH_MAP_TH[selectedDay.getMonth()]}</div>
                        <div className="font-bold">{selectedDay.getFullYear() + 543}</div>
                    </div>
                    {/* <div className="flex items-center"> */}
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={() => handlePreviousMonth()}
                        className="h-3 w-3 shrink-0 cursor-pointer rounded-full p-1 hover:bg-white hover:text-secondary"
                    />
                </div>
                {/* <div className="cursor-pointer justify-self-end text-base hover:underline" onClick={() => handleSetToday()}>
                    วันนี้
                </div> */}
            </div>
            <div ref={ref} className="flex w-full flex-col items-center rounded-md border bg-white p-4 text-xs shadow-md lg:text-sm">
                <div className="mt-4 flex w-full flex-wrap justify-between ">
                    {DAY_MAP.map((day, i) => (
                        <div key={uuid()} className="flex-col-cen relative  w-[13%]">
                            {isActiveIndex(i) && (
                                <div
                                    className={`absolute bottom-full right-0 h-2 w-2  rounded-full ${
                                        isActiveIndex(i) ? "!bg-red-500" : "bg-black"
                                    }`}></div>
                            )}
                            <div className={` relative font-bold uppercase opacity-50`} style={{ color: Object.values(DAY_COLOR)[i] }}>
                                {day}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="relative w-full overflow-hidden ">
                    <div ref={wrapperRef} className="relative">
                        <Month handleClick={handleClick} monthDetail={getArrayOfMonth((activeCalendar - 1) % 3)} />
                        <Month handleClick={handleClick} monthDetail={getArrayOfMonth(activeCalendar % 3)} />
                        <Month handleClick={handleClick} monthDetail={getArrayOfMonth((activeCalendar + 1) % 3)} />
                    </div>
                </div>
            </div>
        </div>
    );
});

const Month = ({ monthDetail, handleClick }) => {
    const today = useToday();
    const selectedDay = useSelectedDay();

    const isCurrentDay = (day, month) => {
        return month === 0 && new Date(today).getTime() === new Date(day).getTime();
    };

    const isSelectedDay = (day, month) => {
        return month === 0 && new Date(selectedDay).getTime() === new Date(day).getTime();
    };

    return (
        <div className="calendar absolute top-0 mt-2 flex w-full flex-wrap justify-between pb-3 ">
            {monthDetail.map((day, i) => (
                <div
                    onClick={() => handleClick(day)}
                    key={uuid()}
                    style={{
                        backgroundColor: isSelectedDay(day.timestamp, day.month)
                            ? Object.values(DAY_COLOR)[new Date(day.timestamp).getDay()]
                            : undefined,
                    }}
                    className={`relative mx-[2%] mt-1 flex aspect-square w-[10%] shrink-0 cursor-pointer items-center justify-center rounded-full font-semibold ${
                        day.month === 0 ? "text-text " : "text-gray-200"
                    } 
                ${isSelectedDay(day.timestamp, day.month) ? " !text-white" : "bg-white text-text"}
                `}>
                    <div
                        className="absolute inset-0 z-10 aspect-square rounded-full bg-red-50 opacity-10"
                        style={{
                            backgroundColor: isCurrentDay(day.timestamp, day.month)
                                ? Object.values(DAY_COLOR)[new Date(day.timestamp).getDay()]
                                : "transparent",
                        }}></div>
                    <div className="flex-col-cen z-20 w-full py-1">{day.date}</div>
                </div>
            ))}
        </div>
    );
};

export default Calendar;
