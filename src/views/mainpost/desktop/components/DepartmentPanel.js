import React from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { DEPARTMENT_LINK } from "../../../../generalConfig";
const DepartmentPanel = ({ onChangeDepartment }) => {
    const uuidv4 = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        );
    };
    return (
        <div className="sticky top-[80px] w-[230px] bg-[#f2f2f2] text-lg text-text shadow-md">
            <div className="flex flex-col py-8 ">
                {DEPARTMENT_LINK.map((departmentLink, i) => (
                    <NavLink
                        onChangeDepartment={onChangeDepartment}
                        name={departmentLink.name}
                        to={departmentLink.to}
                        key={uuidv4()}
                        className={i === 0 ? "font-bold text-primary-dark underline" : ""}
                    />
                ))}
            </div>
        </div>
    );
};

const NavLink = ({ name, to, className, onChangeDepartment }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: true });
    const navigate = useNavigate();
    return (
        <div
            onClick={() =>
                onChangeDepartment(() => {
                    navigate(to);
                })
            }
            className={`${match && "font-bold text-primary-dark underline"}  px-7 py-2 hover:text-primary-dark cursor-pointer`}>
            {name}
        </div>
    );
};

export default DepartmentPanel;
