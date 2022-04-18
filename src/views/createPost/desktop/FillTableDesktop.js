import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useMatch } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

import { useHandleTableInput, useTableInput, useAddTableInput, useDeleteTableInput } from "../context/tableCreatePostContext";

import { faPlus, faClose, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// thisi si another test for fill table
const TABLE_ROW_HEIGHT = 44;

const FillTableDesktop = () => {
    const tableMatch = useMatch("/create-post/fill-table");
    const detailMatch = useMatch("/create-post");

    const { register, handleSubmit, control, watch } = useForm();


    return (
        <>
            <form
                onSubmit={handleSubmit(data => {
                    console.log(data);
                })}
                className="mt-10 flex w-full items-start justify-center space-x-4 px-2 lg:space-x-20 ">
                <Table ref={register} control={control} />
                <DueDate />
            </form>
            <div className="mt-20 flex w-full items-center justify-center space-x-2">
                <Link to="/create-post" className="">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`rotate-180  border-2 py-3 px-2 transition-all  ${
                            tableMatch
                                ? "cursor-pointer border-gray-400 hover:bg-text hover:text-white"
                                : "cursor-default border-slate-100 text-slate-200"
                        }`}
                    />
                </Link>
                <Link className="" to="fill-table">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={` border-2  py-3 px-2 transition-all  ${
                            detailMatch
                                ? "cursor-pointer border-gray-400 hover:bg-text hover:text-white"
                                : "cursor-default border-slate-100 text-slate-200"
                        }`}
                    />
                </Link>
            </div>
        </>
    );
};

const Table = forwardRef(({ control }, register) => {
    // const tableInput = useTableInput();
    // const addTable = useAddTableInput();
    const { fields, append, remove } = useFieldArray({ control, name: "tables" });

    // const tableContainer = useRef(null);
    // const tl = useRef(null);
    // const tl2 = useRef(null);

    // useLayoutEffect(() => {
    //     gsap.set(tableContainer.current, { height: `+=${TABLE_ROW_HEIGHT * (tableContainer.current.childElementCount - 1)}px` });
    // }, []);

    // useEffect(() => {
    //     tl.current = gsap.to(tableContainer.current, {
    //         paused: true,
    //         height: `+=${TABLE_ROW_HEIGHT}`,
    //     });
    //     tl2.current = gsap.to(tableContainer.current, {
    //         paused: true,
    //         height: `-=${TABLE_ROW_HEIGHT}`,
    //     });
    // }, [tableInput.length]);

    // const play = () => {
    //     tl2.current.play();
    // };

    // useEffect(() => {
    //     return () => {
    //         tl.current.kill();
    //     };
    // }, []);

    return (
        <div className={`mr-10 flex min-h-[323px] flex-col  items-center`}>
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
                {fields.map(({ id, ...item }, index) => (
                    <div className="" key={id}>
                        <NewAddTable index={index} ref={register} {...item} />
                    </div>
                ))}
                <div className="btn-orange px-4 py-2 " onClick={() => append({})}>
                    Add
                </div>
                {/* <div ref={tableContainer} className="relative z-0 flex flex-col items-start ">
                    <AddedTable index={0} tableInput={tableInput[0]} main onDelete={play} />
                    {tableInput.map((e, index) => index !== 0 && <AddedTable onDelete={play} key={index} index={index} tableInput={e} />)}
                </div> */}
            </div>

            {/* <div
                onClick={() => {
                    addTable();
                    tl.current.play();
                }}
                className="btn-white flex-cen mt-10 space-x-2 rounded-xl border-2 px-5 py-1 text-lg">
                <FontAwesomeIcon className="text-sm" icon={faPlus} />
                <div className="">เพิ่ม</div>
            </div> */}
        </div>
    );
});

const AddedTable = ({ index, tableInput, onDelete, main = false }) => {
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
};

const NewAddTable = forwardRef(({ index, ...props }, register) => {
    return (
        <div className="">
            <input type="text" className="border-2 border-text" {...register(`tables[${index}].section`)} />
            <input type="text" className="border-2 border-text" {...register(`tables[${index}].time_to`)} />
            <input type="text" className="border-2 border-text" {...register(`tables[${index}].time_from`)} />
            <input type="text" className="border-2 border-text" {...register(`tables[${index}].max_ta`)} />
        </div>
    );
});

const DueDate = ({ register }) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className={`flex w-[220px] flex-col items-center space-y-6 `}>
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
