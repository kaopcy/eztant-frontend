import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleInfo, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { DAY_COLOR } from "../../../generalConfig";

import { Section } from "../../mainpost/desktop/components/TeachTable";
import { useFieldArray, useForm } from "react-hook-form";

import { useSetTableInput, useTableInput } from "../context/tableCreatePostContext";
import { useInput } from "../context/inputCreatePostContext";
import { timeValidate, sectionValidate, max_taValidate } from "../../../utils/createTableInputValidate";

const CreateTableMobile = () => {
    const addRef = useRef(null);

    const setTableInput = useSetTableInput();
    const navigate = useNavigate();

    const tableInput = useTableInput();
    const inputValue = useInput();

    useEffect(() => {
        if (!inputValue) {
            navigate("/create-post");
        }
    }, [inputValue, navigate]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
        setError,
        getValues
    } = useForm({ mode: "onChange", defaultValues: tableInput || {} });

    const { remove } = useFieldArray({ control, name: "tables" });

    const [length, setLength] = useState(tableInput?.tables?.length || 0);

    const onSubmit = data => {
        const numberTimeTo = parseInt(data.tables[length].time_to.split(":").join(""));
        const numberTimeFrom = parseInt(data.tables[length].time_from.split(":").join(""));
        if (numberTimeFrom >= numberTimeTo) {
            setError(`tables[${length}].time_to`, { type: "formatError", message: "เวลาเลิกคาบเรียนต้องหลังจากเวลาเริ่มคาบ" });
            return;
        }
        if (!isValid) return;
        addRef.current.reverse(() => {
            Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
            setTableInput(data);
            setLength(e => e + 1);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center ">
            <div className="text-xl font-bold text-secondary">ตารางเรียน</div>
            {tableInput && tableInput.tables.map((e, index) => <PreviewSection key={index} {...e} remove={remove} />)}

            <Add getValues={getValues} ref={addRef} index={length} register={register} errors={errors} />
        </form>
    );
};

const PreviewSection = ({ ...props }) => {
    const container = useRef(null);
    useLayoutEffect(() => {
        gsap.set(container.current, { yPercent: -100, autoAlpha: 0, scale: 0.8 });
    }, []);

    useEffect(() => {
        gsap.to(container.current, { yPercent: 0, autoAlpha: 1, scale: 1 });
    }, []);
    return (
        <div className="w-full" ref={container}>
            <Section {...props} />
        </div>
    );
};

const ErrorValidate = ({ errors, name, className }) => {
    return errors?.[name] ? (
        <div className={`group absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer ${className}`}>
            <FontAwesomeIcon icon={faCircleInfo} className="text-sm text-red-500" />
            <div className="invisible absolute  bottom-full right-0 z-[100] rounded-md border bg-white shadow-lg group-hover:visible">
                <div className="whitespace-nowrap px-2 py-2 text-xs text-red-500">{errors?.[name]?.message}</div>
            </div>
        </div>
    ) : (
        ""
    );
};

const Add = forwardRef(({ index, register, errors , getValues }, ref) => {
    const tl = useRef(null);
    const container = useRef(null);
    const iconRef = useRef(null);
    const quoteRef = useRef(null);
    const error = errors?.tables?.[index];

    const CONTAINER_HEIGHT = "422px";

    const [curDay , setCurDay] = useState('monday')

    useImperativeHandle(ref, () => ({
        toggle: () => {
            tl.current.reversed() ? tl.current.play() : tl.current.reverse();
        },
        play: () => {
            tl.current.play();
        },
        reverse: cb => {
            tl.current.reverse().eventCallback("onReverseComplete", cb || null);
        },
    }));

    useEffect(() => {
        tl.current = gsap
            .timeline({ paused: true, reversed: true })
            .to(container.current, { width: "100%", borderRadius: "10px", ease: "power4.in" })
            .to(iconRef.current, { top: "20px", right: "10px", rotate: "45deg" })
            .to(container.current, { height: CONTAINER_HEIGHT }, "<")
            .to(quoteRef.current, { autoAlpha: 1 , duration: 0.2 } , '<0.3');
    }, []);

    return (
        <div ref={container} className="relative mx-2 mt-10 mb-20 h-7   w-7 overflow-hidden rounded-full outline outline-[0.19rem] outline-secondary">
            <div ref={quoteRef} className="opacity-0 invisible absolute top-[20px] left-[20px] flex  text-xl text-secondary">
                <FontAwesomeIcon  icon={faCalendarPlus} className="mr-2" />
                <div className="text-base font-bold">เพิ่มตาราง</div>
            </div>
            <div
                onClick={() => ref.current.toggle()}
                ref={iconRef}
                className="shrink-0 absolute right-0 top-0 z-10 mr-[6px] cursor-pointer text-xl text-secondary group-hover:text-white">
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="absolute bottom-0 flex w-full flex-col items-center rounded-md  py-10" style={{ height: CONTAINER_HEIGHT }}>
                <div className="mt-10 flex w-[230px] flex-col items-center 2xs:w-[300px] xs:w-[350px] ">
                    <div className="flex w-full items-center space-x-4">
                        <div className="relative flex w-full flex-col items-center">
                            <input
                                {...register(`tables[${index}].section`, sectionValidate)}
                                defaultValue=""
                                type="text"
                                maxLength={3}
                                className={`cool-input w-full rounded-md border-2 py-2 px-2 ${error?.section && "border-red-500"}`}
                            />
                            <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 ">เซค</div>
                            <ErrorValidate errors={error} name={"section"} />
                        </div>

                        <div className="relative flex w-full flex-col items-center">
                            <input
                                {...register(`tables[${index}].max_ta`, max_taValidate)}
                                defaultValue=""
                                type="text"
                                maxLength={2}
                                className={`cool-input w-full rounded-md border-2 py-2 px-2 ${error?.max_ta && "border-red-500"}`}
                            />
                            <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 ">เซคละ</div>
                            <ErrorValidate errors={error} name={"max_ta"} />
                        </div>
                    </div>
                    <div className="relative mt-5 flex w-full items-center">
                        <div className="shrink-0">วันที่เข้าสอน</div>
                        <div className="mx-4 aspect-square w-10 rounded-full " style={{ backgroundColor: DAY_COLOR[curDay] }}></div>
                        <div className="relative w-full">
                            <ErrorValidate errors={error} name={"day"} />
                            <select
                                maxLength={2}
                                className={`cool-input form-select  w-full rounded-md border-2  bg-white py-1 px-2 text-text ${
                                    error?.day && "!border-red-300"
                                }`}
                                {...register(`tables[${index}].day`)}
                                onChange={(e)=>{setCurDay(e.target.value)}}>
                                <option value="monday" className="my-1 ">
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
                    </div>
                    <div className="mt-5 flex w-full flex-col items-start 2xs:flex-row 2xs:items-center">
                        <div className="mr-3 mb-2 shrink-0 xs:mb-0">เวลาที่เข้าสอน</div>

                        <div className="flex w-full items-center">
                            <div className="relative w-full">
                                <div className="relative">
                                    <ErrorValidate errors={error} name="time_from" />
                                    <input
                                        maxLength={5}
                                        placeholder="09:00"
                                        type="text"
                                        className={`cool-input text-start w-full rounded-md  border-2 py-1 px-2 ${
                                            error?.time_from && "border-red-300"
                                        }`}
                                        {...register(`tables[${index}].time_from`, timeValidate)}
                                    />
                                </div>
                            </div>
                            <div className="mx-4 font-bold text-secondary">ถึง</div>
                            <div className="relative w-full ">
                                <div className="relative">
                                    <ErrorValidate errors={error} name="time_to" />
                                    <input
                                        maxLength={5}
                                        placeholder="13:00"
                                        type="text"
                                        className={`cool-input  text-start w-full rounded-md  border-2 py-1 px-2  ${
                                            error?.time_to && "border-red-300"
                                        }`}
                                        {...register(`tables[${index}].time_to`, timeValidate)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-orange mt-10 rounded-md px-10 py-2 shadow-md">
                    ตกลง
                </button>
            </div>
        </div>
    );
});

export default CreateTableMobile;
