import React, { Fragment, forwardRef, useRef, useEffect } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import gsap, { Back, Power4 } from "gsap";
import { useNonInitialEffect } from "../../../composables/useNonInitialEffect";

import { ReactComponent as RegisterPeopleTA } from "../../../assets/images/register-people-ta.svg";
import { ReactComponent as RegisterPeopleTeacher } from "../../../assets/images/register-people-teacher.svg";
import { ReactComponent as EZtantLogo } from '../../../assets/logos/eztant.svg'

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputProvider } from "../contexts/InputContext";

import TeacherInput from "./components/TeacherInput";
import TaInput from "./components/TaInput";

const RegisterDesktop = props => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const handleCloseModal = () => {
        setIsOpen(false);
    };
    return (
        <InputProvider>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto" onClose={() => handleCloseModal()}>
                    <>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => navigate(-1)}>
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
                            leaveTo="opacity-0 scale-95">
                            {ref => <MainBody ref={ref} {...props} onClose={() => setIsOpen(false)} />}
                        </Transition.Child>
                    </>
                </Dialog>
            </Transition>
        </InputProvider>
    );
};

const MainBody = forwardRef((props, ref) => {
    const { onClose } = props;
    const [curRole, setCurRole] = useState("student");
    const changeRole = role => {
        setCurRole(role);
    };
    const [isRegSuccess, setIsRegSuccess] = useState(false);
    const handleOnRegSuccess = () => {
        setIsRegSuccess(true);
    };

    // handle register success animation
    const secondaryContainer = useRef(null);
    const mainContainer = useRef(null);
    useNonInitialEffect(() => {
        // document.getElementById('').offsetParent
        const curSecondConH = secondaryContainer.current.offsetHeight;
        const curSecondConW = secondaryContainer.current.offsetWidth;
        const curSecondConT = secondaryContainer.current.offsetParent;
        const curSecondConL = secondaryContainer.current.offsetLeft;

        const tl = gsap.timeline();

        // insert temp element for prevent expand after make container absolute position
        const parent = mainContainer.current;
        const tempElement = document.createElement("div");
        tempElement.style.width = "100%";
        parent.insertBefore(tempElement, parent.children[1]);

        tl.fromTo(
            secondaryContainer.current,
            {
                width: curSecondConW,
                height: curSecondConH,
                position: "absolute",
                zIndex: 10,
                x: curSecondConL,
                y: curSecondConT,
            },
            {
                duration: 1,
                ease: "power4.inOut",
                xPercent: -50,
                left: "50%",
                yPercent: -50,
                top: "50%",
                x: 0,
                y: 0,
            }
        )
            .fromTo(
                mainContainer.current,
                {
                    width: `${mainContainer.current.offsetWidth}px`,
                },
                {
                    width: `${curSecondConW - 100}px`,
                    duration: 1,
                    ease: "power4.inOut",
                },
                "<"
            )
            .to(
                secondaryContainer.current,
                {
                    width: curSecondConW + curSecondConW * 0.5,
                    height: curSecondConH + curSecondConH * 0.1,
                    duration: 1,
                    ease: "power4.inOut",
                },
                "+=0"
            );

        return () => {
            tl.kill();
        };
    }, [isRegSuccess]);

    return (
        <div ref={ref} className="flex-cen relative h-[550px] w-[80%] max-w-[1000px] transform transition-all ">
            <div ref={mainContainer} className="relative flex h-full w-full bg-white shadow-md ">
                <button></button>
                <RoleSelecter changeRole={changeRole} role={curRole} />
                <SecondaryBody ref={secondaryContainer} role={curRole} isRegSuccess={isRegSuccess} />
                <InputBody role={curRole} onClose={onClose} handleOnRegSuccess={handleOnRegSuccess} />
            </div>
        </div>
    );
});

