import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import { useHandleTableInput, useTableInput, useAddTableInput, useDeleteTableInput } from "../context/tableCreatePostContext";

import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FillTableDesktop = () => {
    return (
        <div className="mt-10 flex w-full items-start justify-center space-x-4 px-2 lg:space-x-20 ">
            <Table className="" />
            <DueDate className="" />
        </div>
    );
};

const TABLE_ROW_HEIGHT = 44;

const Table = ({ className }) => {
    const tableInput = useTableInput();
    const addTable = useAddTableInput();

    const tableContainer = useRef(null);
    const tl = useRef(null);
    const tl2 = useRef(null);

    useLayoutEffect(() => {
        gsap.set(tableContainer.current, { height: `+=${TABLE_ROW_HEIGHT * (tableContainer.current.childElementCount - 1)}px` });
    }, []);

    useEffect(() => {
        tl.current = gsap.to(tableContainer.current, {
            paused: true,
            height: `+=${TABLE_ROW_HEIGHT}`,
        });
        tl2.current = gsap.to(tableContainer.current, {
            paused: true,
            height: `-=${TABLE_ROW_HEIGHT}`,
        });
    }, [tableInput.length]);

    const play = () => {
        tl2.current.play();
    };

    useEffect(() => {
        return () => {
            tl.current.kill();
        };
    }, []);

    return (
        <div className={`flex flex-col items-center ${className} mr-10`}>
            <div className="flex  flex-col items-start ">
                <div className="z-10 flex w-full bg-gray-300 text-text">
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
                <div ref={tableContainer} className="relative z-0 flex flex-col items-start ">
                    <AddedTable index={0} tableInput={tableInput[0]} main onDelete={play} />
                    {tableInput.map((e, index) => index !== 0 && <AddedTable onDelete={play} key={index} index={index} tableInput={e} />)}
                </div>
            </div>
            
            <div
                onClick={() => {
                    addTable();
                    tl.current.play();
                }}
                className="btn-white flex-cen mt-10 space-x-2 rounded-xl border-2 px-5 py-1 text-lg">
                <FontAwesomeIcon className="text-sm" icon={faPlus} />
                <div className="">เพิ่ม</div>
            </div>
        </div>
    );
};

const AddedTable = memo(({ index, tableInput, onDelete, main = false }) => {
    const rowTable = useRef(null);
    const tl = useRef(null);

    useLayoutEffect(() => {
        rowTable.current.style.top = `${index * TABLE_ROW_HEIGHT}px`;
        gsap.set(rowTable.current, { yPercent: -100 });
    }, [index]);

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true, reversed: true }).to(rowTable.current, { yPercent: 0 });
        tl.current.play();
    }, []);

    const handleTableInput = useHandleTableInput();
    const deleteTable = useDeleteTableInput();
    const timeInput = props => (
        <input
            type="text"
            onChange={e => handleTableInput(e, index)}
            {...props}
            value={tableInput[props.name]}
            className=" my-[0.375rem] w-28 rounded-md py-1 px-2 text-center "
        />
    );

    return (
        <div
            style={{ height: TABLE_ROW_HEIGHT, zIndex: 100 - index }}
            className={`flex  w-full bg-primary ${main ? "relative" : "absolute left-0 top-full "}`}
            ref={rowTable}>
            <div className="shrink-0 border-r">
                <input
                    onChange={e => handleTableInput(e, index)}
                    name="section"
                    type="text"
                    placeholder="101"
                    maxLength={3}
                    value={tableInput.section}
                    className="my-[0.375rem] mx-2 w-12 rounded-md bg-white py-1 px-2 text-center lg:w-20"
                />
            </div>
            <div className="shrink-0 border-r">
                <input
                    onChange={e => handleTableInput(e, index)}
                    name="max_ta"
                    type="text"
                    placeholder="5"
                    maxLength={2}
                    value={tableInput.max_ta}
                    className="my-[0.375rem] mx-2 w-12 rounded-md bg-white py-1 px-2 text-center lg:w-20"
                />
            </div>
            <div className="shrink-0 border-r">
                <select
                    name="day"
                    onChange={e => handleTableInput(e, index)}
                    value={tableInput.day}
                    className="form-select my-[0.375rem] mx-2 w-[5.5rem] rounded-md bg-white py-1 px-2 text-text">
                    <option value="monday" className="my-1">
                        จันทร์
                    </option>
                    <option value="tuesday" className="my-1">
                        อังคาร
                    </option>
                    <option value="wednesday" className="my-1">
                        พุธ
                    </option>
                    <option value="thursday" className="my-1">
                        พฤหัส
                    </option>
                    <option value="friday" className="my-1">
                        ศุกร์
                    </option>
                    <option value="saturnday" className="my-1">
                        เสาร์
                    </option>
                    <option value="sunday" className="my-1">
                        อาทิตย์
                    </option>
                </select>
            </div>
            <div className="flex w-full items-center justify-center px-2 lg:px-6">
                {timeInput({ placeholder: "09:30", name: "time_from" })}
                <div className="mx-4 text-white">ถึง</div>
                {timeInput({ placeholder: "13:30", name: "time_to" })}
            </div>
            <div
                className="flex-col-cen absolute top-0 left-full h-full w-10"
                onClick={() => {
                    deleteTable(index, onDelete);
                }}>
                <FontAwesomeIcon icon={faClose} className="text-red-500" />
            </div>
        </div>
    );
});

const Text = () => {
    const table = useTableInput();
    return (
        <div className="">
            {table.map((e, index) => (
                <div className="flex" key={index}>
                    <div className="w-20">{e.section}</div>
                    <div className="w-20">{e.max_ta}</div>
                    <div className="w-20">{e.day}</div>
                    <div className="w-20">{e.time_from}</div>
                    <div className="w-20">{e.time_to}</div>
                </div>
            ))}
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
                <div className="absolute top-0 left-4 -translate-y-[55%] bg-white py-0 px-2">วันที่</div>
            </div>
            <div className="btn-orange flex-cen w-full rounded-md py-2 text-xl font-bold">โพสต์</div>
        </div>
    );
};

export default FillTableDesktop;
