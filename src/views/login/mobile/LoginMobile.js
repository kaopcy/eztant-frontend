import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import gsap, { Back } from "gsap";

import { InputContext, InputProvider } from "../contexts/inputContext";
import { login as AuthLogin } from "../../../store/actions/authAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ArrowFatRight from "../../../component/utils/ArrowFatRight";
import GoogleRegister from "../../register/desktop/components/GoogleRegister";
import SmallLoading from "../../../component/utils/SmallLoading";

const LoginMobile = props => {
    const navigate = useNavigate();

    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    return (
        <InputProvider>
            <div className="flex w-full flex-col items-center space-y-8 bg-white px-8 pb-24 text-text">
                <ArrowFatRight className="mt-4 self-start" onClick={() => navigate(-1)} />
                <GoogleRegister />
                <span className="text-lg font-bold text-secondary">เข้าสู่ระบบ</span>
                <InputField {...props} />
                {isLoginSuccess && <LoginFinishedOverlay onClose={() => setIsLoginSuccess(false)} />}
            </div>
            <LoginButton setIsLoginSuccess={setIsLoginSuccess} />
        </InputProvider>
    );
};

const LoginButton = ({ setIsLoginSuccess }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.user);
    const { userinput } = useContext(InputContext);
    const handleLoginSuccess = () => {
        setIsLoginSuccess(true);
    };
    const login = () => {
        if (isLoading) return;
        dispatch(AuthLogin(userinput, handleLoginSuccess));
    };
    return (
        <SmallLoading isLoading={isLoading} gap={4}>
            <div className="btn-orange flex-col-cen fixed bottom-0 h-16 w-full text-xl font-bold xs:text-2xl" onClick={() => login()}>
                <SmallLoading.Title>
                    <span>เข้าสุ่ระบบ</span>
                </SmallLoading.Title>
                <SmallLoading.Loader>
                    <span>ควย</span>
                </SmallLoading.Loader>
            </div>
        </SmallLoading>
    );
};

const Input = props => {
    const { type, label } = props;
    const { userinput, handleInputUpdate: handleInput } = useContext(InputContext);
    return (
        <div className="flex-col-cen mb-2 w-full">
            <div className="self-start ">{label}</div>
            <input type="text" value={userinput[type]} onChange={e => handleInput(e)} name={type} className="input-register w-full text-xl" />
        </div>
    );
};

const InputField = props => {
    const navigate = useNavigate();
    return (
        <div className="flex w-[95%] flex-col items-center pt-4 xs:w-[85%] ">
            <Input {...props} type="email" label="อีเมล์" />
            <Input {...props} type="password" label="รหัสผ่าน" />
            <div className="cursor-pointer self-end text-sm text-primary underline hover:text-red-600">ลืมรหัสผ่าน?</div>
            <div className="mt-8 flex space-x-2 self-center">
                <div className="text-sm text-text">ยังไม่มีบัญชี ?</div>
                <div
                    className="cursor-pointer text-sm text-primary underline hover:text-red-600"
                    onClick={async () => {
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
                    }}>
                    สมัครบัญชีใหม่
                </div>
            </div>
        </div>
    );
};

const LoginFinishedOverlay = ({ onClose }) => {
    const finishedOverlay = useRef(null);
    const container = useRef(null);
    const navigate = useNavigate();
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
                    <span className=" stagger-animation text-3xl ">เข้าสุ่ระบบ</span>
                    <span className=" stagger-animation h-[3px] w-3/5 bg-white"></span>
                    <span className=" stagger-animation text-[8vw]">เสร็จเรียบร้อย</span>
                    <FontAwesomeIcon className="stagger-animation text-[80px]" icon={faCheckCircle} />
                    <div
                        className="stagger-animation flex-cen w-2/3 cursor-pointer rounded-full border-4 border-white bg-white py-4 text-xl text-primary hover:border-white hover:bg-primary hover:text-white"
                        onClick={() => navigate("/")}>
                        <button className="font-bold">เข้าสู่หน้าหลัก</button>
                    </div>
                </div>
                <div className="triangle-clip absolute bottom-0 left-0 h-[20%] max-h-[100px] w-full bg-white"></div>
            </div>
        </>
    );
};

export default LoginMobile;
