import React, { Fragment, forwardRef, useRef, useEffect } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ReactComponent as EztantLogo } from "../../../assets/logos/eztant.svg";
import { ReactComponent as DecorationImage } from "../../../assets/images/login-decoration.svg";
import { InputProvider } from '../contexts/inputContext'

import InputContainer from "./components/InputContainer";

const LoginDesktop = props => {
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
                            enter="ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-300"
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
                            {ref => <MainBody ref={ref} {...props} onClose={() => handleCloseModal()} />}
                        </Transition.Child>
                    </>
                </Dialog>
            </Transition>
        </InputProvider>
    );
};

const MainBody = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const decorationContainer = useRef(null);
    const inputContainer = useRef(null);
    const mainContainer = useRef(null);

    const finishedAnimation = () => {
        console.log('now finish');
        const tl = gsap.timeline();
        tl.to(inputContainer.current, {
            xPercent: 100,
            duration: 1.3,
            ease: "power4.inOut",
            onComplete: ()=> gsap.set(inputContainer.current , {
                display: "none"
            })
        })
            .fromTo(
                mainContainer.current,
                {
                    width: `${mainContainer.current.offsetWidth}px`,
                },
                {
                    width: `${mainContainer.current.offsetWidth * 0.5}px`,
                    ease: "power2.inOut",
                },
                "-=0.5"
            )
            .to(
                decorationContainer.current,
                {
                    width: mainContainer.current.offsetWidth * 0.5,
                    position: "absolute",
                    xPercent: -50,
                    left: "50%",
                    ease: "power4.inOut",
                },
                "<"
            )
            .to(
                decorationContainer.current,
                {
                    yPercent: 100,
                    ease: "power4.in",
                },
                "-=0.75"
            )
            .to(
                "#finished-overlay",
                {
                    yPercent: 100,
                    ease: "power4.inOut",
                },
                "-=0.4"
            )
            .fromTo(
                ".stagger-animation",
                {
                    y: e => (5 - e) * -400,
                },
                {
                    y: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    stagger: {
                        amount: 0.3,
                    },
                },
                "<"
            );
    };

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(
            inputContainer.current,
            {
                width: `100%`,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
            },
            {
                borderTopLeftRadius: "1.5rem",
                borderBottomLeftRadius: "1.5rem",
                width: `60%`,
                duration: 1,
                ease: "power3.inOut",
            },
            "<0.5"
        )
            .from(
                ".animated-text",
                {
                    yPercent: 150,
                    ease: "power4.out",
                },
                "<0.6"
            )
            .from(
                ".animated-text-2",
                {
                    yPercent: 150,
                    ease: "power4.out",
                },
                "<0.1"
            )
    }, []);

    return (
        <div className="relative flex h-[550px] w-[80%] max-w-[1000px] transform items-center justify-center transition-all" ref={ref}>
            <div className=" flex-cen relative h-full w-full shrink-0 justify-end overflow-hidden bg-primary text-text shadow-md" ref={mainContainer}>
                <button></button>
                <DecorationContainer ref={decorationContainer} />
                <InputContainer ref={inputContainer} {...props} finishedAnimation={finishedAnimation} />
                {/* overlay */}
                <div
                    id="finished-overlay"
                    className="absolute -top-full left-0 flex h-full w-full flex-col items-center justify-center space-y-10 bg-transparent text-white">
                    <span className=" stagger-animation text-3xl">ลงทะเบียน</span>
                    <span className=" stagger-animation h-[2px] w-3/4 bg-white"></span>
                    <span className=" stagger-animation text-[4vw]">เสร็จเรียบร้อย</span>
                    <FontAwesomeIcon className="stagger-animation text-[80px]" icon={faCheckCircle} />
                    <div
                        className="stagger-animation flex-cen w-2/3 cursor-pointer rounded-full border-4 border-white bg-white py-4 text-xl text-primary hover:border-white hover:bg-primary hover:text-white"
                        onClick={async () => {
                            await navigate("/");
                        }}>
                        เข้าสู่หน้าหลัก
                    </div>
                </div>
            </div>
        </div>
    );
});

const DecorationContainer = forwardRef((_, ref) => {
    useEffect(() => {}, []);

    const Text = ({ children, animatedClass }) => {
        return (
            <div className="overflow-hidden">
                <div className={`${animatedClass} whitespace-nowrap text-[30px] font-bold tracking-[2px] text-white lg:text-[35px] `}>{children}</div>
            </div>
        );
    };
    return (
        <>
            <div className="flex-col-cen relative h-full flex-grow justify-start bg-transparent py-8" ref={ref}>
                <EztantLogo className="mb-6 h-16" />
                <div className="flex justify-center space-x-3">
                    <div className="flex flex-col">
                        <Text animatedClass={"animated-text"}>"หาผู้ช่วย</Text>
                        <Text animatedClass={"animated-text-2"}>&nbsp;&nbsp;ต้องที่นี่</Text>
                    </div>
                    <div className="flex flex-col">
                        <Text animatedClass={"animated-text"}>แบบอีซี่</Text>
                        <Text animatedClass={"animated-text-2"}>อีซี่แทนต์"</Text>
                    </div>
                </div>
                <DecorationImage id="dec-img" className="absolute bottom-0 left-0 z-10 w-[110%] max-w-[440px]" />
            </div>
        </>
    );
});

export default LoginDesktop;
