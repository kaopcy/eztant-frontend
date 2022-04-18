import React, { useState } from "react";
import DisclosureAnimate from "../../../component/utils/DisclosureAnimate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FillDetailMobile = () => {
    return (
        <>
            <div className="mt-4 font-bold text-secondary">รายละเอียด</div>
            <div className="mt-10 mb-32 flex w-full flex-col space-y-10">
                <Input label="ชื่อวิชา" name="subjectName" inputWidth="100%" />
                <Input label="รหัสวิชา" name="subjectName" inputWidth="100%" />
                <div className="flex w-full items-end space-x-3">
                    <Input label="ค่าตอบแทน" name="subjectName" inputWidth="160px" />
                    <div className="">บาท/ชั่วโมง</div>
                </div>
                <div className="flex w-full items-center space-x-8">
                    <div className="">ชั้นปีที่รับ</div>
                    <YearCheckbox label="1" />
                    <YearCheckbox label="2" />
                    <YearCheckbox label="3" />
                    <YearCheckbox label="4" />
                </div>
                <div className="flex items-center space-x-8">
                    <div className="">เกรดรายวิชาไม่ต่ำกว่า</div>
                    <Disclosure />
                </div>
                <TextArea name="duty" label="หน้าที่" />
                <TextArea name="requirement" label="ข้อกำหนด" />
            </div>

            <div className=""></div>
        </>
    );
};

const TextArea = ({ label, name }) => {
    return (
        <div  className="relative h-[120px] w-full ">
            <textarea name={name} className="relative h-full w-full rounded-md border-[3px] px-2 pt-4 pb-1 "></textarea>
            <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-text">{label}</div>
        </div>
    );
};

const Input = ({ label, name, inputWidth }) => {
    return (
        <div className="relative">
            <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 ">{label}</div>
            <input  type="text" name={name} className="rounded-md border-2 px-2 py-[0.375rem]" style={{ width: inputWidth }} />
        </div>
    );
};

const YearCheckbox = ({ label, value }) => {
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input type="checkbox" className=" form-checkbox rounded-sm border-2 border-text-light text-secondary" value={value} />
            <span className="">{label}</span>
        </label>
    );
};

const Disclosure = () => {
    const mockSec = [
        {
            label: "S",
            value: "S",
        },
        {
            label: "A",
            value: "A",
        },
        {
            label: "B+",
            value: "B+",
        },
        {
            label: "B",
            value: "B",
        },
        {
            label: "C+",
            value: "C+",
        },
        {
            label: "C",
            value: "C",
        },
        {
            label: "D+",
            value: "D+",
        },
        {
            label: "D",
            value: "D",
        },
        {
            label: "F",
            value: "F",
        },
    ];
    const [open, setOpen] = useState(false);
    const [selectedSec, setSelectedSec] = useState({
        label: "F",
        value: "F",
    });
    return (
        <DisclosureAnimate toggle={open}>
            {({ childRelativeContainer, childAbsoluteContainer }) => (
                <div
                    className="relative z-10 flex w-[130px] cursor-pointer items-center justify-between space-x-2 rounded-md bg-white px-2 py-1 outline outline-1 outline-text-light"
                    onClick={() => setOpen(e => !e)}>
                    <span className="ellipsis ">{mockSec.filter(e => selectedSec.value === e.value)[0].label} </span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    <div className="absolute top-[calc(100%+1px)] -left-2 w-full ">
                        <div className="relative w-full self-end overflow-hidden " ref={childRelativeContainer}>
                            <div ref={childAbsoluteContainer} className="absolute bottom-0 left-0 flex w-full flex-col border bg-white py-2">
                                {mockSec.map(e => {
                                    const active = e.value === selectedSec;
                                    return (
                                        <div
                                            className={`w-full  py-1 px-2  ${active ? "bg-primary text-white " : "hover:bg-gray-100 "} `}
                                            onClick={() => setSelectedSec(e)}
                                            key={e.label}>
                                            {e.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DisclosureAnimate>
    );
};
export default FillDetailMobile;
