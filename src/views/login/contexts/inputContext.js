import { createContext, useState } from "react";

export const InputContext = createContext({
    userinput: {},
    handleInputUpdate: () => {},
    handleOnBlur: () => {},
});

export const InputProvider = ({ children }) => {
    const initialInput = {
        email: "",
        password: "",
    };

    const [userinput, setuserinput] = useState(initialInput);

    const handleInputUpdate = e => {
        if (e.target.value.includes(" ")) {
            e.target.value = e.target.value.replace(/\s/g, "");
        }
        const { name, value } = e.target;
        setuserinput({ ...userinput, [name]: value });
    };

    const handleOnBlur = e => {
        alert("blur");
    };

    return <InputContext.Provider value={{ userinput, handleInputUpdate, handleOnBlur }}>{children}</InputContext.Provider>;
};
