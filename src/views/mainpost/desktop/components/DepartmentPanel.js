import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { DEPARTMENT_LINK } from "../../../../generalConfig";
const LeftSideBar = () => {
    const uuidv4 =()=> {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        );
    }

    return (
        <div className="w-[230px] bg-[#f5f5f5] text-lg text-text shadow-md sticky top-[80px]">
            <div className="flex flex-col py-8 ">
                {DEPARTMENT_LINK.map((departmentLink, i) => 
                    <NavLink name={departmentLink.name} to={departmentLink.to} key={uuidv4()} className={i === 0 ? "underline text-primary-dark font-bold" : "" }/>
                )}
            </div>
        </div>
    );
};

const NavLink = ({ name, to, className }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path});
    console.log(path);
    return (
        <Link  className={`${match && "underline text-primary-dark font-bold"}  px-7 py-2 hover:text-primary-dark`} to={to}>
            {name} 
        </Link>
    );
};

export default LeftSideBar;
