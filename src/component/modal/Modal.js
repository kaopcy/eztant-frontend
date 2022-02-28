import React from "react";

const Modal = ({ children }) => {
    return (
        <div className="fixed top-1/2 left-1/2 flex min-h-[300px] min-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-5 rounded-md border p-4">
            <Closebtn height={"30px"} width={"30px"}/>
            <h1 className="text-3xl font-extrabold">Modal</h1>
            <p className="h-full border text-lg">{children}</p>
        </div>
    );
};

const Closebtn = ({ width, height }) => {
    return (
        <div
            className={`group absolute right-0 top-0 m-4 flex items-center justify-center cursor-pointer`}
            style={{ width, height }}
        >
            <span className="absolute h-[2px] w-full rotate-45 bg-red-500  group-hover:bg-red-700"></span>
            <span className="absolute h-[2px] w-full -rotate-45 bg-red-500 group-hover:bg-red-700 "></span>
        </div>
    );
};

export default Modal;
