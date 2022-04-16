import React, { useEffect, useRef, useState } from "react";
import DatePickerPopup from "./DatePickerPopup";

const DatePicker = () => {
    const [isOpen, setIsopen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const inputRef = useRef(null);
    const datePickerPopupRef = useRef(null);

    useEffect(() => {
        console.log(new Date(2022, 3, 16).getTime());
    }, []);

    useEffect(() => {
        const onClick = e => {
            if (!isOpen) return;
            if (!inputRef.current.contains(e.target) && !datePickerPopupRef.current.contains(e.target)) {
                setIsopen(false);
            }
        };
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("click", onClick);
        };
    }, [isOpen]);

    return (
        <div className="relative w-[200px]">
            <input ref={inputRef} type="date" className="w-full rounded-md border px-2 py-1 shadow-md" onClick={() => setIsopen(true)} />
            {isOpen && <DatePickerPopup selectedDate={selectedDate} setSelectedDate={setSelectedDate} ref={datePickerPopupRef} />}
        </div>
    );
};

export default DatePicker;
