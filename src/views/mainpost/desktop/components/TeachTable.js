import React, { useEffect } from "react";

const TeachTable = () => {
    return (
        <div className="flex-col-cen  rounded-md bg-stone-200 px-6 py-5 text-base">
            <div className="mb-3 flex text-xl font-semibold underline">ตารางเรียน</div>
            <div className="flex-col-cen space-y-2">
                <Day sec="101" day="monday"/>
                <Day sec="102" day="tuesday"/>
                <Day sec="103" day="wednesday"/>
                <Day sec="104" day="thursday"/>
                <Day sec="105" day="friday"/>
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
    }

    return (
        <div className="flex items-center justify-start overflow-hidden rounded-full text-sm lg:text-base">
            <div className="flex-cen h-full py-3 w-12 " style={{ backgroundColor: color[day] }}>{ shortDays[day] }</div>
            <div className="flex-cen space-x-2 bg-[#FCFCFC] px-2">
                <div className="whitespace-nowrap rounded-full  bg-text  px-3 text-white">เซค {sec}</div>
                <div className="py-3 whitespace-nowrap">09:00 - 12:00 น.</div>
            </div>
        </div>
    );
};

export default TeachTable;
