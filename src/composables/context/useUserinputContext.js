import React, { createContext, useContext, useState } from "react";

const UserInputContext = createContext();
const UserInputUpdateContext = createContext();

export const useUserinput = () => {
    return useContext(UserInputContext);
};
export const useHandleUserinputUpdate = () => {
    return useContext(UserInputUpdateContext);
};

export function UserinputProvider({ children, mode }) {
    const [userInput, setUserInput] = useState(
        mode === "register"
            ? {
                  firstname: "",
                  lastname: "",
                  studentID: "",
                  password: "",
                  phone: "",
                  email: "",
                  department: "",
                  year: "",
              }
            : {
                  username: "",
                  password: "",
              }
    );

    const handleInput = (e) => {
        const { value, name } = e.target;
        console.log('kuay');
        setUserInput({ ...userInput, [name]: value });
    };

    return (
        <UserInputContext.Provider value={userInput}>
            <UserInputUpdateContext.Provider value={handleInput}>
                {children}
            </UserInputUpdateContext.Provider>
        </UserInputContext.Provider>
    );
}
