import React, { useState } from "react";
import { useMatch, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { faChevronDown, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisclosureAnimate from "../../../component/utils/DisclosureAnimate";

import { useSetInput, useInput } from "../context/inputCreatePostContext";
import { fieldValidate, yearValidate, wageValidate, subjectNameValidate, subjectIDValidate } from "../../../utils/createDetailInputValidate";

import { GRADE_LIST } from "../../../generalConfig";

const FillDetailMobile = () => {
    const navigate = useNavigate();

    const setInputValue = useSetInput();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm({ mode: "onChange" });

    const onSubmit = data => {
        if (!isValid) return;
        setInputValue(data);
        navigate("fill-table");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full overflow-hidden px-1">
            <div className="mt-4 text-center font-bold text-secondary">รายละเอียด</div>
            <div className="mt-10 mb-32 flex w-full flex-col space-y-10">
                <Input validate={subjectNameValidate} register={register} errors={errors} label="ชื่อวิชา" width="100%" name="subjectName" />
                <Input validate={subjectIDValidate} register={register} errors={errors} label="รหัสวิชา" width="100%" name="subjectID" />
                <div className="flex w-full items-end space-x-3">
                    <Input validate={wageValidate} register={register} errors={errors} label="ค่าตอบแทน" width="160px" name="wage" />
                    <div className="">บาท/ชั่วโมง</div>
                </div>
                <div className="relative flex w-full items-center space-x-8">
                    <div className="relative flex space-x-4">
                        <div className="py-1">ชั้นปีที่รับ</div>
                        {[...Array(4)].map((_, index) => (
                            <YearCheckbox key={index} register={register} errors={errors} validate={yearValidate} index={index + 1} />
                        ))}
                        <ErrorValidate errors={errors} name="year" className="!left-full" />
                    </div>
                </div>
                <div className="flex items-center space-x-8">
                    <div className="">เกรดรายวิชาไม่ต่ำกว่า</div>
                    <Disclosure setValue={setValue} />
                </div>
                <TextArea errors={errors} validate={fieldValidate} register={register} label="หน้าที่" name="duty" />
                <TextArea errors={errors} validate={fieldValidate} register={register} label="ข้อกำหนด" name="requirement" />
            </div>
            <button type="submit" className="btn-orange flex-col-cen fixed left-0 bottom-0 z-[100] h-14 w-full">
                <div className="text-xl font-bold ">ถัดไป</div>
            </button>
        </form>
    );
};

const ErrorValidate = ({ errors, name, className }) => {
    return errors?.[name] ? (
        <div className={`group absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${className}`}>
            <FontAwesomeIcon icon={faCircleInfo} className="text-sm text-red-500" />
            <div className="invisible absolute  bottom-full right-0 z-[100] rounded-md border bg-white shadow-lg group-hover:visible">
                <div className="whitespace-nowrap px-2 py-2 text-xs text-red-500">{errors?.[name]?.message}</div>
            </div>
        </div>
    ) : (
        ""
    );
};

const TextArea = ({ register, label, name, validate, errors }) => {
    const inputValue = useInput();

    return (
        <div className="relative h-[120px] w-full ">
            <textarea
                name={name}
                defaultValue={inputValue?.[name] || ""}
                {...register(name, validate)}
                className={`cool-input relative h-full w-full rounded-md border-[3px] px-2 pt-4 pb-1 ${
                    errors?.[name] && "!border-red-500"
                }`}></textarea>
            <div className="relative">
                <ErrorValidate errors={errors} name={name} />
            </div>
            <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-text">{label}</div>
        </div>
    );
};

const Input = props => {
    const inputValue = useInput();
    const { validate, register, errors, label, name, width } = props;
    return (
        <div className="flex " style={{ width: width }}>
            <div className="relative " style={{ width: width }}>
                <input
                    {...register(name, validate)}
                    defaultValue={inputValue?.[name] || ""}
                    type="text"
                    
                    className={`cool-input  rounded-md border-2 px-2 py-[0.375rem]  ${errors?.[name] && "border-red-500"}`}
                    style={{ width: width }}
                />
                <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 ">{label}</div>
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

const Disclosure = ({ setValue }) => {
    const [open, setOpen] = useState(false);
    const inputValue = useInput();

    const [selectedSec, setSelectedSec] = useState(inputValue?.minGrade || "F");
    const handleOnSelect = value => {
        setSelectedSec(value);
        setValue("minGrade", value);
    };

    return (
        <DisclosureAnimate toggle={open}>
            {({ childRelativeContainer, childAbsoluteContainer }) => (
                <div
                    className="relative z-10 flex w-[130px] cursor-pointer items-center justify-between space-x-2 rounded-md bg-white px-2 py-1 outline outline-1 outline-text-light"
                    onClick={() => setOpen(e => !e)}>
                    <span className="ellipsis ">{GRADE_LIST.filter(e => selectedSec === e)[0]} </span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    <div className="absolute top-[calc(100%+1px)] -left-2 w-full ">
                        <div className="relative w-full self-end overflow-hidden " ref={childRelativeContainer}>
                            <div ref={childAbsoluteContainer} className="absolute bottom-0 left-0 flex w-full flex-col border bg-white py-2">
                                {GRADE_LIST.map(e => {
                                    const active = e === selectedSec;
                                    return (
                                        <div
                                            className={`w-full  py-1 px-2  ${active ? "bg-primary text-white " : "hover:bg-gray-100 "} `}
                                            onClick={() => handleOnSelect(e)}
                                            key={e}>
                                            {e}
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
