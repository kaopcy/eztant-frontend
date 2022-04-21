import React, { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

import { faCircleCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelectedDay } from "./AttendanceContext";

import { DAY_COLOR, DAY_SHORT_EN, DAY_FULL_TH } from "../../../generalConfig";
// mocked post list of random user
import { REQUEST_LIST } from "../../../generalConfig";

const SectionList = () => {
    const selectedDay = useSelectedDay();
    const [selectedTa, setSelectedTa] = useState(null);

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

    useEffect(() => {
        const selectedDayString = Object.keys(DAY_SHORT_EN)[selectedDay.getDay()];
        setPost(REQUEST_LIST[0].tables.filter(e => e.day === selectedDayString));
        setSelectedTa(null);
    }, [selectedDay]);

    return (
        <div className=" flex h-[485px] w-full max-w-[420px] flex-col overflow-hidden  rounded-md border-2  bg-white py-8 px-3 text-text shadow-md">
            {selectedTa ? (
                <Evidence dayColor={dayColor} selectedTa={selectedTa} setSelectedTa={setSelectedTa} />
            ) : (
                <>
                    <div className="mb-6 flex items-center space-x-2 px-2 text-xl font-bold">
                        <div className="h-4 w-4 rounded-full " style={{ backgroundColor: dayColor }}></div>
                        <div className="flex ">
                            วัน{dayString}ที่
                            <div className="ml-2 font-normal"> {fullDay}</div>
                        </div>
                    </div>
                    {post?.length > 0 ? (
                        post?.map(section => <Section key={uuid()} section={section} setSelectedTa={setSelectedTa} />)
                    ) : (
                        <div className="">ไม่มีการเรียนการสอนในวันนี้</div>
                    )}
                </>
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
            <div className="text-xl">เซค {section.section}</div>
            <div className="flex h-14 flex-wrap items-center space-x-2">
                <div
                    className="shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-sm outline outline-2 outline-orange-500"
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

const Evidence = ({ dayColor, selectedTa, setSelectedTa }) => {
    useEffect(() => {
        console.log(selectedTa);
    }, [selectedTa]);
    return (
        <div className="h-full w-full px-4">
            {/* Header */}
            <div className="flex w-full items-center justify-between">
                <div className="flex w-full items-center">
                    <div className="mr-4 h-16 w-16 shrink-0 overflow-hidden rounded-full">
                        <img src={selectedTa.imgURL} alt="" className="h-full w-full" style={{ backgroundColor: dayColor }} />
                    </div>
                    <div className="flex min-w-0 flex-col items-start ">
                        <div className="ellipsis w-full text-xl font-bold">
                            {selectedTa.firstname} {selectedTa.lastname}
                        </div>
                        <div className="-mt-1 text-base font-normal">{selectedTa.studentID}</div>
                    </div>
                </div>
                <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer text-text " onClick={() => setSelectedTa(null)} />
            </div>
            <div className="mt-10 flex w-full flex-col ">
                <div className="mb-3 flex w-full items-center justify-between">
                    <div className="text-xl font-semibold">หลักฐานการทำงาน</div>
                    <div className="text-xs text-text-light">อัปโหลดเมื่อ 1 ชั่วโมงที่แล้ว</div>
                </div>
                {selectedTa.evidenceURL ? (
                    <img src={selectedTa.evidenceURL} alt="" className="mb-10 h-[200px] rounded-md object-cover" />
                ) : (
                    <div className="mb-10 flex h-[200px] items-center justify-center bg-slate-100">
                        <div className="text-xl text-slate-300">ไม่ได้แนบรูป</div>
                    </div>
                )}
                <div className="btn-orange flex items-center self-center rounded-md px-10 py-2" onClick={() => setSelectedTa(null)}>
                    <div className="mr-2">เช็คชื่อ </div>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </div>
            </div>
        </div>
    );
};

export default SectionList;
