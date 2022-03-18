import React, { useEffect, Fragment, useState } from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

import { ReactComponent as EztantLogo } from "../../assets/logos/eztant.svg";
import { useMediaQuery } from "react-responsive";

import {
    faUser,
    faBell,
    faChevronDown,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MobileDropdown from "./MobileDropdown";
import UserlistDropdown from "./UserlistDropdown";

const Navbar = ({ height }) => {
    const location = useLocation();
    const isMobile = useMediaQuery({ query: "(max-width: 648px)" });
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
            to: "register",
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
            className={`fixed z-10 flex w-full items-center justify-between  bg-white px-4 font-bold text-blue-700 shadow-sm md:px-10 `}
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
            <div className="flex h-full items-center space-x-6 md:space-x-8 lg:space-x-14">
                <EztantLogo className=" h-[40%] shrink-0 md:h-[57%]" />
                {links.map((link) => (
                    <CustomLink
                        className="shrink-0 text-xl font-semibold text-gray-600 "
                        to={link.to}
                        state={
                            link.modal ? { backgroundLocation: location } : null
                        }
                        key={link.name}
                    >
                        {link.name}
                    </CustomLink>
                ))}
            </div>
            <div className="flex h-full items-center space-x-5 md:space-x-10">
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
                <FontAwesomeIcon
                    icon={faBars}
                    className="cursor-pointer text-2xl text-gray-700 hover:text-gray-800"
                    onClick={() => toggleMobileDropdown()}
                />
                <EztantLogo className="h-[49%] shrink-0" />
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
            style={{ color: match ? "red" : "rgb(75,85,99)" }}
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
