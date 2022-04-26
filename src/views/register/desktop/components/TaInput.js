import React, { forwardRef, useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import GoogleRegister from "./GoogleRegister";
import { register } from "../../../../store/actions/authAction";
import { InputContext } from "../../contexts/InputContext";
import { useTwoComTransition } from "../../../../composables/animation/useTwoComTransition";
import SmallLoading from "../../../../component/utils/SmallLoading";
import { useDispatch } from "react-redux";
import { useRegister } from "../../useRegister";

const TaInput = props => {
    const { role } = props;

    const navigate = useNavigate();
    const container = useRef(null);
    const [page, setPage] = useState(1);

    const inputFirstPageContainer = useRef(null);
    const inputSecondPageContainer = useRef(null);

    const [input, setInput] = useState(null);

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
                <InputFirstPage setInput={setInput} {...props} setPage={setPage} ref={inputFirstPageContainer} />
                <InputSecondPage input={input} {...props} setPage={setPage} ref={inputSecondPageContainer} />
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

const InputField = ({ type, label, onChange, name }) => {
    const { userinput, handleInputUpdate: handleInput, handleOnBlur } = useContext(InputContext);
    return (
        <div className="flex-col-cen input-group mb-2 w-[70%] items-start">
            <div className="input-label  ">{label}</div>
            <input type={type} onBlur={handleOnBlur} onChange={onChange} name={name} className="input-register" />
        </div>
    );
};

const InputFirstPage = forwardRef((props, ref) => {
    const { onClose, setPage, setInput } = props;

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
            setInput(formValues);
            setPage(2);
        }
    };

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

    return (
        <form className="flex-col-cen relative w-full" ref={ref} onSubmit={handleSubmit}>
            {/* <GoogleRegister />
            <div className="flex-cen mt-4 space-x-1">
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400 "></span>
                <span className="text-[13px] text-gray-500">หรือ</span>
                <span className="h-[1.6px] w-24 bg-gray-200 text-gray-400"></span>
            </div> */}
            <div className="mb-10 text-xl text-text">นักศึกษา</div>
            <p className="absolute right-[16%] top-[75px] text-xs text-red-500">{formErrors.firstname}</p>
            <InputField type="text" name={"firstname"} label={"ชื่อ"} onChange={handleChange} />
            <p className="absolute right-[16%] top-[140px] text-xs text-red-500">{formErrors.lastname}</p>
            <InputField type="text" name={"lastname"} label={"นามสกุล"} onChange={handleChange} />
            <p className="absolute right-[16%] top-[205px] text-xs text-red-500">{formErrors.email}</p>
            <InputField type="email" name={"email"} label={"อีเมล์"} onChange={handleChange} />
            <p className="absolute right-[16%] top-[270px] text-xs text-red-500">{formErrors.password}</p>
            <InputField type="password" name={"password"} label={"รหัสผ่าน"} onChange={handleChange} />
            <p className="absolute right-[16%] top-[335px] text-xs text-red-500">{formErrors.phone}</p>
            <InputField type="text" name={"phone"} label={"เบอร์โทรศัพท์"} onChange={handleChange} />

            {/* btn wrapper */}
            {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
            <div className="input-group mt-4 flex items-center justify-center space-x-8">
                <button
                    className=" group flex h-12  w-[6.5rem] items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => onClose()}>
                    <FontAwesomeIcon className="text-lg text-secondary group-hover:text-white" icon={faChevronLeft} />
                    <span className="text-lg text-secondary group-hover:text-white">กลับ</span>
                </button>
                <button
                    type="submit"
                    className=" group flex h-12 w-[6.5rem]  items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white">
                    <span className="text-lg text-secondary group-hover:text-white">ถัดไป</span>
                    <FontAwesomeIcon className="text-lg text-secondary group-hover:text-white" icon={faChevronRight} />
                </button>
            </div>
        </form>
    );
});

const InputSecondPage = forwardRef((props, ref) => {
    const { setPage, handleOnRegSuccess, input } = props;

    const initialValues = { student_id: "", department: "", student_year: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const { data, isLoading, error, mutate: register } = useRegister(handleOnRegSuccess);
    const handleSubmit = e => {
        e.preventDefault();
        const check = validate(formValues);
        setFormErrors(check);
        if (Object.keys(check).length === 0) {
            register({ ...input, ...formValues, role: "student" });
        }
    };

    useEffect(() => {
        console.log(error);
    }, [error]);

    const validate = values => {
        const errors = {};
        const special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "{", "}", "[", "]", "?", "<", ">", ";", ":", "'", '"'];

        if (!values.student_id) {
            errors.student_id = "กรุณากรอกรหัส";
        } else if (values.student_id.length < 8 || values.student_id.length > 8) {
            errors.student_id = "รหัสนักศึกษาต้องมี 8 ตัว";
        } else if (values.student_id.match(/[A-Za-z]/i)) {
            errors.student_id = "รหัสต้องเป็นตัวเลขเท่านั้น";
        } else if (special.some(e => values.student_id.includes(e))) {
            errors.student_id = "ไม่สามารถใส่อักษรพิเศษได้";
        }
        if (!values.department) {
            errors.department = "กรุณากรอกภาควิชา";
        } else if (special.some(e => values.department.includes(e))) {
            errors.department = "ไม่สามารถใส่อักษรพิเศษได้";
        } else if (values.department.length > 30) {
            errors.department = "ภาควิชาควรไม่เกิน 30 ตัว";
        }
        if (!values.student_year) {
            errors.student_year = "กรุณากรอกชั้นปี";
        } else if (values.student_year.length < 1 || values.student_year.length > 1) {
            errors.student_year = "ชั้นปีไม่ถูกต้อง";
        } else if (values.student_year.match(/[A-Za-z]/i)) {
            errors.student_year = "ชั้นปีต้องเป็นตัวเลขเท่านั้น";
        } else if (special.some(e => values.student_year.includes(e))) {
            errors.student_year = "ไม่สามารถใส่อักษรพิเศษได้";
        }

        return errors;
    };
    return (
        <form className="flex-col-cen absolute w-full" ref={ref} onSubmit={handleSubmit}>
            <p className="absolute right-[16%] top-[5px] text-xs text-red-500">{formErrors.student_id}</p>
            <InputField type="text" name={"student_id"} label={"รหัสนักศึกษา"} onChange={handleChange} />
            <p className="absolute right-[16%] top-[70px] text-xs text-red-500">{formErrors.department}</p>
            <InputField type="text" name={"department"} label={"ภาควิชา"} onChange={handleChange} />
            <p className="absolute right-[16%] top-[135px] text-xs text-red-500">{formErrors.student_year}</p>
            <InputField type="text" name={"student_year"} label={"ชั้นปี"} onChange={handleChange} />
            {/* btn wrapper */}
            <div className="input-group mt-4 flex items-center justify-center space-x-8">
                <button
                    type="button"
                    className=" group flex h-12 w-[6.5rem]  items-center justify-center space-x-2 rounded-2xl border-4 border-secondary px-2 py-1 hover:bg-secondary hover:text-white"
                    onClick={() => setPage(1)}>
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
                        <SmallLoading.Loader>
                            <span>Success</span>
                        </SmallLoading.Loader>
                    </button>
                </SmallLoading>
            </div>
        </form>
    );
});

export default TaInput;
