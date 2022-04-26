import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

import { faChevronRight, faClose, faWarning, faPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";

import { useSetTableInput, useTableInput } from "../context/tableCreatePostContext";
import { useInput } from "../context/inputCreatePostContext";
import { timeValidate, sectionValidate, max_taValidate, closeDateValidate } from "../../../utils/createTableInputValidate";
import { useSelector } from "react-redux";
import useCreatePost from "../useCreatePost";

const FillTableDesktop = () => {
    const tableMatch = useMatch("/create-post/fill-table");
    const detailMatch = useMatch("/create-post");

    const [isPreviousEmpty, setIsPreviousEmpty] = useState(false);
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);
    const setTableInput = useSetTableInput();
    const tableInput = useTableInput();
    const inputValue = useInput();

    const { mutate: createPost, error: createPostError, isLoading, data: createPostData } = useCreatePost();

    useEffect(() => {
        if (!inputValue) {
            navigate("/create-post");
        }
    }, [inputValue, navigate]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm({ mode: "onChange", defaultValues: tableInput || {} });

    const onSubmit = data => {
        let iserr = false;
        data.tables.forEach((element, index) => {
            const numberTimeTo = parseInt(element.time_to.split(":").join(""));
            const numberTimeFrom = parseInt(element.time_from.split(":").join(""));
            if (numberTimeFrom >= numberTimeTo) {
                setError(`tables[${index}].time_to`, { type: "formatError", message: "เวลาเลิกคาบเรียนต้องหลังจากเวลาเริ่มคาบ" });
                iserr = true;
            }
        });
        if (iserr) return;
        if (!inputValue) {
            setIsPreviousEmpty(true);
            return;
        }
        setTableInput({
            ...data,
            author: `${user.firstname} ${user.lastname}`,
            department: user.department,
            authorAvatar: user.imgURL,
        });

        createPost({ ...inputValue, ...data, author: `${user.firstname} ${user.lastname}`, department: user.department, authorAvatar: user.imgURL });
    };

    useEffect(() => {
        if (createPostData) {
            console.log(createPostData);
            navigate(`/create-post/preview-post/${createPostData?.data?._id}`);
        }
    }, [createPostData, navigate]);

    const tableRef = useRef(null);
    const dueDateRef = useRef(null);
    const onError = e => {
        if (e?.close_date) dueDateRef.current.shake();
        if (e?.tables) tableRef.current.shake();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-10 flex w-full items-start justify-center space-x-4 px-2 lg:space-x-20 ">
                <Table ref={tableRef} errors={errors} register={register} control={control} />
                <DueDate ref={dueDateRef} createPostError={createPostError} isPreviousEmpty={isPreviousEmpty} register={register} errors={errors} />
            </form>
            <div className="mt-20 flex w-full items-center justify-center space-x-2">
                <Link type="submit" to="/create-post" className="relative">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`rotate-180  border-2 py-3 px-2 transition-all  ${
                            tableMatch
                                ? "cursor-pointer border-gray-400 hover:bg-text hover:text-white"
                                : "cursor-default border-slate-100 text-slate-200"
                        } ${isPreviousEmpty && "!border-red-500 !text-red-500"}`}
                    />
                    {isPreviousEmpty && (
                        <div className="absolute -top-14 left-1/2 flex -translate-x-3/4 items-center rounded-md border-2 border-red-500 px-4 py-2 text-red-500 shadow-lg">
                            <div className="mr-3 whitespace-nowrap">กรอบรายละเอียดในหน้านี้ให้ครบ</div>
                            <FontAwesomeIcon icon={faWarning} className="text-orange-400" />
                        </div>
                    )}
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

const Table = forwardRef(({ errors, control, register }, ref) => {
    const { fields, append, remove: removeData } = useFieldArray({ control, name: "tables" });
    const remove = index => {
        if (fields.length <= 1) return;
        removeData(index);
    };
    const tableInput = useTableInput();

    useEffect(() => {
        if (tableInput) return;
        append();
    }, [append, tableInput]);

    const container = useRef(null);
    useImperativeHandle(ref, () => ({
        shake: () => {
            gsap.fromTo(
                container.current,
                { x: -1 },
                { x: 1, ease: RoughEase.ease.config({ strength: 8, points: 20, randomize: false }), clearProps: "x" }
            );
            gsap.to(container.current, { outlineStyle: "solid", outlineWidth: 2, outlineOffset: -1, outlineColor: "red" });
        },
    }));

    return (
        <div className={`mr-10 flex min-h-[323px] flex-col  items-center`}>
            <div ref={container} className="flex  flex-col items-start ">
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
                        <AddedTable remove={remove} errors={errors} index={index} register={register} {...item} />
                    </div>
                ))}
            </div>
            <div onClick={() => append()} className="btn-white flex-cen mt-10 space-x-2 rounded-xl border-2 px-5 py-1 text-lg">
                <FontAwesomeIcon className="text-sm" icon={faPlus} />
                <div className="">เพิ่ม</div>
            </div>
        </div>
    );
});