const RoleSelecter = ({ changeRole, role }) => {
    return (
        <div className="relative flex h-full w-[40px] shrink-0 flex-col items-center justify-between md:w-[70px]">
            {/* icon */}
            <div className="w-[80%] mt-3">
                <EZtantLogo/>
            </div>
            {/* role */}
            <div className="absolute bottom-[20px] flex h-full w-full flex-col items-center justify-end overflow-hidden">
                <div
                    className="vertical-text flex-col-cen absolute bottom-[183.3px] h-1/4 w-full cursor-pointer text-lg text-gray-800 hover:bg-slate-100  md:h-1/3 md:text-2xl"
                    onClick={() => changeRole("teacher")}>
                    อาจารย์
                </div>
                <div
                    className="vertical-text flex-col-cen absolute h-1/4 w-full cursor-pointer text-lg text-gray-800 hover:bg-slate-100  md:h-1/3 md:text-2xl"
                    onClick={() => changeRole("student")}>
                    นักศึกษา
                </div>
                {/* hider */}
                <div
                    className="absolute bottom-0 left-0 h-1/4 w-[3px] bg-[#14279b] transition-transform duration-500 ease-in-out md:h-1/3 md:w-[7px]"
                    style={{
                        transform: role === "teacher" ? "translateY(-100%)" : "translateY(0)",
                    }}></div>
            </div>
        </div>
    );
};

const SecondaryBody = forwardRef(({ role, isRegSuccess }, ref) => {
    // handle onChangeRole event animation
    const taPicture = useRef(null);
    const teacherPicture = useRef(null);
    const container = useRef(null);

    const navigate = useNavigate();
    const finishedOverlay = useRef(null);
    useEffect(() => {
        gsap.set(finishedOverlay.current, {
            yPercent: -100,
        });
    }, []);

    useEffect(() => {
        const offset = taPicture.current.height.animVal.value;
        const tl = gsap.timeline();
        gsap.set(teacherPicture.current , {
            y: offset,
        })
        if (role === "student") {
            tl.to(
                taPicture.current,
                {
                    ease: Back.easeOut.config(1.4),
                    duration: 1,
                    y: 0,
                }
            ).to(
                teacherPicture.current,
                {
                    ease: Power4.easeOut,
                    duration: 1,
                    y: offset,
                },
                "<"
            );
        }
        if (role === "teacher") {
            tl.to(
                taPicture.current,
                {
                    duration: 1,
                    ease: Power4.easeOut,
                    y: offset,
                }
            ).to(
                teacherPicture.current,
                {
                    ease: Back.easeOut.config(1.4),
                    duration: 1,
                    y: 0,
                },
                "<"
            );
        }
    }, [role]);

    useNonInitialEffect(() => {
        const tl = gsap.timeline();
        tl.to(
            container.current,
            {
                y: "100%",
                duration: 1,
                ease: "power4.inOut",
            },
            "+=1"
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
    }, [isRegSuccess]);

    return (
        <div
            ref={ref}
            className=" relative hidden h-[605px] w-full self-center overflow-hidden bg-primary text-lg  font-medium text-white shadow-2xl md:flex">
            <div className="relative flex h-full w-full flex-col items-center space-y-2 " ref={container}>
                <span className="mt-4 text-3xl font-medium text-white">ลงทะเบียน</span>
                <span className="h-[1.5px] w-[65%] bg-white "></span>
                <span className="text-sm font-normal text-white">ยินดีต้อนรับเข้าสู่ระบบของ Eztant</span>
                <div className="triangle-clip absolute bottom-0 left-0 h-1/6 w-full bg-white"></div>

                <RegisterPeopleTA className="absolute -right-4 bottom-0" ref={taPicture} />
                <RegisterPeopleTeacher className="absolute -right-4 bottom-0" ref={teacherPicture} />
            </div>
            <div
                ref={finishedOverlay}
                className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center space-y-10 bg-transparent">
                <span className=" stagger-animation text-3xl">ลงทะเบียน</span>
                <span className=" stagger-animation h-[2px] w-3/4 bg-white"></span>
                <span className=" stagger-animation text-[4vw]">เสร็จเรียบร้อย</span>
                <FontAwesomeIcon className="stagger-animation text-[80px]" icon={faCheckCircle} />
                <div
                    className="stagger-animation flex-cen w-2/3 cursor-pointer rounded-full border-4 border-white bg-white py-4 text-xl text-primary hover:border-white hover:bg-primary hover:text-white"
                    onClick={async () => {
                        await navigate("/");
                        await navigate("/login", {
                            state: {
                                backgroundLocation: {
                                    pathname: "/",
                                    search: "",
                                    hash: "",
                                    state: null,
                                    key: "vgcp8l3i",
                                },
                            },
                        });
                    }}>
                    เข้าสุ่ระบบ
                </div>
            </div>
        </div>
    );
});

const InputBody = props => {
    return (
        <div className="relative flex w-[900px] flex-col items-center justify-center overflow-hidden">
            <>
                <TeacherInput {...props} />
                <TaInput {...props} />
            </>
        </div>
    );
};

export default RegisterDesktop;
