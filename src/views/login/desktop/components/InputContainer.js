import React, { forwardRef, useContext, useRef,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import GoogleRegister from "../../../register/desktop/components/GoogleRegister";

// Context
import { InputContext } from "../../contexts/inputContext";
import SmallLoading from "../../../../component/utils/SmallLoading";
import { login as AuthLogin } from "../../../../store/actions/authAction";

const InputContainer = forwardRef((props, ref) => {
    const { onClose, finishedAnimation } = props;
    const navigate = useNavigate();
    const { isLoading } = useSelector(state => state.user);
    const { userinput } = useContext(InputContext);
    const initialValues = {email : "", password: ""}
    const [formValues, setFormValues]= useState(initialValues);
    const [formErrors, setFormErrors]= useState({});

    const loadingRef = useRef(null);
    const loadingTextRef = useRef(null);

    const login = () => {
        if (isLoading) return;
        dispatch(AuthLogin(userinput, finishedAnimation));
    };

    const handleChange = (e) => {
        const { name, value}= e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(name)
    };

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(formValues)
        const check = validate(formValues)
        setFormErrors(check);
        console.log(check)
        if(Object.keys(check).length === 0 ){
            login();
        }
    };

    useEffect(() => {
        // console.log(formErrors);
        if(Object.keys(formErrors).length === 0){
            console.log(formValues);
        }
    }, [formErrors,formValues]);

    const validate = (values) => {
        const errors = {}

        if (!values.email){
            errors.email = "กรุณากรอกอีเมล์"
        }
        if (!values.password){
            errors.password = "กรุณากรอกรหัสผ่าน"
        }
        return errors
    }

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

            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <div className="flex-col-cen input-group mb-2 w-[95%] max-w-[380px] items-start xs:w-[85%]">
                    <p className="text-xs text-red-500 absolute right-[115px] top-[225px]">{formErrors.email}</p>
                    <Input onChange={handleChange} type="email" name={"email"} label="อีเมล์" />
                    <p className="text-xs text-red-500 absolute right-[115px] top-[285px]">{formErrors.password}</p>
                    <Input onChange={handleChange} type="password" name={"password"} label="รหัสผ่าน" />
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
                                    className="btn-orange flex-cen group h-12 w-full  space-x-3 rounded-2xl border-4 px-6 py-1"> 

                                    <SmallLoading.Title>
                                        <div>เข้าสุ่ระบบ</div>
                                    </SmallLoading.Title>
                                    <SmallLoading.Loader>Success</SmallLoading.Loader>
                                </button>
                            </SmallLoading>
                        </div>
                    </div>
                </div>
            </form>
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

const Input = ({type, label, onChange, name}) => {
    const { userinput, handleInputUpdate: handleInput } = useContext(InputContext);
    return (
        <>
            <div className="input-label  ">{label}</div>
            <input type={type} onChange={onChange} name={name} className="input-register py-1 text-xl" />
        </>
    );
};

export default InputContainer;
