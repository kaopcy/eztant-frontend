import React, { forwardRef, useContext, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import GoogleRegister from "../../../register/desktop/components/GoogleRegister";

// Context
import { InputContext } from "../../contexts/inputContext";
import SmallLoading from "../../../../component/utils/SmallLoading";
import { useNonInitialEffect } from "../../../../composables/useNonInitialEffect";
import { login as AuthLogin } from "../../../../store/actions/authAction";

const InputContainer = forwardRef((props, ref) => {
    const { onClose, finishedAnimation } = props;
    const navigate = useNavigate();
    const { isLoading } = useSelector(state => state.user);
    const { userinput } = useContext(InputContext);

    const loadingRef = useRef(null);
    const loadingTextRef = useRef(null);

    const login = () => {
        if (isLoading) return;
        dispatch(AuthLogin(userinput, finishedAnimation));
    };

    const dispatch = useDispatch();

    return (
        <div className="flex-col-cen h-full w-[60%] shrink-0 space-y-6 rounded-l-3xl bg-white shadow-md" ref={ref}>
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
                    <div className="mt-2 mb-6 self-end text-xs text-primary underline ">ลืมรหัสผ่าน</div>
                    <div className="input-group mt-4 flex w-full items-center justify-center space-x-8">
                        <button
                            className=" group flex h-12 w-[11rem] items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary"
                            onClick={() => onClose()}>
                            <FontAwesomeIcon className="text-lg text-secondary group-hover:text-white" icon={faChevronLeft} />
                            <span className="text-lg text-secondary group-hover:text-white">กลับ</span>
                        </button>
                        <div className="w-full">
                            <SmallLoading isLoading={isLoading} gap={4}>
                                <button
                                    className="btn-orange flex-cen group h-12 w-full  space-x-3 rounded-2xl border-4 px-6 py-1"
                                    onClick={() => login()}>
                                    <SmallLoading.Title>
                                        <div>เข้าสุ่ระบบ</div>
                                    </SmallLoading.Title>
                                    <SmallLoading.Loader>ควย</SmallLoading.Loader>
                                </button>
                            </SmallLoading>
                        </div>
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
                    }}>
                    สมัครบัญชีใหม่
                </span>
            </div>
        </div>
    );
});

const Input = props => {
    const { type, label } = props;
    const { userinput, handleInputUpdate: handleInput } = useContext(InputContext);
    return (
        <>
            <div className="input-label  ">{label}</div>
            <input type="text" value={userinput[type]} onChange={handleInput} name={type} className="input-register py-1 text-xl" />
        </>
    );
};

export default InputContainer;
