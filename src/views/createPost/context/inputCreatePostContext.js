import React, { createContext, useContext, useState } from "react";

const InputContext = createContext();
const SetInputContext = createContext();

export const InputProvider = ({ children }) => {
    const [input, setInput] = useState(null);
    return (
        <InputContext.Provider value={input}>
            <SetInputContext.Provider value={setInput}>{children}</SetInputContext.Provider>
        </InputContext.Provider>
    );
};

export const useSetInput = () => useContext(SetInputContext);
export const useInput = () => useContext(InputContext);
