import React, { forwardRef, useContext, useLayoutEffect, useRef, useState } from "react";
import gsap, { Back } from "gsap";
import { useNavigate } from "react-router-dom";
import { InputProvider, InputContext } from "../contexts/InputContext";
import { useTwoComTransition } from "../../../composables/animation/useTwoComTransition";
import { register } from "../../../api/authApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import ArrowFatRight from "../../../component/utils/ArrowFatRight";
import GoogleRegister from "../desktop/components/GoogleRegister";
import SmallLoading from "../../../component/utils/SmallLoading";

const RegisterMobile = props => {
    return (
        <InputProvider>
            <Main {...props} />
        </InputProvider>
    );
};

const Main = props => {
    const [role, setRole] = useState("teacher");
    const navigate = useNavigate();

    const teacherInputContainer = useRef(null);
    const taInputContainer = useRef(null);

    const { userinput } = useContext(InputContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isRegSuccess, setIsRegSuccess] = useState(false);
    const handleOnRegSuccess = async () => {
        await register(userinput, setIsLoading, setError);
        setIsRegSuccess(true);
    };

    useTwoComTransition(
        {
            firstContainer: taInputContainer,
            secondContainer: teacherInputContainer,
        },
        role === "teacher"
    );
    return (
        <>
            <div className="flex w-full flex-col items-center space-y-8 bg-white px-8 pb-24 text-text">
                <ArrowFatRight className="mt-4 self-start" onClick={() => navigate(-1)} />
                <RoleSelector role={role} setRole={setRole} />
                <GoogleRegister />
                <span className="text-lg font-bold text-secondary">ลงทะเบียน</span>
                <div className="relative w-full overflow-hidden mb-40">
                    <TeacherInputField {...props} ref={teacherInputContainer} />
                    <TaInputField {...props} ref={taInputContainer} />
                </div>
                {isRegSuccess && <RegisterFinishedOverlay onClose={() => navigate('/login')} />}
            </div>
            <SmallLoading isLoading={isLoading} gap={4}>
                <div
                    className="btn-orange flex-col-cen fixed bottom-0 h-16 w-full text-xl font-bold xs:text-2xl"
                    onClick={() => handleOnRegSuccess()}>
                    <SmallLoading.Title>ลงทะเบียน</SmallLoading.Title>
                    <SmallLoading.Loader>ควย</SmallLoading.Loader>
                </div>
            </SmallLoading>
        </>
    );
};

const Input = props => {
    const { type, label } = props;
    const { userinput, handleInputUpdate: handleInput, handleOnBlur } = useContext(InputContext);
    return (
        <div className="flex-col-cen input-group mb-2 w-[95%] items-start xs:w-[85%]">
            <div className="input-label  ">{label}</div>
            <input type="text"  onChange={handleInput} onBlurCapture={handleOnBlur} name={type} className="input-register py2 text-xl" />
        </div>
    );
};

const TeacherInputField = forwardRef((props, ref) => {
    return (
        <div className="absolute top-0  flex w-full flex-col items-center" ref={ref}>
            <Input {...props} type="firstname" label="ชื่อ" />
            <Input {...props} type="lastname" label="นามสกุล" />
            <Input {...props} type="email" label="อีเมล์" />
            <Input {...props} type="password" label="รหัสผ่าน" />
            <Input {...props} type="phone" label="โทรศัพท์" />
        </div>
    );
});

const TaInputField = forwardRef((props, ref) => {
    return (
        <div className="flex w-full flex-col items-center" ref={ref}>
            <Input {...props} type="firstname" label="ชื่อ" />
            <Input {...props} type="lastname" label="นามสกุล" />
            <Input {...props} type="email" label="อีเมล์" />
            <Input {...props} type="password" label="รหัสผ่าน" />
            <Input {...props} type="phone" label="โทรศัพท์" />
            <Input {...props} type="studentID" label="รหัสนักศึกษา" />
            <Input {...props} type="department" label="ภาควิชา" />
            <Input {...props} type="year" label="ชั้นปี" />
        </div>
    );
});

const RoleSelector = props => {
    const { role, setRole } = props;
    const isTeacher = role === "teacher";
    const isStudent = role === "student";
    return (
        <div className="relative flex w-[100%]">
            <div
                className={`flex flex-[1] cursor-pointer items-center justify-center py-2 hover:bg-slate-50 ${
                    isTeacher ? "text-primary" : "text-text"
                }`}
                onClick={() => setRole("teacher")}>
                อาจารย์
            </div>
            <div
                className={`flex flex-[1] cursor-pointer items-center justify-center py-2 hover:bg-slate-50 ${
                    isStudent ? "text-primary" : "text-text"
                }`}
                onClick={() => setRole("student")}>
                นักศึกษา
            </div>
            <div className="absolute top-full h-[1.5px] w-full bg-gray-200"></div>
            <div
                className={`absolute top-full h-[1.5px] w-1/2 bg-primary transition-transform  ${
                    role === "teacher" ? "translate-x-0" : "translate-x-full"
                }`}></div>
        </div>
    );
};

const RegisterFinishedOverlay = ({ onClose }) => {
    const finishedOverlay = useRef(null);
    const container = useRef(null);

    useLayoutEffect(() => {
        const tl = gsap.timeline();
        gsap.set(finishedOverlay.current, {
            yPercent: -100,
        });
        gsap.set(container.current, {
            yPercent: 100,
            opacity: 0,
        });
        tl.to(
            container.current,
            {
                yPercent: 0,
                opacity: 1,
                ease: "power2.inOut",
            },
            "<"
        )
            .to(
                finishedOverlay.current,
                {
                    yPercent: 0,
                    duration: 1,
                    ease: Back.easeInOut.config(2),
                },
                "<"
            )
            .fromTo(
                ".stagger-animation",
                {
                    y: e => (5 - e) * -100,
                },
                {
                    y: 0,
                    duration: 0.6,
                    ease: "power4.inOut",
                    stagger: {
                        amount: 0.4,
                    },
                },
                "<"
            );
    });
    return (
        <>
            <div
                className="fixed bottom-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden bg-black text-white opacity-30"
                onClick={() => onClose()}></div>
            <div className="fixed z-30 h-[80%] w-[80%]  overflow-hidden bg-primary text-white" ref={container}>
                <div
                    ref={finishedOverlay}
                    className="absolute  top-0 left-0 flex h-full w-full flex-col items-center justify-center space-y-10 bg-transparent">
                    <span className=" stagger-animation text-3xl">ลงทะเบียน</span>
                    <span className=" stagger-animation h-[2px] w-3/4 bg-white"></span>
                    <span className=" stagger-animation text-[4vw]">เสร็จเรียบร้อย</span>
                    <FontAwesomeIcon className="stagger-animation text-[80px]" icon={faCheckCircle} />
                    <div
                        className="stagger-animation flex-cen w-2/3 cursor-pointer rounded-full border-4 border-white bg-white py-4 text-xl text-primary hover:border-white hover:bg-primary hover:text-white"
                        onClick={() => onClose()}>
                        เข้าสุ่ระบบ
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterMobile;
