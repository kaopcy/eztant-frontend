import React, { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { InputContext } from "../../contexts/InputContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import GoogleRegister from "./GoogleRegister";
import SmallLoading from "../../../../component/utils/SmallLoading";
import { register } from "../../../../store/actions/authAction";
import { useDispatch } from "react-redux";

const TeacherInput = props => {
    const { role, onClose, handleOnRegSuccess } = props;
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const initialValues = { firstname: "", lastname: "", email: "", password: "", phone: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const check = validate(formValues);
        setFormErrors(check);
        if (Object.keys(check).length === 0) {
            dispatch(register({...formValues , role: 'teacher'}, handleOnRegSuccess))
        }
    };

    const container = useRef(null);
    useEffect(() => {
        gsap.set(container.current, {
            position: "absolute",
            y: container.current.offsetHeight * 1.2,
            opacity: 0,
            duration: 0.1,
        });
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        if (role === "teacher") {
            tl.to(container.current, {
                opacity: 1,
                ease: "power4.out",
                duration: 1.5,
                y: 0,
            });
        } else {
            tl.to(container.current, {
                position: "absolute",
                opacity: 0,

                duration: 1.5,
                ease: "power1",
                y: container.current.offsetHeight * 1.2,
            });
        }
    }, [role]);

    const validate = values => {
        const errors = {};
        const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "{", "}", "[", "]", "?", "<", ">", ";", ":", "'", '"'];

        if (!values.firstname) {
            errors.firstname = "กรุณากรอกชื่อ";
        } else if (number.some(e => values.firstname.includes(e))) {
            errors.firstname = "ไม่สามารถใส่ตัวเลขได้";
        } else if (special.some(e => values.firstname.includes(e))) {
            errors.firstname = "ไม่สามารถใส่อักษรพิเศษได้";
        } else if (values.firstname.length > 40) {
            errors.firstname = "ชื่อต้องไม่เกิน 40 ตัว";
        }
        if (!values.lastname) {
            errors.lastname = "กรุณากรอกนามสกุล";
        } else if (number.some(e => values.lastname.includes(e))) {
            errors.lastname = "ไม่สามารถใส่ตัวเลขได้";
        } else if (special.some(e => values.lastname.includes(e))) {
            errors.lastname = "ไม่สามารถใส่อักษรพิเศษได้";
        } else if (values.lastname.length > 40) {
            errors.lastname = "นามสกุลต้องไม่เกิน 40 ตัว";
        }
        if (!values.email) {
            errors.email = "กรุณากรอกอีเมล์";
        }
        if (!values.password) {
            errors.password = "กรุณากรอกรหัสผ่าน";
        } else if (values.password.length < 8) {
            errors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัว";
        } else if (values.password.length > 25) {
            errors.password = "รหัสผ่านต้องมีไม่เกิน 25 ตัว";
        }
        if (!values.phone) {
            errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
        } else if (values.phone.length < 10 || values.phone.length > 10) {
            errors.phone = "เบอร์โทรศัพท์ต้องมี 10 ตัว";
        } else if (values.phone.match(/[A-Za-z]/i)) {
            errors.phone = "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น";
        } else if (special.some(e => values.phone.includes(e))) {
            errors.phone = "ไม่สามารถใส่อักษรพิเศษได้";
        }

        return errors;
    };

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div ref={container} className="flex-col-cen h-full w-full">
            {/* <GoogleRegister />
            <div className="flex-cen mt-4 space-x-1">
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400 "></span>
                <span className="text-[13px] text-gray-500">หรือ</span>
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400"></span>
            </div> */}
            <div className="text-xl text-text mb-6">อาจารย์</div>
            <form onSubmit={handleSubmit} className="flex-col-cen w-full">
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <p className="absolute right-[70px] top-[100px] text-xs text-red-500">{formErrors.firstname}</p>
                    <div className="input-label  ">ชื่อ</div>
                    <input type="text" onChange={handleChange} name={"firstname"} className="input-register" />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <p className="absolute right-[70px] top-[165px] text-xs text-red-500">{formErrors.lastname}</p>
                    <div className="input-label  ">นามสกุล</div>
                    <input type="text" onChange={handleChange} name={"lastname"} className="input-register" />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <p className="absolute right-[70px] top-[230px] text-xs text-red-500">{formErrors.email}</p>
                    <div className="input-label  ">อีเมล์</div>
                    <input type="email" onChange={handleChange} name={"email"} className="input-register" />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <p className="absolute right-[70px] top-[295px] text-xs text-red-500">{formErrors.password}</p>
                    <div className="input-label  ">รหัสผ่าน</div>
                    <input type="password" onChange={handleChange} name={"password"} className="input-register" />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <p className="absolute right-[70px] top-[360px] text-xs text-red-500">{formErrors.phone}</p>
                    <div className="input-label  ">เบอร์โทรศัพท์</div>
                    <input type="text" onChange={handleChange} name={"phone"} className="input-register" />
                </div>
                <div className="flex-col-cen input-group mb-2 w-[70%] items-start ">
                    <p className="absolute right-[70px] top-[360px] text-xs text-red-500">{formErrors.phone}</p>
                    <div className="input-label  ">ภาควิชา</div>
                    <input type="text" onChange={handleChange} name={"department"} className="input-register" />
                </div>
                {/* btn wrapper */}
                <div className="input-group mt-4 flex items-center justify-center space-x-8">
                    <button
                        className=" group flex h-12 w-[6.5rem] items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary"
                        onClick={() => onClose()}>
                        <FontAwesomeIcon className="text-lg text-secondary group-hover:text-white" icon={faChevronLeft} />
                        <span className="text-lg text-secondary group-hover:text-white">กลับ</span>
                    </button>
                    <SmallLoading isLoading={isLoading} gap={4}>
                        <button
                            type="submit"
                            className=" flex h-12 items-center justify-center space-x-2 rounded-2xl border-4 border-secondary bg-secondary px-6 py-1">
                            <SmallLoading.Title>
                                <span className="text-lg text-white">ลงทะเบียน</span>
                            </SmallLoading.Title>
                            <SmallLoading.Loader>{/* <span>Success</span> */}</SmallLoading.Loader>
                        </button>
                    </SmallLoading>
                </div>
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
            </form>
        </div>
    );
};

export default TeacherInput;
