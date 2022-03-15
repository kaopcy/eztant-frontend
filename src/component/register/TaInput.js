import React, { useEffect, useRef, useState } from "react";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";

import { ReactComponent as GoogleSVG } from '../../assets/logos/google.svg'

const TaInput = (props) => {
    const { role } = props;
    const container = useRef(null);
    const [page, setPage] = useState(1);

    // transition on change role
    useEffect(() => {
        const tl = gsap.timeline();
        if (role === "student") {
            tl.fromTo(
                container.current,
                {
                    y: -container.current.offsetHeight * 1.2,
                    position: "absolute",
                },
                {
                    ease: "power4.out",
                    duration: 1.5,
                    y: 0,
                }
            );
        } else {
            tl.fromTo(
                container.current,
                {
                    y: "0",
                    position: "absolute",
                },
                {
                    duration: 1.5,
                    ease: "power1",
                    y: -container.current.offsetHeight * 1.2,
                }
            );
        }
    }, [role]);

    return (
        <div ref={container} className="flex-col-cen h-full w-full">
            <div className="flex-col-cen w-full">
                {page === 1 ? (
                    <InputFirstPage {...props} setPage={setPage} />
                ) : (
                    <InputSecondPage {...props} setPage={setPage} />
                )}
                <div className="flex-cen mt-8 w-[80%] items-center justify-end space-x-1">
                    <span className="text-xs text-gray-400">
                        มีบัญชีอยู่แล้ว?
                    </span>
                    <span className="cursor-pointer text-xs text-blue-800 underline ">
                        เข้าสู่ระบบ
                    </span>
                </div>
            </div>
        </div>
    );
};

const InputFirstPage = (props) => {
    const { userinput, handleInput, onClose, setPage } = props;
    return (
        <>
            <GoogleLoginButton />
            {/* divider */}
            <div className="flex-cen mt-4 space-x-1">
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400 "></span>
                <span className="text-[13px] text-gray-500">หรือ</span>
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400"></span>
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">ชื่อ</div>
                <input
                    type="text"
                    value={userinput.firstname}
                    onChange={handleInput}
                    name={"firstname"}
                    className="input-register"
                />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">นามสกุล</div>
                <input
                    type="text"
                    value={userinput.lastname}
                    onChange={handleInput}
                    name={"lastname"}
                    className="input-register"
                />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">อีเมล์</div>
                <input
                    type="text"
                    value={userinput.email}
                    onChange={handleInput}
                    name={"email"}
                    className="input-register"
                />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">รหัสผ่าน</div>
                <input
                    type="text"
                    value={userinput.password}
                    onChange={handleInput}
                    name={"password"}
                    className="input-register"
                />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">เบอร์โทรศัพท์</div>
                <input
                    type="text"
                    value={userinput.phone}
                    onChange={handleInput}
                    name={"phone"}
                    className="input-register"
                />
            </div>
            {/* btn wrapper */}
            <div className="input-group mt-4 flex items-center justify-center space-x-8">
                <button
                    className=" flex h-12 w-[6.5rem]  group items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => onClose()}
                >
                    <FontAwesomeIcon
                        className="text-lg text-secondary group-hover:text-white"
                        icon={faChevronLeft}
                    />
                    <span className="text-lg text-secondary group-hover:text-white">กลับ</span>
                </button>
                <button
                    className=" flex h-12 w-[6.5rem] group  items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => setPage(2)}
                >
                    <span className="text-lg text-secondary group-hover:text-white">ถัดไป</span>
                    <FontAwesomeIcon
                        className="text-lg text-secondary group-hover:text-white"
                        icon={faChevronRight}
                    />
                </button>
            </div>
        </>
    );
};

const InputSecondPage = (props) => {
    const { userinput, handleInput, setPage, handleOnRegSuccess } = props;
    return (
        <>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">รหัสนักศึกษา</div>
                <input
                    type="text"
                    value={userinput.studentID}
                    onChange={handleInput}
                    name={"studentID"}
                    className="input-register"
                />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">ภาควิชา</div>
                <input
                    type="text"
                    value={userinput.department}
                    onChange={handleInput}
                    name={"department"}
                    className="input-register"
                />
            </div>
            <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
                <div className="input-label  ">ชั้นปี</div>
                <input
                    type="text"
                    value={userinput.year}
                    onChange={handleInput}
                    name={"year"}
                    className="input-register"
                />
            </div>
            {/* btn wrapper */}
            <div className="input-group mt-4 flex items-center justify-center space-x-8">
                <button
                    className=" flex h-12 w-[6.5rem] group  items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => setPage(1)}
                >
                    <FontAwesomeIcon
                        className="text-lg text-secondary group-hover:text-white"
                        icon={faChevronLeft}
                    />
                    <span className="text-lg text-secondary group-hover:text-white">กลับ</span>
                </button>
                <button
                    className=" flex h-12 items-center justify-center space-x-2 rounded-2xl border-4 border-secondary bg-secondary px-6 py-1"
                    onClick={() => handleOnRegSuccess()}
                >
                    <span className="text-lg text-white">ลงทะเบียน</span>
                </button>
            </div>
        </>
    );
};

const GoogleLoginButton = () => {
    return (
        <div className="flex items-center justify-center space-x-2 rounded-full border p-2 text-sm text-gray-600">
            <div className="h-[20px] w-[20px] rounded-full bg-transparent">
                <GoogleSVG />
            </div>
            <div>ลงทะเบียนด้วยบัญชี Google</div>
        </div>
    );
};

export default TaInput;
