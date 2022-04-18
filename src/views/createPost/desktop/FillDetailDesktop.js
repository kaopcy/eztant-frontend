import React, { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { faChevronRight, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSetInput, useInput } from "../context/inputCreatePostContext";
import {
    fieldValidate,
    minGradeValidate,
    yearValidate,
    wageValidate,
    subjectNameValidate,
    subjectIDValidate,
} from "../../../utils/createDetailInputValidate";
import { GRADE_LIST } from "../../../generalConfig";
const FillDetailDesktop = () => {
    const tableMatch = useMatch("/create-post/fill-table");
    const detailMatch = useMatch("/create-post");
    const navigate = useNavigate();

    const inputValue = useInput();
    const setInputValue = useSetInput();
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const onSubmit = data => {
        if (!isValid) return;
        setInputValue(data);
        navigate("fill-table");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-16 flex w-full flex-col items-center justify-center space-x-16 xl:flex-row xl:items-start ">
                <div className="flex flex-col  space-y-12 xl:min-h-[300px]">
                    <div className="flex space-x-20 ">
                        <div className="flex flex-col space-y-12">
                            <Input
                                validate={subjectNameValidate}
                                register={register}
                                errors={errors}
                                label="ชื่อวิชา"
                                width="350px"
                                name="subjectName"
                            />
                            <Input validate={subjectIDValidate} register={register} errors={errors} label="รหัสวิชา" width="350px" name="subjectID" />
                        </div>
                        <div className="flex flex-col space-y-12">
                            <div className="flex items-end space-x-4">
                                <Input validate={wageValidate} register={register} errors={errors} label="ค่าตอบแทน" width="140px" name="wage" />
                                <div className="">บาทต่อชั่วโมง</div>
                            </div>
                            <div className="relative flex">
                                <div className="flex space-x-4">
                                    <div className="py-1">ชั้นปีที่รับ</div>
                                    {[...Array(4)].map((_, index) => (
                                        <YearCheckbox key={index} register={register} errors={errors} validate={yearValidate} index={index + 1} />
                                    ))}
                                </div>
                                <ErrorValidate errors={errors} name="year" className="!left-full ml-2" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <div className="mr-4">เกรดรายวิชาไม่ต่ำกว่า</div>
                        <div className="relative flex items-center space-x-4">
                            {GRADE_LIST.map((e, index) => (
                                <GradeRadio value={e} register={register} errors={errors} validate={minGradeValidate} key={index} />
                            ))}
                            <ErrorValidate errors={errors} name="minGrade" className="!left-full ml-2" />
                        </div>
                    </div>
                </div>
                <div className="mt-12 flex h-full w-[750px] flex-row space-x-12 xl:mt-0 xl:w-auto xl:flex-col xl:space-x-0 xl:space-y-8">
                    <TextArea errors={errors} validate={fieldValidate} register={register} label="หน้าที่" name="duty" />
                    <TextArea errors={errors} validate={fieldValidate} register={register} label="ข้อกำหนด" name="requirement" />
                </div>
            </div>
            <div className="mt-20 flex w-full items-center justify-center space-x-2">
                <button className="">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`rotate-180  border-2 py-3 px-2 transition-all  ${
                            tableMatch
                                ? "cursor-pointer border-gray-400 hover:bg-text hover:text-white"
                                : "cursor-default border-slate-100 text-slate-200"
                        }`}
                    />
                </button>
                <button type="submit" className="">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={` border-2  py-3 px-2 transition-all  ${
                            detailMatch
                                ? "cursor-pointer border-gray-400 hover:bg-text hover:text-white"
                                : "cursor-default border-slate-100 text-slate-200"
                        }`}
                    />
                </button>
            </div>
        </form>
    );
};

const ErrorValidate = ({ errors, name, className }) => {
    return errors?.[name] ? (
        <div className={`group absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${className}`}>
            <FontAwesomeIcon icon={faCircleInfo} className="text-sm text-red-500" />
            <div className="invisible absolute left-1/2 bottom-full -translate-x-1/2 rounded-md border bg-white px-2 py-2 shadow-lg group-hover:visible">
                <div className="z-[100] whitespace-nowrap text-xs text-red-500 ">{errors?.[name]?.message}</div>
            </div>
        </div>
    ) : (
        ""
    );
};

const TextArea = ({ register, label, name, validate, errors }) => {
    const inputValue = useInput();

    return (
        <div className="relative h-[120px] w-[320px] ">
            <textarea
                name={name}
                defaultValue={inputValue?.[name] || ""}
                {...register(name, validate)}
                className={`cool-input relative h-full w-full rounded-md border-[3px] px-2 pt-4 pb-1 ${errors?.[name] && '!border-red-500'}`}></textarea>
            <ErrorValidate errors={errors} name={name} />
            <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-text">{label}</div>
        </div>
    );
};


const Input = props => {
    const inputValue = useInput();
    const { validate, register, errors, label, name, width } = props;
    return (
        <div className=" flex">
            <div className="relative">
                <input
                    {...register(name, validate)}
                    defaultValue={inputValue?.[name] || ""}
                    type="text"
                    className={`cool-input rounded-md border-[3px] px-2 py-1 ${errors?.[name] && "border-red-500"}`}
                    style={{ width: width }}
                />
                <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2  text-sm ">{label}</div>
                <ErrorValidate {...props} />
            </div>
        </div>
    );
};

const YearCheckbox = ({ register, errors, validate, index }) => {
    const inputValue = useInput();
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input
                defaultChecked={inputValue?.year?.[index - 1]}
                {...register(`year`, validate)}
                name="year"
                type="checkbox"
                className={` form-checkbox rounded-sm border-2  text-secondary ${errors.year ? "!border-red-500" : "border-text-light"}`}
                value={index}
            />
            <span className="">{index}</span>
        </label>
    );
};
const GradeRadio = ({ register, errors, validate, index, value }) => {
    const inputValue = useInput();
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input
                {...register("minGrade", validate)}
                defaultChecked={inputValue?.minGrade === value}
                type="radio"
                name="minGrade"
                className={`form-radio border-2 border-text-light text-secondary ${errors?.minGrade && "!border-red-500"}`}
                value={value}
            />
            <span className="">{value}</span>
        </label>
    );
};

export default FillDetailDesktop;
