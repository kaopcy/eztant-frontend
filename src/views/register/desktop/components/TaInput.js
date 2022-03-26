import React, { forwardRef, useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import GoogleRegister from "./GoogleRegister";
import { register } from "../../../../api/authApi";
import { InputContext } from "../../contexts/InputContext";
import { useTwoComTransition } from "../../../../composables/animation/useTwoComTransition";
import SmallLoading from "../../../../component/utils/SmallLoading";

const TaInput = props => {
    const { role } = props;

    const navigate = useNavigate();
    const container = useRef(null);
    const [page, setPage] = useState(1);

    const inputFirstPageContainer = useRef(null);
    const inputSecondPageContainer = useRef(null);

    useTwoComTransition(
        {
            firstContainer: inputSecondPageContainer,
            secondContainer: inputFirstPageContainer,
        },
        page === 1
    );
    // transition on change role
    useEffect(() => {
        const tl = gsap.timeline();
        if (role === "student") {
            tl.to(container.current, {
                ease: "power4.out",
                opacity: 1,
                duration: 1.5,
                y: 0,
            });
        } else {
            tl.to(container.current, {
                opacity: 0,
                duration: 1.5,
                ease: "power1",
                y: -container.current.offsetHeight * 1.2,
            });
        }
    }, [role]);

    return (
        <div ref={container} className="flex-col-cen h-full w-full">
            <div className="flex-col-cen w-full">
                <InputFirstPage {...props} setPage={setPage} ref={inputFirstPageContainer} />
                <InputSecondPage {...props} setPage={setPage} ref={inputSecondPageContainer} />
                <div className="flex-cen mt-8 w-[80%] items-center justify-end space-x-1">
                    <span className="text-xs text-gray-400">มีบัญชีอยู่แล้ว?</span>
                    <span
                        className="cursor-pointer text-xs text-blue-800 underline "
                        onClick={async () => {
                            await navigate("/");
                            await navigate("/login", {
                                state: {
                                    backgroundLocation: {
                                        search: "",
                                        pathname: "/",
                                        hash: "",
                                        key: "1234",
                                        state: null,
                                    },
                                },
                            });
                        }}>
                        เข้าสู่ระบบ
                    </span>
                </div>
            </div>
        </div>
    );
};

const InputFirstPage = forwardRef((props, ref) => {
    const { userinput, handleInputUpdate: handleInput } = useContext(InputContext);
    const { onClose, setPage } = props;
    return (
        <div className="flex-col-cen w-full" ref={ref}>
            <GoogleRegister />
            {/* divider */}
            <div className="flex-cen mt-4 space-x-1">
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400 "></span>
                <span className="text-[13px] text-gray-500">หรือ</span>
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400"></span>
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">ชื่อ</div>
                <input type="text" value={userinput.firstname} onChange={handleInput} name={"firstname"} className="input-register" />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">นามสกุล</div>
                <input type="text" value={userinput.lastname} onChange={handleInput} name={"lastname"} className="input-register" />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">อีเมล์</div>
                <input type="text" value={userinput.email} onChange={handleInput} name={"email"} className="input-register" />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">รหัสผ่าน</div>
                <input type="text" value={userinput.password} onChange={handleInput} name={"password"} className="input-register" />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">เบอร์โทรศัพท์</div>
                <input type="text" value={userinput.phone} onChange={handleInput} name={"phone"} className="input-register" />
            </div>
            {/* btn wrapper */}
            <div className="input-group mt-4 flex items-center justify-center space-x-8">
                <button
                    className=" group flex h-12  w-[6.5rem] items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => onClose()}>
                    <FontAwesomeIcon className="text-lg text-secondary group-hover:text-white" icon={faChevronLeft} />
                    <span className="text-lg text-secondary group-hover:text-white">กลับ</span>
                </button>
                <button
                    className=" group flex h-12 w-[6.5rem]  items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => setPage(2)}>
                    <span className="text-lg text-secondary group-hover:text-white">ถัดไป</span>
                    <FontAwesomeIcon className="text-lg text-secondary group-hover:text-white" icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
});

const InputSecondPage = forwardRef((props, ref) => {
    const { userinput, handleInputUpdate: handleInput } = useContext(InputContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setPage, handleOnRegSuccess } = props;

    const handleSubmit = async e => {
        await register(userinput, setIsLoading, setError);
        e.preventDefault();
        handleOnRegSuccess();
    };
    return (
        <div className="flex-col-cen absolute w-full" ref={ref}>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">รหัสนักศึกษา</div>
                <input type="text" value={userinput.studentID} onChange={handleInput} name={"studentID"} className="input-register" />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">ภาควิชา</div>
                <input type="text" value={userinput.department} onChange={handleInput} name={"department"} className="input-register" />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">ชั้นปี</div>
                <input type="text" value={userinput.year} onChange={handleInput} name={"year"} className="input-register" />
            </div>
            {/* btn wrapper */}
            <div className="input-group mt-4 flex items-center justify-center space-x-8">
                <button
                    className=" group flex h-12 w-[6.5rem]  items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => setPage(1)}>
                    <FontAwesomeIcon className="text-lg text-secondary group-hover:text-white" icon={faChevronLeft} />
                    <span className="text-lg text-secondary group-hover:text-white">กลับ</span>
                </button>
                <SmallLoading isLoading={isLoading} gap={4}>
                    <button
                        onClick={handleSubmit}
                        className=" flex h-12 items-center justify-center space-x-2 rounded-2xl border-4 border-secondary bg-secondary px-6 py-1">
                        <SmallLoading.Title>
                            <span className="text-lg text-white">ลงทะเบียน</span>
                        </SmallLoading.Title>
                        <SmallLoading.Loader>
                            <span>ควย</span>
                        </SmallLoading.Loader>
                    </button>
                </SmallLoading>
            </div>
        </div>
    );
});

export default TaInput;