const AddedTable = ({ index, remove, errors, register }) => {
    const error = errors?.tables?.[index];

    const ErrorValidate = ({ name }) => {
        return error?.[name] ? (
            <div className="group absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer">
                <FontAwesomeIcon icon={faCircleInfo} className="text-sm text-red-500" />
                <div className="invisible absolute left-1/2 bottom-full -translate-x-1/2 rounded-md border bg-white px-2 py-2 shadow-lg group-hover:visible">
                    <div className="z-[100] whitespace-nowrap text-xs text-red-500 ">{error?.[name]?.message}</div>
                </div>
            </div>
        ) : (
            ""
        );
    };
    return (
        <div style={{ zIndex: 100 + index }} className={`relative  flex w-full bg-primary`}>
            <div className="relative shrink-0 border-r">
                <div className="relative my-[0.375rem] mx-2">
                    <ErrorValidate name="section" />
                    <input
                        type="text"
                        maxLength={3}
                        placeholder={101}
                        className={`cool-input w-12 rounded-md border-2 bg-white py-1 px-2 text-center lg:w-20 ${error?.section && "border-red-300"}`}
                        {...register(`tables[${index}].section`, sectionValidate)}
                    />
                </div>
            </div>
            <div className="relative shrink-0 border-r">
                <div className="relative my-[0.375rem] mx-2">
                    <ErrorValidate name="max_ta" />
                    <input
                        maxLength={2}
                        type="text"
                        className={`cool-input w-12 rounded-md border-2 bg-white py-1 px-2 text-center lg:w-20 ${error?.max_ta && "border-red-300"}`}
                        {...register(`tables[${index}].max_ta`, max_taValidate)}
                    />
                </div>
            </div>
            <div className="relative shrink-0 border-r">
                <div className="relative my-[0.375rem] mx-2">
                    <ErrorValidate name="day" />
                    <select
                        maxLength={2}
                        className={`cool-input form-select  w-[5.5rem] rounded-md border-2 bg-white py-1 px-2 text-text ${
                            error?.day && "border-red-300"
                        }`}
                        {...register(`tables[${index}].day`)}>
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
            <div className="flex w-full items-center justify-center px-2 lg:px-6">
                <div className="relative shrink-0">
                    <div className="relative my-[0.375rem]">
                        <ErrorValidate name="time_from" />
                        <input
                            maxLength={5}
                            placeholder="09:00"
                            type="text"
                            className={`cool-input w-28 rounded-md border-2 py-1 px-2 text-center  ${error?.time_from && "border-red-300"}`}
                            {...register(`tables[${index}].time_from`, timeValidate)}
                        />
                    </div>
                </div>
                <div className="mx-4 text-white">ถึง</div>
                <div className="relative shrink-0 ">
                    <div className="relative">
                        <ErrorValidate name="time_to" />
                        <input
                            maxLength={5}
                            placeholder="13:00"
                            type="text"
                            className={`cool-input my-[0.375rem] w-28 rounded-md border-2 py-1 px-2 text-center  ${
                                error?.time_to && "border-red-300"
                            }`}
                            {...register(`tables[${index}].time_to`, timeValidate)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex-col-cen absolute top-0 left-full h-full w-10" onClick={() => remove(index)}>
                <FontAwesomeIcon icon={faClose} className="text-red-500" />
            </div>
        </div>
    );
};

const DueDate = forwardRef(({ isPreviousEmpty, register, errors, createPostError }, ref) => {
    const container = useRef(null);
    useImperativeHandle(ref, () => ({
        shake: () => {
            gsap.fromTo(
                container.current,
                { x: -1 },
                { x: 1, ease: RoughEase.ease.config({ strength: 8, points: 20, randomize: false }), clearProps: "x" }
            );
            gsap.to(container.current, { outlineStyle: "solid", outlineWidth: 2, outlineOffset: -1, outlineColor: "red" });
        },
    }));
    return (
        <div className={`flex w-[220px] flex-col items-center space-y-6 `}>
            <div className="font-bold text-secondary underline ">กำหนดวันปิดรับสมัคร</div>
            <div ref={container} className="relative flex w-full items-center ">
                {errors?.close_date ? (
                    <div className="absolute left-0 top-full z-[100] whitespace-nowrap text-xs text-red-500">{errors?.close_date?.message}</div>
                ) : (
                    ""
                )}
                <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    min="1997-01-01"
                    max="2030-12-31"
                    className={`w-full rounded-md border-2 px-2 py-[0.375rem] ${errors?.close_date && "border-red-300"}`}
                    {...register("close_date", closeDateValidate)}
                />
                <div className="absolute top-0 left-4 -translate-y-[55%] bg-white py-0 px-2">วันที่</div>
            </div>
            <button disabled={isPreviousEmpty} type="submit" className="  btn-orange flex-cen w-full rounded-md py-2 text-xl font-bold">
                โพสต์
            </button>
            {createPostError && <div className="text-sm text-red-500">{createPostError?.response?.data?.message}</div>}
        </div>
    );
});

export default FillTableDesktop;
