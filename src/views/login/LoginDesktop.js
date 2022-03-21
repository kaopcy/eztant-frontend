import React, {
    Fragment,
    forwardRef,
    useRef,
    useEffect,
    useContext,
} from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import gsap, { Back } from "gsap";
import axios from "axios";

import { faChevronLeft , faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ReactComponent as EztantLogo } from "../../assets/logos/eztant.svg";
import { ReactComponent as DecorationImage } from "../../assets/images/login-decoration.svg";
import GoogleRegister from "../../component/register/GoogleRegister";

// Context
import { AuthContext } from "../../composables/context/auth";
import {
    useUserinput,
    UserinputProvider,
    useHandleUserinputUpdate,
} from "../../composables/context/useUserinputContext";
import { useNonInitialEffect } from "../../composables/useNonInitialEffect";

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
                                    onClose={() => handleCloseModal()}
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
    
    const finishedAnimation = () => {
        const tl = gsap.timeline();
        tl.to(inputContainer.current, {
            xPercent: 100,
            duration: 1.3,
            ease: "power4.inOut",
        })

            .fromTo(
                mainContainer.current,
                {
                    width: `${mainContainer.current.offsetWidth}px`,
                },
                {
                    width: `${mainContainer.current.offsetWidth * 0.5}px`,
                    ease: "power2.inOut",
                }
            )
            .to(
                decorationContainer.current,
                {
                    width: mainContainer.current.offsetWidth * 0.5,
                    position: "absolute",
                    left: "0",
                    ease: "power4.inOut",
                },
                "<"
            )
            .to(decorationContainer.current, {
                yPercent: 100,
                ease: "power4.in",
            }, '-=0.75');
    };

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
                ".animated-text",
                {
                    xPercent: (i) => Math.pow(-1, i + 1) * 100,
                    stagger: {
                        amount: 0.2,
                    },
                },
                "<0.6"
            )
            .set(inputContainer.current, {
                width: "60%",
            });
    }, []);

    return (
        <div
            className="relative flex h-[550px] w-[80%] max-w-[1000px] transform items-center justify-center transition-all"
            ref={ref}
        >
            <div
                className=" flex-cen relative h-full w-full shrink-0 justify-end overflow-hidden bg-primary text-text shadow-md"
                ref={mainContainer}
            >
                <button></button>
                <DecorationContainer ref={decorationContainer} />
                <InputContainer
                    ref={inputContainer}
                    {...props}
                    finishedAnimation={finishedAnimation}
                />
            </div>
        </div>
    );
});

const InputContainer = forwardRef((props, ref) => {
    const { onClose, finishedAnimation } = props;
    const navigate = useNavigate();

    const userinput = useUserinput();
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const loadingRef = useRef(null);
    const loadingTextRef = useRef(null);

    const handleLogin = async (e) => {
        setIsLoading(true);
        const data = await new Promise((resolve) => {
            setTimeout(async () => {
                const res = await axios.get(
                    `https://randomuser.me/api/?seed=${userinput.email}`
                );
                const fakeUser = res.data.results[0];
                resolve(fakeUser);
            }, 100);
        });
        setIsLoading(false);
        console.log(data);
        finishedAnimation();
        login({
            firstname: data.name.first,
            lastname: data.name.last,
            gender: data.gender,
        });
    };

    useNonInitialEffect(() => {
        const tl2 = gsap.timeline({ repeat: -1 });
        const tl = gsap.timeline();
        if (isLoading) {
            tl2.to(loadingRef.current, {
                rotate: "+=360",
                ease: "linear",
            });
            tl.to(loadingTextRef.current, {
                x: -30,
            }).to(
                loadingRef.current,
                {
                    x: 30,
                    opacity: 1,
                },
                "<"
            );
        } else {
            tl.to(loadingTextRef.current, {
                x: 0,
            }).to(
                loadingRef.current,
                {
                    x: 0,
                    opacity: 0,
                },
                "<"
            );
        }
    }, [isLoading]);

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
                            onClick={() => onClose()}
                        >
                            <FontAwesomeIcon
                                className="text-lg text-secondary group-hover:text-white"
                                icon={faChevronLeft}
                            />
                            <span className="text-lg text-secondary group-hover:text-white">
                                กลับ
                            </span>
                        </button>
                        <button
                            className="btn-orange flex-cen group h-12 w-full  space-x-3 rounded-2xl border-4 px-6 py-1"
                            onClick={() => handleLogin()}
                        >
                            <span className="flex-cen relative text-lg">
                                <div ref={loadingTextRef}>เข้าสุ่ระบบ</div>
                                <div
                                    ref={loadingRef}
                                    className="loading sp absolute h-4 w-4 self-center opacity-0 group-hover:border-secondary"
                                ></div>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-cen mt-8 w-[80%] items-center justify-center space-x-1">
                <span className="text-xs text-gray-400">ยังไม่มีบัญชี?</span>
                <span
                    className="cursor-pointer text-xs text-blue-800 underline "
                    onClick={async () => {
                        await navigate("/");
                        await navigate("/register", {
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
                    }}
                >
                    สมัครบัญชีใหม่
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
    const finishedOverlay = useRef(null)
    const navigate = useNavigate()
    
    const Text = ({ children }) => {
        return (
            <div className="overflow-hidden">
                <div className="animated-text whitespace-nowrap text-[30px] font-bold tracking-[2px] text-white lg:text-[35px] ">
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
                className="absolute bottom-0 left-0 w-[110%] max-w-[440px] z-10"
            />
            <div
                ref={finishedOverlay}
                className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center space-y-10 bg-transparent"
            >
                <span className=" stagger-animation text-3xl">ลงทะเบียน</span>
                <span className=" stagger-animation h-[2px] w-3/4 bg-white"></span>
                <span className=" stagger-animation text-[4vw]">
                    เสร็จเรียบร้อย
                </span>
                <FontAwesomeIcon
                    className="stagger-animation text-[80px]"
                    icon={faCheckCircle}
                />
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
                    }}
                >
                    เข้าสุ่ระบบ
                </div>
            </div>
        </div>
    );
});


export default LoginDesktop;
