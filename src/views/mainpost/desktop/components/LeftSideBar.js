import React from "react";
import { Link } from "react-router-dom";
import { DEPARTMENT_LINK } from "../../../../generalConfig";
const LeftSideBar = () => {
    const link = ({ name, to, className }) => {
        function uuidv4() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
            );
        }
        return (
            <Link key={uuidv4()} className={`${className}  px-7 py-2 hover:text-primary-dark`} to={to}>
                {name}
            </Link>
        );
    };

    return (
        <div className="w-[230px] bg-[#f5f5f5] text-lg text-text shadow-md ">
            <div className="flex flex-col py-8 ">
                {DEPARTMENT_LINK.map((departmentLink, i) =>
                    link({ name: departmentLink.name, to: departmentLink.to, className: i === 0 ? "underline text-primary-dark font-bold" : "" })
                )}
            </div>
        </div>
    );
};

export default LeftSideBar;
