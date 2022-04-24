import { useContext, createContext, useRef, useState } from "react";

const TodayContext = createContext("");
const SelectedDayContext = createContext("");
const SetSelectedDayContext = createContext(() => {});

export const AttendanceProvider = ({ children }) => {
    const today = new Date();
    const currentDay = useRef(new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`));
    const [selectedDay, setSelectedDay] = useState(new Date(currentDay.current));
    return (
        
        <TodayContext.Provider value={currentDay.current}>
            <SelectedDayContext.Provider value={selectedDay}>
                <SetSelectedDayContext.Provider value={setSelectedDay}>{children}</SetSelectedDayContext.Provider>
            </SelectedDayContext.Provider>
        </TodayContext.Provider>
    );
};

export const useToday = () => useContext(TodayContext);
export const useSelectedDay = () => useContext(SelectedDayContext);
export const useSetSelectedDay = () => useContext(SetSelectedDayContext);
