import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";

import { v4 as uuid } from "uuid";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DAY_MAP = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const MONTH_MAP = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const DatePickerPopup = forwardRef((_, ref) => {
    const [mockDate, setMockdate] = useState(new Date());
    const [monthDetail, setMonthDetail] = useState([]);

    const getNumberOfDays = useCallback((year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    }, []);

    const getDayDetails = useCallback(
        args => {
            let date = args.index - args.firstDay;
            let day = args.index % 7;
            let prevMonth = args.month - 1;
            let prevYear = args.year;
            if (prevMonth < 0) {
                prevMonth = 11;
                prevYear--;
            }
            let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
            let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
            let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
            let timestamp = new Date(args.year, args.month, _date).getTime();
            return {
                date: _date,
                day,
                month,
                timestamp,
                dayString: DAY_MAP[day],
            };
        },
        [getNumberOfDays]
    );

    const getMonthDetails = useCallback(
        (year, month) => {
            let firstDay = new Date(year, month).getDay();
            let numberOfDays = getNumberOfDays(year, month);
            let monthArray = [];
            let rows = 6;
            let currentDay = null;
            let index = 0;
            let cols = 7;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    currentDay = getDayDetails({
                        index,
                        numberOfDays,
                        firstDay,
                        year,
                        month,
                    });
                    monthArray.push(currentDay);
                    index++;
                }
            }
            return monthArray;
        },
        [getDayDetails, getNumberOfDays]
    );

    const getRoundedDate = useCallback(date => {
        const oneDay = 60 * 60 * 24 * 1000;
        return date - (date % oneDay) + new Date().getTimezoneOffset() * 1000 * 60;
    }, []);

    const isCurrentDay = useCallback(
        day => {
            return getRoundedDate(day) === getRoundedDate(mockDate.getTime());
        },
        [mockDate, getRoundedDate]
    );

    const getMonthStr = useCallback(month => MONTH_MAP[Math.max(Math.min(11, month), 0)] || "Month", []);

    useEffect(() => {
        const year = mockDate.getFullYear();
        const month = mockDate.getMonth();
        setMonthDetail(getMonthDetails(year, month));
    }, [mockDate, getMonthDetails]);

    return (
        <div ref={ref} className="flex  w-[300px] flex-col rounded-md border bg-white p-4 shadow-md">
            <div className="flex w-full items-center justify-between ">
                <div className="">{getMonthStr(mockDate.getMonth())}</div>
                <div className="flex items-center">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-3  w-3 shrink-0 rotate-180 cursor-pointer rounded-full p-1 text-text hover:bg-text hover:text-white"
                    />
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-3 w-3 shrink-0 cursor-pointer rounded-full p-1 text-text hover:bg-text hover:text-white"
                    />
                </div>
            </div>
            <div className="mt-4 flex w-full flex-wrap justify-between text-sm">
                {DAY_MAP.map(day => (
                    <div key={uuid()} className="flex-col-cen w-9">
                        <div className="font-bold ">{day}</div>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex w-full flex-wrap justify-between text-sm">
                {monthDetail.map(day => (
                    <div
                        key={uuid()}
                        className={`${day.month === 0 ? "text-text" : "text-gray-300"} ${
                            isCurrentDay(day.timestamp) ? "bg-text text-white" : "bg-white text-text"
                        }`}>
                        <div className="flex-col-cen w-9 py-1">{day.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default DatePickerPopup;
