import React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import DesktopRegister from "../../component/register/DesktopRegister";
import MobileRegister from "../../component/register/MobileRegister";

const Register = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 648px)" });
    const [userinput, setUserinput] = useState({
        firstname: "",
        lastname: "",
        studentID: "",
        password: "",
        phone: "",
        email: "",
        department: "",
        year: "",
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        console.log(`name: ${name}v value: ${value}`);
        setUserinput({
            ...userinput,
            [name]: value,
        });
    };
    return !isMobile ? (
        <DesktopRegister userinput={userinput} handleInput={handleInput} />
    ) : (
        <MobileRegister handleInput={handleInput} userinput={userinput} />
    );
};


export default Register;

