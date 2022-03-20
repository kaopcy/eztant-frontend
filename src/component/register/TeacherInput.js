import React, { useRef, useEffect } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import GoogleRegister from "./GoogleRegister";
import {
    useHandleUserinputUpdate,
    useUserinput,
} from "../../composables/context/useUserinputContext";

const TeacherInput = (props) => {
    const { role, onClose, handleOnRegSuccess } = props;
    const userinput = useUserinput();
    const handleInput = useHandleUserinputUpdate();

    const container = useRef(null);
    useEffect(() => {
        gsap.to(container.current, {
            position: "absolute",
            y: container.current.offsetHeight,
            opacity: 0,
            duration: 0.1,
        });
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        if (role === "teacher") {
            tl.fromTo(
                container.current,
                {
                    y: container.current.offsetHeight * 1.2,
                    position: "absolute",
                    opacity: 1,
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
                    y: container.current.offsetHeight * 1.2,
                }
            );
        }
    }, [role]);

    return (
        <div ref={container} className="flex-col-cen h-full w-full">
            <GoogleRegister />
            {/* divider */}
            <div className="flex-cen mt-4 space-x-1">
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400 "></span>
                <span className="text-[13px] text-gray-500">หรือ</span>
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400"></span>
            </div>

            <div className="flex-col-cen w-full">
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <div className="input-label  ">ชื่อ</div>
                    <input
                        type="text"
                        value={userinput.firstname}
                        onChange={handleInput}
                        name={"firstname"}
                        className="input-register"
                    />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <div className="input-label  ">นามสกุล</div>
                    <input
                        type="text"
                        value={userinput.lastname}
                        onChange={handleInput}
                        name={"lastname"}
                        className="input-register"
                    />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <div className="input-label  ">อีเมล์</div>
                    <input
                        type="text"
                        value={userinput.email}
                        onChange={handleInput}
                        name={"email"}
                        className="input-register"
                    />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <div className="input-label  ">รหัสผ่าน</div>
                    <input
                        type="text"
                        value={userinput.studentID}
                        onChange={handleInput}
                        name={"studentID"}
                        className="input-register"
                    />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <div className="input-label  ">เบอร์โทรศัพท์</div>
                    <input
                        type="text"
                        value={userinput.department}
                        onChange={handleInput}
                        name={"department"}
                        className="input-register"
                    />
                </div>
                {/* btn wrapper */}
                <div className="input-group mt-4 flex items-center justify-center space-x-8">
                    <button
                        className=" group flex h-12 w-[6.5rem] items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary"
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
                        className=" flex h-12 items-center justify-center space-x-2 rounded-2xl border-4 border-secondary bg-secondary px-6 py-1"
                        onClick={() => handleOnRegSuccess()}
                    >
                        <span className="text-lg text-white">ลงทะเบียน</span>
                    </button>
                </div>
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

export default TeacherInput;
