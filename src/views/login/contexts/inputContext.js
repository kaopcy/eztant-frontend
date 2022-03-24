import { createContext, useState } from "react";

export const InputContext = createContext({});

export const InputProvider = ({ children }) => {
    const initialInput = {
        email: "",
        password: "",
    };

    const [userinput, setuserinput] = useState(initialInput);

    const handleInputUpdate = e => {
        const { name, value } = e.target;
        setuserinput({ ...userinput, [name]: value });
    };

    return <InputContext.Provider value={{ userinput, handleInputUpdate }}>{children}</InputContext.Provider>;
};
