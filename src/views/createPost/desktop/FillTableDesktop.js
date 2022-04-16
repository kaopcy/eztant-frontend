import React, { useState } from "react";

import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DisclosureAnimate from "../../../component/utils/DisclosureAnimate";

const FillTableDesktop = () => {
    return (
        // <div className="mt-10 flex w-full flex-col  items-center justify-center lg:space-x-20 lg:flex-row lg:items-start ">
        //     <Table className="order-2 lg:order-1 mt-10 lg:mt-0 " />
        //     <DueDate className="order-1 lg:order-2 " />
        // </div>
        <div className="mt-10 flex w-full items-start justify-center space-x-4 px-2 lg:space-x-20 ">
            <Table className="" />
            <DueDate className="" />
        </div>
    );
};

const Table = ({ className }) => {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="flex  flex-col items-start bg-primary">
                <div className="flex w-full bg-gray-300 text-text">
                    <div className=" shrink-0 border-r ">
                        <div type="text" className=" flex-col-cen my-[0.375rem]  mx-2 w-12 rounded-md py-1 font-bold lg:w-20 lg:px-2">
                            เซค
                        </div>
                    </div>
                    <div className=" shrink-0 border-r ">
                        <div type="text" className=" flex-col-cen my-[0.375rem]  mx-2 w-12 rounded-md py-1 font-bold lg:w-20 lg:px-2">
                            เซคละ
                        </div>
                    </div>
                    <div className=" shrink-0 border-r ">
                        <div type="text" className="flex-col-cen my-[0.375rem]  mx-2 w-[5.5rem] rounded-md py-1 px-2 font-bold">
                            วัน
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center px-6 font-bold">เวลา</div>
                </div>
                <AddedTable />
                <AddedTable />
                <AddedTable />
            </div>
            <div className="btn-white flex-cen mt-10 space-x-2 rounded-xl border-2 px-5 py-1 text-lg">
                <FontAwesomeIcon className="text-sm" icon={faPlus} />
                <div className="">เพิ่ม</div>
            </div>
        </div>
    );
};

const AddedTable = () => {
    const [sec, setSec] = useState(null);
    
    return (
        <div className="flex w-full">
            <div className="shrink-0 border-r">
                <input placeholder="101" type="text" className="my-[0.375rem] mx-2 w-12 rounded-md bg-white py-1 px-2 text-center lg:w-20" />
            </div>
            <div className="shrink-0 border-r">
                <input placeholder="3" type="text" className="my-[0.375rem] mx-2 w-12 rounded-md bg-white py-1 px-2 text-center lg:w-20" />
            </div>
            <div className="shrink-0 border-r">
                <select className="form-select my-[0.375rem] mx-2 w-[5.5rem] rounded-md bg-white py-1 px-2 text-text">
                    <option className="my-1">จันทร์</option>
                    <option className="my-1">อังคาร</option>
                    <option className="my-1">พุธ</option>
                    <option className="my-1">พฤหัส</option>
                    <option className="my-1">ศุกร์</option>
                    <option className="my-1">เสาร์</option>
                    <option className="my-1">อาทิตย์</option>
                </select>
            </div>
            {/* <Disclosure/> */}
            <div className="flex w-full items-center justify-center px-2 lg:px-6">
                <input
                    type="number"
                    required
                    onChange={e => setSec(e.target.value)}
                    value={1}
                    min={0}
                    max={23}
                    className="my-[0.375rem] w-14 rounded-md py-1 px-2 text-center"
                />
                <div className="mx-2 text-white">:</div>
                <input type="number" min={0} max={59} className="my-[0.375rem] w-14 rounded-md py-1 px-2 text-center" />
                <div className="mx-4 text-white">ถึง</div>
                <input type="number" min={0} max={23} className="my-[0.375rem] w-14 rounded-md py-1 px-2 text-center" />
                <div className="mx-2 text-white">:</div>
                <input type="number" min={0} max={59} className="my-[0.375rem] w-14 rounded-md py-1 px-2 text-center" />
            </div>
        </div>
    );
};

const DueDate = ({ className }) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className={`flex w-[220px] flex-col items-center space-y-6 ${className}`}>
            <div className="font-bold text-secondary underline ">กำหนดวันปิดรับสมัคร</div>
            <div className="relative flex w-full items-center">
                <input type="date" className="w-full rounded-md border-2 px-2 py-[0.375rem]" />
                <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2">วันที่</div>
            </div>
            <div className="btn-orange flex-cen w-full rounded-md py-2 text-xl font-bold">โพสต์</div>
        </div>
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
                    className="relative flex w-[130px] cursor-pointer items-center justify-between space-x-2 rounded-md bg-white px-2 py-1 outline outline-1 outline-text-light"
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

export default FillTableDesktop;
