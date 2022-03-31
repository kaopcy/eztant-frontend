import { createContext, useState } from "react";
import * as api from "../../../api/authApi";

export const InputContext = createContext({
    userinput: {},
    handleInputUpdate: () => {},
    handleOnBlur: () => {},
});

export const InputProvider = ({ children }) => {
    const initialInput = {
        firstname: "",
        lastname: "",
        studentID: "",
        password: "",
        phone: "",
        email: "",
        department: "",
        year: "",
    };

    const [userinput, setuserinput] = useState(initialInput);

    const handleInputUpdate = e => {
        const { name, value } = e.target;
        setuserinput({ ...userinput, [name]: value });
    };

    const handleOnBlur = async e => {
        const { value } = e.target;
        if (!value || value.length < 0) {
            const res = await api.checkDuplicateEmail("kao");
            console.log(res);
        }
    };

    return <InputContext.Provider value={{ userinput, handleInputUpdate, handleOnBlur }}>{children}</InputContext.Provider>;
};
