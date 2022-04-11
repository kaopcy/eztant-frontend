import React from "react";

const TeachTable = () => {
    return (
        <div className="flex-col-cen justify-start rounded-md bg-stone-200 px-6 py-5 text-base">
            <div className="mb-3 flex text-xl font-semibold underline">ตารางเรียน</div>
            <div className="flex-col-cen space-y-2">
                <Day sec="101" day="monday" />
                <Day sec="102" day="tuesday" />
                <Day sec="103" day="wednesday" />
                <Day sec="104" day="thursday" />
            </div>
        </div>
    );
};

const Day = ({ day, sec, time }) => {
    const color = {
        sunday: "#FF1B1B",
        monday: "#FFE600",
        tuesday: "#F72FB4",
        wednesday: "#48A847",
        thursday: "#FB4214",
        friday: "#0065fb",
        saturnday: "#6600ce",
    };

    const shortDays = {
        sunday: "อา.",
        monday: "จ.",
        tuesday: "อ.",
        wednesday: "พ.",
        thursday: "พฤ.",
        friday: "ศ.",
        saturnday: "ส.",
    };

    return (
        <div className="flex items-center justify-start overflow-hidden rounded-full tracking-[-1px] xs:tracking-normal text-xs xs:text-sm lg:text-base">
            <div className="flex-cen h-full w-12 py-2 " style={{ backgroundColor: color[day] }}>
                {shortDays[day]}
            </div>
            <div className="flex-cen space-x-2 bg-[#FCFCFC] px-2">
                <div className="whitespace-nowrap rounded-full  bg-text px-3 text-white">เซค {sec}</div>
                <div className="whitespace-nowrap py-2">09:00 - 12:00 น.</div>
            </div>
        </div>
    );
};

export default TeachTable;
