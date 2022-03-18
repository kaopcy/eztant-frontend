import React from "react";

const ArrowFatRight = ({ className , onClick}) => {
    return (
        <div
            className={` rounded-full p-2 ${className} group cursor-pointer hover:bg-gray-500`}
            onClick={()=>onClick()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="group-hover:bg-gray-500 group-hover:text-white "
            >
                <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z"
                    transform="translate(16 16) rotate(180)"
                    className="group-hover:fill-white"
                    fill="#4f4f4f"
                />
            </svg>
        </div>
    );
};

export default ArrowFatRight;
