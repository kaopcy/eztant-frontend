import React, { Fragment, forwardRef, useRef, useEffect } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import gsap, { Back } from "gsap";

import { ReactComponent as EztantLogo } from "../../assets/logos/eztant.svg";
import { ReactComponent as DecorationImage } from "../../assets/images/login-decoration.svg";
import GoogleRegister from "../../component/register/GoogleRegister";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    UserinputProvider,
    useUserinput,
    useHandleUserinputUpdate,
} from "../../composables/context/useUserinputContext";

const LoginDesktop = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    return (
        <UserinputProvider mode="login">
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
                    onClose={() => handleCloseModal()}
                >
                    <>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-300"
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
                                    {...props}
                                    onClose={() => setIsOpen(false)}
                                />
                            )}
                        </Transition.Child>
                    </>
                </Dialog>
            </Transition>
        </UserinputProvider>
    );
};

const MainBody = forwardRef((props, ref) => {
    const decorationContainer = useRef(null);
    const inputContainer = useRef(null);
    const mainContainer = useRef(null);
    // const tl = useRef(null);

    useEffect(() => {
        const mainConWidth = mainContainer.current.offsetWidth;
        const inputConWidth = inputContainer.current.offsetWidth;
        const tl = gsap.timeline();
        tl.fromTo(
            inputContainer.current,
            {
                width: `${mainConWidth}px`,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
            },
            {
                borderTopLeftRadius: "1.5rem",
                borderBottomLeftRadius: "1.5rem",
                width: `${inputConWidth}px`,
                duration: 1,
                ease: "power3.inOut",
            },
            "<0.5"
        )
            .from(
                "#dec-img",
                {
                    yPercent: 100,
                    ease: Back.easeOut.config(1.8),
                    duration: 0.7,
                },
                "<0.6"
            )
            .from(
                ".animated-text",
                {
                    xPercent: (i) => Math.pow(-1, i + 1) * 100,
                    stagger: {
                        amount: 0.2,
                    },
                },
                "<"
            );
    }, []);

    return (
        <div
            className="relative flex h-[550px] w-[80%] max-w-[1000px] transform items-center justify-center transition-all"
            ref={ref}
        >
            <div
                className="flex-cen relative h-full w-full justify-end overflow-hidden bg-primary text-text shadow-md"
                ref={mainContainer}
            >
                <button></button>
                <DecorationContainer ref={decorationContainer} />
                <InputContainer ref={inputContainer} />
            </div>
        </div>
    );
});

const InputContainer = forwardRef((_, ref) => {
    const navigate = useNavigate()
    return (
        <div
            className="flex-col-cen h-full w-[60%] shrink-0 space-y-6 rounded-l-3xl bg-white shadow-md"
            ref={ref}
        >
            <span className="text-3xl">เข้าสู่ระบบ</span>
            <GoogleRegister />
            <div className="flex-cen relative w-full space-x-1">
                <div className="h-[2px] w-1/4 bg-gray-200"></div>
                <div className="text-base text-gray-500">หรือ</div>
                <div className="h-[2px] w-1/4 bg-gray-200"></div>
            </div>
            <div className="flex w-full flex-col items-center">
                <div className="flex-col-cen input-group mb-2 w-[95%] max-w-[380px] items-start xs:w-[85%]">
                    <Input type="email" label="อีเมล์" />
                    <Input type="password" label="รหัสผ่าน" />
                    <div className="mt-2 mb-6 self-end text-xs text-primary underline ">
                        ลืมรหัสผ่าน
                    </div>
                    <div className="input-group mt-4 flex w-full items-center justify-center space-x-8">
                        <button
                            className=" group flex h-12 w-[11rem] items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary"
                            onClick={() => navigate(-1)}
                        >
                            <FontAwesomeIcon
                                className="text-lg text-secondary group-hover:text-white"
                                icon={faChevronLeft}
                            />
                            <span className="text-lg text-secondary group-hover:text-white">
                                กลับ
                            </span>
                        </button>
                        <button className=" flex h-12 w-full items-center justify-center space-x-2 rounded-2xl border-4 border-secondary bg-secondary px-6 py-1">
                            <span className="text-lg text-white">
                                ลงทะเบียน
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-cen mt-8 w-[80%] items-center justify-center space-x-1">
                <span className="text-xs text-gray-400">มีบัญชีอยู่แล้ว?</span>
                <span className="cursor-pointer text-xs text-blue-800 underline ">
                    เข้าสู่ระบบ
                </span>
            </div>
        </div>
    );
});

const Input = (props) => {
    const { type, label } = props;
    const userinput = useUserinput();
    const handleInput = useHandleUserinputUpdate();
    return (
        <>
            <div className="input-label  ">{label}</div>
            <input
                type="text"
                value={userinput[type]}
                onChange={handleInput}
                name={type}
                className="input-register py-1 text-xl"
            />
        </>
    );
};

const DecorationContainer = forwardRef((_, ref) => {
    const Text = ({ children }) => {
        return (
            <div className="overflow-hidden">
                <div className="animated-text whitespace-nowrap text-[35px] font-bold tracking-[2px] text-white ">
                    {children}
                </div>
            </div>
        );
    };
    return (
        <div
            className="flex-col-cen relative h-full flex-grow justify-start bg-transparent py-8"
            ref={ref}
        >
            <EztantLogo className="mb-6 h-16" />
            <div className="flex justify-center space-x-4">
                <div className="flex flex-col">
                    <Text>หาผู้ช่วย</Text>
                    <Text>ต้องที่นี่</Text>
                </div>
                <div className="flex flex-col">
                    <Text>แบบอีซี่</Text>
                    <Text>อีซี่แทนต์</Text>
                </div>
            </div>
            <DecorationImage
                id="dec-img"
                className="absolute bottom-0 left-0 w-[110%]"
            />
        </div>
    );
});

export default LoginDesktop;
