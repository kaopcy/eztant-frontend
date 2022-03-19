import React, { useEffect, useState } from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

import { ReactComponent as EztantLogo } from "../../assets/logos/eztant.svg";
import { useMediaQuery } from "react-responsive";

import {
    faBell,
    faChevronDown,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MobileDropdown from "./MobileDropdown";
import UserlistDropdown from "./UserlistDropdown";

const Navbar = ({ height }) => {
    const location = useLocation();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    useEffect(() => {
        if (!isMobile) {
            setIsOpenDropdown(false);
        }
    }, [isMobile]);

    useEffect(() => {
        console.log(`isOpenDropdown: ${isOpenDropdown}`);
    }, [isOpenDropdown]);

    const links = [
        {
            name: "หน้าหลัก",
            to: "/",
        },
        {
            name: "โพสต์",
            to: "post",
            modal: true,
            children: [
                {
                    name: "รวมทุกภาควิชา",
                    to: "/elec",
                },
                {
                    name: "การเกษตร",
                    to: "/elec",
                },
                {
                    name: "คอมพิวเตอร์",
                    to: "/elec",
                },
                {
                    name: "เคมี",
                    to: "/elec",
                },
                {
                    name: "เครื่องกล",
                    to: "/elec",
                },
                {
                    name: "ชีวการแพทย์",
                    to: "/elec",
                },
                {
                    name: "ดนตรี",
                    to: "/elec",
                },
                {
                    name: "โทรคมนาคม",
                    to: "/elec",
                },
                {
                    name: "ไฟฟ้า",
                    to: "/elec",
                },
                {
                    name: "โยธา",
                    to: "/elec",
                },
                {
                    name: "อาหาร",
                    to: "/elec",
                },
                {
                    name: "อิเล็กโทรนิคส์",
                    to: "/elec",
                },
            ],
        },
        {
            name: "คอมมูนิตี้",
            to: "register",
            modal: true,
        },
    ];
    const isLogin = false;
    return (
        <div
            className={`fixed z-10 flex w-full items-center justify-between  border-b-[1.5px] bg-white px-4 font-bold text-blue-700 shadow-sm md:px-10 `}
            style={{ height: isMobile ? `${height - 20}px` : `${height}px` }}
        >
            {isMobile ? (
                <MobileMenu
                    location={location}
                    isLogin={isLogin}
                    toggleMobileDropdown={() => setIsOpenDropdown((e) => !e)}
                />
            ) : (
                <DesktopMenu
                    links={links}
                    location={location}
                    isLogin={isLogin}
                />
            )}
            {isOpenDropdown && isMobile && (
                <MobileDropdown
                    toggleMobileDropdown={() => setIsOpenDropdown((e) => !e)}
                    location={location}
                    links={links}
                />
            )}
        </div>
    );
};

const DesktopMenu = (props) => {
    const { links, location, isLogin } = props;

    return (
        <>
            <div className="flex h-full items-center md:space-x-6 2md:space-x-8 lg:space-x-14">
                <Link
                    to={"/"}
                    className="h-[40%] shrink-0 md:h-[50%] lg:h-[57%] "
                >
                    <EztantLogo className="h-full" />
                </Link>
                <div className="flex h-full">
                    {links.map((link) => (
                        <CustomLink
                            to={link.to}
                            state={
                                link.modal
                                    ? { backgroundLocation: location }
                                    : null
                            }
                            key={link.name}
                        >
                            {link.name}
                        </CustomLink>
                    ))}
                </div>
            </div>
            <div className="flex h-full items-center space-x-5 2md:space-x-8 lg:space-x-10">
                {!isLogin && (
                    <div className="rounded-md bg-secondary px-4 py-2 text-white">
                        สร้างโพสต์
                    </div>
                )}
                <UserlistDropdown />
                <FontAwesomeIcon
                    icon={faBell}
                    className="text-2xl text-gray-600"
                />
                <UserIcon />
            </div>
        </>
    );
};

const MobileMenu = (props) => {
    const { toggleMobileDropdown } = props;
    return (
        <>
            <div className="flex h-full w-full items-center justify-between">
                <div
                    className="flex h-full w-10 cursor-pointer items-center justify-start"
                    onClick={() => toggleMobileDropdown()}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className="text-2xl text-gray-700 hover:text-gray-800"
                    />
                </div>
                <Link to={"/"} className="h-[49%] shrink-0">
                    <EztantLogo className="h-full" />
                </Link>
                <UserIcon height={35} />
            </div>
        </>
    );
};

const CustomLink = ({ children, to, ...props }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: true });
    return (
        <Link
            className={`flex h-full shrink-0 items-center justify-center border-b-[3px] px-4 text-base font-semibold text-gray-600 2md:px-6 2md:text-xl lg:px-8  ${
                match ? " border-primary" : "border-transparent"
            }`}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
};

const UserIcon = ({ height = 40 }) => {
    return (
        <div className="flex items-center space-x-1">
            <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="dwad"
                className="h-10 w-10 rounded-full bg-black object-cover shadow-sm"
                style={{ height: `${height}px`, width: `${height}px` }}
            ></img>
            <FontAwesomeIcon
                icon={faChevronDown}
                className="text-base text-gray-600"
            />
        </div>
    );
};

export default Navbar;
