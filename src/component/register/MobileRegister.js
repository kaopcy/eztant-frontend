import React, { useState } from "react";
import ArrowFatRight from "../utils/ArrowFatRight";
import GoogleRegister from "./GoogleRegister";
import { useNavigate } from "react-router-dom";
const MobileRegister = (props) => {
    const [role, setRole] = useState("teacher");
    const navigate = useNavigate();
    return (
        <div className="flex w-full flex-col items-center space-y-10 bg-white py-10 px-8 text-text">
            <ArrowFatRight
                className="self-start"
                onClick={() => navigate(-1)}
            />
            <RoleSelector role={role} setRole={setRole} />
            <GoogleRegister />
            <span className="text-lg font-bold text-secondary">ลงทะเบียน</span>
            <InputField {...props} />
        </div>
    );
};

const Input = (props) => {
    const { userinput, handleInput, type, label } = props;
    return (
        <div className="flex-col-cen input-group mb-2 w-[95%] items-start xs:w-[85%]">
            <div className="input-label  ">{label}</div>
            <input
                type="text"
                value={userinput[type]}
                onChange={handleInput}
                name={type}
                className="input-register py2 text-xl"
            />
        </div>
    );
};

const InputField = (props) => {
    return (
        <div className="flex w-full flex-col items-center">
            <Input {...props} type="firstname" label="ชื่อ" />
            <Input {...props} type="lastname" label="นามสกุล" />
            <Input {...props} type="email" label="อีเมล์" />
            <Input {...props} type="password" label="รหัสผ่าน" />
            <Input {...props} type="phone" label="โทรศัพท์" />
        </div>
    );
};

const RoleSelector = (props) => {
    const { role, setRole } = props;
    const isTeacher = role === "teacher";
    const isStudent = role === "student";
    return (
        <div className="relative flex w-[100%]">
            <div
                className={`flex flex-[1] cursor-pointer items-center justify-center py-2 hover:bg-slate-50 ${
                    isTeacher ? "text-primary" : "text-text"
                }`}
                onClick={() => setRole("teacher")}
            >
                อาจารย์
            </div>
            <div
                className={`flex flex-[1] cursor-pointer items-center justify-center py-2 hover:bg-slate-50 ${
                    isStudent ? "text-primary" : "text-text"
                }`}
                onClick={() => setRole("student")}
            >
                นักศึกษา
            </div>
            <div className="absolute top-full h-[1.5px] w-full bg-gray-200"></div>
            <div
                className={`absolute top-full h-[1.5px] w-1/2 bg-primary transition-transform  ${
                    role === "teacher" ? "translate-x-0" : "translate-x-full"
                }`}
            ></div>
        </div>
    );
};

export default MobileRegister;
