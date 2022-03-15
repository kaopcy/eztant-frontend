import React, { Fragment, forwardRef, useRef, useEffect } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import gsap, { Back, Power4 } from "gsap";

import { ReactComponent as RegisterPeopleTA } from "../../assets/images/register-people-ta.svg";
import { ReactComponent as RegisterPeopleTeacher } from "../../assets/images/register-people-teacher.svg";

import TeacherInput from "../../component/register/TeacherInput";
import TaInput from "../../component/register/TaInput";
const Register = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
                onClose={() => handleCloseModal()}
            >
                <>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => navigate(-1)}
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {(ref) => (
                            <MainBody
                                ref={ref}
                                onClose={() => setIsOpen(false)}
                            />
                        )}
                    </Transition.Child>
                </>
            </Dialog>
        </Transition>
    );
};

const MainBody = forwardRef(({ onClose }, ref) => {
    const [curRole, setCurRole] = useState("student");
    const changeRole = (role) => {
        setCurRole(role);
    };

    useEffect(() => {
        console.log(curRole);
    }, [curRole]);

    return (
        <div
            ref={ref}
            className="relative flex h-[550px] w-[80%] max-w-[1000px] transform bg-white shadow-md transition-all"
        >
            <RoleSelecter changeRole={changeRole} role={curRole} />
            <SecondaryBody role={curRole} />
            <InputBody role={curRole} onclose={onClose} />
        </div>
    );
});

const RoleSelecter = ({ changeRole, role }) => {
    return (
        <div className="relative flex h-full w-[40px] shrink-0 flex-col items-center justify-between md:w-[70px]">
            {/* icon */}
            <div className="h-[40px] w-full bg-blue-50"></div>
            {/* role */}
            <div className="absolute bottom-[20px] flex h-full w-full flex-col items-center justify-end overflow-hidden">
                <div
                    className="vertical-text flex-col-cen absolute bottom-[183.3px] h-1/4 w-full cursor-pointer text-lg text-gray-800 hover:bg-slate-100  md:h-1/3 md:text-2xl"
                    onClick={() => changeRole("teacher")}
                >
                    อาจารย์
                </div>
                <div
                    className="vertical-text flex-col-cen absolute h-1/4 w-full cursor-pointer text-lg text-gray-800 hover:bg-slate-100  md:h-1/3 md:text-2xl"
                    onClick={() => changeRole("student")}
                >
                    นักศึกษา
                </div>
                {/* hider */}
                <div
                    className="absolute bottom-0 left-0 h-1/4 w-[3px] bg-[#14279b] transition-transform duration-500 ease-in-out md:h-1/3 md:w-[7px]"
                    style={{
                        transform:
                            role === "teacher"
                                ? "translateY(-100%)"
                                : "translateY(0)",
                    }}
                ></div>
            </div>
        </div>
    );
};

const SecondaryBody = ({ role }) => {
    const taPicture = useRef(null);
    const teacherPicture = useRef(null);
    useEffect(() => {
        const offset = taPicture.current.height.animVal.value;
        console.log();
        const tl = gsap.timeline();
        if (role === "student") {
            tl.fromTo(
                taPicture.current,
                {
                    y: offset,
                    position: "absolute",
                },
                {
                    ease: Back.easeOut.config(1.4),
                    duration: 1,
                    y: 0,
                }
            ).fromTo(
                teacherPicture.current,
                {
                    y: 0,
                    position: "absolute",
                },
                {
                    ease: Power4.easeOut,
                    duration: 1,
                    y: offset,
                },
                "<"
            );
        }
        if (role === "teacher") {
            tl.fromTo(
                taPicture.current,
                {
                    y: 0,
                    duration: 1,
                    position: "absolute",
                },
                {
                    ease: Power4.easeOut,
                    y: offset,
                }
            ).fromTo(
                teacherPicture.current,
                {
                    y: offset,
                    position: "absolute",
                },
                {
                    ease: Back.easeOut.config(1.4),
                    duration: 1,
                    y: 0,
                },
                "<"
            );
        }
    }, [role]);

    return (
        <div className="relative hidden h-[115%] w-full  flex-col items-center space-y-2 self-center overflow-x-hidden overflow-y-hidden bg-[#465ffb] text-lg font-bold text-white shadow-2xl md:flex">
            <span className="mt-4 text-3xl font-medium text-white">
                ลงทะเบียน
            </span>
            <span className="h-[1.5px] w-[65%] bg-white "></span>
            <span className="text-sm font-normal text-white">
                ยินดีต้อนรับเข้าสู่ระบบของ Eztant
            </span>
            <div className="triangle-clip absolute bottom-0 left-0 h-1/6 w-full bg-white"></div>
            <RegisterPeopleTA
                className="absolute -right-4 bottom-0"
                ref={taPicture}
            />
            <RegisterPeopleTeacher
                className="absolute -right-4 bottom-0"
                ref={teacherPicture}
            />
        </div>
    );
};

const InputBody = ({ role, onclose }) => {
    const [userinput, setUserinput] = useState({
        firstname: "",
        lastname: "",
        studentID: "",
        email: "",
        department: "",
        year: "",
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        console.log(`name: ${name}v value: ${value}`);
        setUserinput({
            ...userinput,
            [name]: value,
        });
    };

    return (
        <div className="relative flex w-[900px] flex-col items-center justify-center overflow-hidden">
            <>
                <TeacherInput
                    userinput={userinput}
                    handleInput={handleInput}
                    role={role}
                    onClose={onclose}
                />
                <TaInput
                    userinput={userinput}
                    handleInput={handleInput}
                    role={role}
                    onClose={onclose}
                />
            </>
        </div>
    );
};

export default Register;
