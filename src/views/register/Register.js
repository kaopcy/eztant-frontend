import React, { Fragment, forwardRef, useRef, useEffect } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
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
                        {(ref) => <MainBody ref={ref} />}
                    </Transition.Child>
                </>
            </Dialog>
        </Transition>
    );
};

const MainBody = forwardRef((_, ref) => {
    const [curRole, setCurRole] = useState("student");
    const changeRole = (role) => {
        setCurRole(role);
    };

    useEffect(() => {
        console.log(curRole);
    }, [curRole]);

    return (
        <div
            ref={ref}
            className="relative flex h-[400px] w-[80%] max-w-[1000px] transform bg-white shadow-md transition-all"
        >
            <RoleSelecter changeRole={changeRole} role={curRole} />
            <SecondaryBody />
            <InputBody />
        </div>
    );
});

const RoleSelecter = ({ changeRole, role }) => {
    return (
        <div className="relative flex h-full w-[70px] shrink-0 flex-col items-center justify-between">
            {/* icon */}
            <div className="h-[40px] w-full bg-blue-50"></div>
            {/* role */}
            <div className="absolute bottom-[20px] flex h-full w-full flex-col items-center justify-end overflow-hidden">
                <div
                    className="vertical-text flex-col-cen h-1/3 w-full cursor-pointer text-2xl text-gray-800 hover:bg-slate-100"
                    onClick={() => changeRole("student")}
                >
                    อาจารย์
                </div>
                <div
                    className="vertical-text flex-col-cen h-1/3 w-full cursor-pointer text-2xl text-gray-800 hover:bg-slate-100"
                    onClick={() => changeRole("teacher")}
                >
                    นักศึกษา
                </div>
                {/* hider */}
                <div
                    className="duration-400 absolute bottom-0 left-0 h-1/3 w-[7px] bg-[#14279b] transition-transform"
                    style={{
                        transform:
                            role === "student"
                                ? "translateY(-100%)"
                                : "translateY(0)",
                    }}
                ></div>
            </div>
        </div>
    );
};

const SecondaryBody = () => {
    return (
        <div className="flex h-[120%] w-full flex-col items-center space-y-2 self-center bg-[#465ffb] text-lg font-bold text-white">
            <span className="mt-4 text-3xl font-medium text-white">
                ลงทะเบียน
            </span>
            <span className="h-[1.5px] w-[65%] bg-white "></span>
            <span className="text-sm font-normal text-white">
                ยินดีต้อนรับเข้าสู่ระบบของ Eztant
            </span>
        </div>
    );
};

const InputBody = () => {
    const [userinput, setUserinput] = useState({
        firstname: "",
        lastname: "",
        studentID: "",
        email: "",
        department: "",
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserinput({
            ...userinput,
            [name]: value,
        });
    };

    return (
        <div className="w-[900px] flex flex-col items-center justify-center">
            <GoogleLoginButton />
            <form className="flex-container">
                <div className="flex-container w-[80%] items-start">
                    <div className="input-label  ">ชื่อ</div>
                    <input
                        type="text"
                        value={userinput.firstname}
                        onChange={handleInput}
                        name={"firstname"}
                        className="input-register w-[100%]"
                    />
                </div>
                <div className="flex-container w-[80%] items-start">
                    <div className="input-label  ">ชื่อ</div>
                    <input
                        type="text"
                        value={userinput.lastname}
                        onChange={handleInput}
                        name={"lastname"}
                        className="input-register"
                    />
                </div>
                <div className="flex-container w-[80%] items-start">
                    <div className="input-label  ">ชื่อ</div>
                    <input
                        type="text"
                        value={userinput.email}
                        onChange={handleInput}
                        name={"email"}
                        className="input-register"
                    />
                </div>
                <div className="flex-container w-[80%] items-start">
                    <div className="input-label  ">ชื่อ</div>
                    <input
                        type="text"
                        value={userinput.studentID}
                        onChange={handleInput}
                        name={"studentID"}
                        className="input-register"
                    />
                </div>
                <div className="flex-container w-[80%] items-start">
                    <div className="input-label  ">ชื่อ</div>
                    <input
                        type="text"
                        value={userinput.department}
                        onChange={handleInput}
                        name={"department"}
                        className="input-register"
                    />
                </div>
            </form>
        </div>
    );
};

const GoogleLoginButton = () => {
    return (
        <div className="flex items-center justify-center space-x-2 rounded-full border p-2 text-sm text-gray-600">
            <div className="h-[20px] w-[20px] rounded-full bg-orange-300"></div>
            <div>ลงทะเบียนด้วยบัญชี Google</div>
        </div>
    );
};

export default Register;
