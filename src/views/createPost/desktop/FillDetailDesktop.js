import React from "react";
import { useHandleInput } from "../context/inputCreatePostContext";

const FillDetailDesktop = () => {
    return (
        <div className="mt-16 flex w-full flex-col items-center justify-center space-x-16 xl:flex-row xl:items-start ">
            <div className="flex flex-col space-y-12">
                <div className="flex space-x-20 ">
                    <div className="flex flex-col space-y-12">
                        <Input label="ชื่อวิชา" inputWidth="350px" name="subjectName" />
                        <Input label="รหัสวิชา" inputWidth="350px" name="subjectID" />
                    </div>
                    <div className="flex flex-col space-y-12">
                        <div className="flex items-end space-x-4">
                            <Input label="ค่าตอบแทน" inputWidth="140px" name="wage" />
                            <div className="">บาทต่อชั่วโมง</div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="py-1">ชั้นปีที่รับ</div>
                            <YearCheckbox label={"1"} value={"1"} />
                            <YearCheckbox label={"2"} value={"2"} />
                            <YearCheckbox label={"3"} value={"3"} />
                            <YearCheckbox label={"4"} value={"4"} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="mr-4">เกรดรายวิชาไม่ต่ำกว่า</div>
                    <div className="flex items-center space-x-4">
                        <GradeRadio value={"S"} label={"S"} />
                        <GradeRadio value={"A"} label={"A"} />
                        <GradeRadio value={"B+"} label={"B+"} />
                        <GradeRadio value={"B"} label={"B"} />
                        <GradeRadio value={"C+"} label={"C+"} />
                        <GradeRadio value={"C"} label={"C"} />
                        <GradeRadio value={"D+"} label={"D+"} />
                        <GradeRadio value={"D"} label={"D"} />
                        <GradeRadio value={"F"} label={"F"} />
                    </div>
                </div>
            </div>
            <div className="mt-12 flex h-full w-[750px] flex-row space-x-12 xl:mt-0 xl:w-auto xl:flex-col xl:space-x-0 xl:space-y-8">
                <TextArea label="หน้าที่" name="duty" />
                <TextArea label="ข้อกำหนด" name="requirement" />
            </div>
        </div>
    );
};

const TextArea = ({ label, name }) => {
    const handleInput = useHandleInput();

    return (
        <div onChange={handleInput} className="relative h-[120px] w-[320px] ">
            <textarea name={name} className="relative h-full w-full rounded-md border-[3px] px-2 pt-4 pb-1 "></textarea>
            <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-text">{label}</div>
        </div>
    );
};

const Input = ({ label, name, inputWidth }) => {
    const handleInput = useHandleInput();
    return (
        <div className=" flex">
            <div className="relative">
                <input name={name} type="text" className="rounded-md border-[3px] px-2 py-1" style={{ width: inputWidth }} onChange={handleInput} />
                <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2  text-sm ">{label}</div>
            </div>
        </div>
    );
};

const YearCheckbox = ({ label, value }) => {
    const handleInput = useHandleInput();
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input type="checkbox" className=" form-checkbox rounded-sm border-2 border-text-light text-secondary" value={value} />
            <span className="">{label}</span>
        </label>
    );
};

const GradeRadio = ({ label, value }) => {
    const handleInput = useHandleInput();
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input type="radio" className=" form-radio border-2 border-text-light text-secondary" value={value} />
            <span className="">{label}</span>
        </label>
    );
};

export default FillDetailDesktop;
