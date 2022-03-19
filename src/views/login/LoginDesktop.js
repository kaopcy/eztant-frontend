import React, { Fragment, forwardRef, useRef, useEffect } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import gsap, { Back, Power4 } from "gsap";

import { ReactComponent as RegisterPeopleTA } from "../../assets/images/register-people-ta.svg";
import { ReactComponent as RegisterPeopleTeacher } from "../../assets/images/register-people-teacher.svg";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNonInitialEffect } from "../../composables/useNonInitialEffect";
import { UserinputProvider } from "../../composables/context/useUserinputContext";
import { useUserinput , useHandleUserinputUpdate } from "../../composables/context/useUserinputContext";

import TeacherInput from "../../component/register/TeacherInput";
import TaInput from "../../component/register/TaInput";

const LoginDesktop = (props) => {
    useEffect(() => {
        console.log("hi this is desktop login");
    }, []);
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
    const { onClose, handleInput, userinput } = props;
    const [curRole, setCurRole] = useState("student");
    const changeRole = (role) => {
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
        <div
            ref={ref}
            className="flex-cen relative h-[550px] w-[80%] max-w-[1000px] transform transition-all bg-blue-300 "
        >
            <input type="text" />
        </div>
    );
});

export default LoginDesktop;
