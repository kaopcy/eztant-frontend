import React from "react";
import { useResponsive } from "../../../../composables/context/useResponsive";
import { DAY_COLOR, DAY_SHORT_TH, DAY_SHORT_EN } from "../../../../generalConfig";

const TeachTable = ({ tables }) => {
    const isMobile = useResponsive();
    return isMobile ? <TeachTableMobile tables={tables} /> : <TeachTableDesktop tables={tables} />;
};

const TeachTableDesktop = ({ tables }) => {
    return (
        <div className="flex-col-cen justify-start rounded-md bg-stone-200 px-6 py-5 text-base">
            <div className="mb-3 flex text-xl font-semibold underline">ตารางเรียน</div>
            <div className="flex-col-cen space-y-2">
                {tables.map((e, index) => (
                    <Day key={index} {...e} />
                ))}
            </div>
        </div>
    );
};

const Day = ({ day, section, time_to, time_from }) => {
    return (
        <div className="flex items-center justify-start overflow-hidden rounded-full text-xs tracking-[-1px] xs:text-sm xs:tracking-normal lg:text-base">
            <div className="flex-cen h-full w-12 py-2 " style={{ backgroundColor: DAY_COLOR[day] }}>
                {DAY_SHORT_TH[day]}
            </div>
            <div className="flex-cen space-x-2 bg-[#FCFCFC] px-2">
                <div className="whitespace-nowrap rounded-full  bg-text px-3 text-white">เซค {section}</div>
                <div className="whitespace-nowrap py-2">
                    {time_from} - {time_to} น.
                </div>
            </div>
        </div>
    );
};

// Mobile
const TeachTableMobile = ({ tables }) => {
    return (
        <div className="flex w-full flex-col items-center md:w-[80%]">
            {tables.map((e,index)=> <Section key={index} {...e} />)

            }
        </div>
    );
};

export const Section = ({ section, day, time_from , time_to }) => {
    return (
        <div className="relative mt-4 flex w-full flex-col rounded-md border-2 px-4 py-4">
            <div className="absolute top-0 -translate-y-[15px] bg-white px-2 text-base font-bold tracking-wide">เซค {section}</div>
            <DayList day={day} />
            <div className="flex-cen mt-3 w-full self-center whitespace-nowrap font-bold tracking-tighter text-text">{time_from} - {time_to} น.</div>
        </div>
    );
};

const DayList = ({ day }) => {
    const dayShorts = Object.values(DAY_SHORT_EN);
    const currentDay = DAY_SHORT_EN[day];
    return (
        <div className="flex w-full items-center justify-between px-4">
            {dayShorts.map(dayShort => (
                <div
                    key={dayShort}
                    className={`text-[10px] font-semibold tracking-tighter text-gray-400 xs:text-xs  ${
                        dayShort === currentDay && "!text-lg !font-bold opacity-60"
                    } `}
                    style={{ color: dayShort === currentDay ? DAY_COLOR[day] : undefined }}>
                    {dayShort}
                </div>
            ))}
        </div>
    );
};

export default TeachTable;
