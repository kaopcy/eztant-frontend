import React from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

import { ReactComponent as EztantLogo } from "../../assets/logos/eztant.svg";
import {
    faUser,
    faBell,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
    const location = useLocation();
    const links = [
        {
            name: "หน้าหลัก",
            to: "/",
        },
        {
            name: "โพสต์",
            to: "register",
            modal: true,
        },
        {
            name: "คอมมูนิตี้",
            to: "register",
            modal: true,
        },
    ];
    const isLogin = false;
    return (
        <div className="relative flex h-[80px] w-full items-center justify-between  bg-white px-10 font-bold text-blue-700 shadow-sm">
            <div className="flex h-full items-center space-x-14">
                <EztantLogo className="h-[57%] shrink-0" />
                {links.map((link) => (
                    <CustomLink
                        className="shrink-0 text-xl font-semibold text-gray-600 "
                        to={link.to}
                        state={
                            link.modal ? { backgroundLocation: location } : null
                        }
                    >
                        {link.name}
                    </CustomLink>
                ))}
            </div>
            <div className="flex h-full items-center space-x-5">
                {!isLogin && (
                    <div className="rounded-md bg-secondary px-4 py-2 text-white">
                        สร้างโพสต์
                    </div>
                )}
                <FontAwesomeIcon
                    icon={faUser}
                    className="text-2xl text-gray-600"
                />
                <FontAwesomeIcon
                    icon={faBell}
                    className="text-2xl text-gray-600"
                />
                <div className="flex items-center space-x-1">
                    <img
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        alt="dwad"
                        className="h-10 w-10 rounded-full bg-black object-cover shadow-sm"
                    ></img>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-lgxl text-gray-600"
                    />
                </div>
            </div>
        </div>
    );
};

const CustomLink = ({ children, to, ...props }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: true });

    return (
        <Link
            style={{ color: match ? "red" : "rgb(75,85,99)" }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

export default Navbar;
