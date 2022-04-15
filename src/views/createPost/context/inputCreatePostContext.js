import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const InputContext = createContext();
const HandleInputContext = createContext();

const initialState = {
    subjectName: "",
    subjectID: "",
    wage: "",
    year: "",
    minGrade: "",
    duty: "",
    requirement: "",
};

export const InputProvider = ({ children }) => {
    const [input, setInput] = useState(initialState);
    
    const handleInput = useCallback((e)=>{
        const { value, name } = e.target;
        setInput(old => ({ ...old, [name]: value }));
    },[])

    return (
        <InputContext.Provider value={input}>
            <HandleInputContext.Provider value={handleInput}>{children}</HandleInputContext.Provider>
        </InputContext.Provider>
    );
};

export const useHandleInput = () => useContext(HandleInputContext)
export const useInput = () => useContext(InputContext);
