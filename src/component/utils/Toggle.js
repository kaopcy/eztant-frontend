import React, { useState } from "react";

const Toggle = ({ size }) => {
    const [isOn, setIsOn] = useState(false);
    const handleOnClick = () => {
        setIsOn((e) => !e);
    };
    return (
        <div
            className={`relative flex items-center rounded-full border ${
                isOn ? "bg-green-400" : "bg-red-500"
            } cursor-pointer shadow-sm transition-colors`}
            style={{ width: `${size * 2}px`, height: `${size}px` }}
            onClick={() => handleOnClick()}
        >
            <div
                className={`absolute flex items-center justify-center bg-transparent transition-all ease-in-out  ${
                    isOn ? "left-0" : "left-1/2"
                } `}
                style={{ width: `${size}px`, height: `${size}px` }}
            >
                <div
                    className="relative rounded-full bg-white"
                    style={{
                        width: `${size * 0.7}px`,
                        height: `${size * 0.7}px`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Toggle;
