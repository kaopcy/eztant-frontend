import React, { useEffect, useState } from "react";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import { useResponsive } from "../../composables/context/useResponsive";

import EztantLogo from "../../assets/logos/Eztant";

import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DEPARTMENT_LINK } from "../../generalConfig";

import MobileDropdown from "./MobileDropdown";

import UserIcon from "./UserIcon";
import UserlistDropdown from "./UserlistDropdown";

const links = [
    {
        name: "หน้าหลัก",
        to: "/",
    },
    {
        name: "โพสต์",
        to: "post-list",
        children: DEPARTMENT_LINK,
    },
    {
        name: "คอมมูนิตี้",
        mobile: true,
        to: "register",
    },
    {
        name: "เข้าสู่ระบบ",
        mobile: true,
        to: "login",
    },
];

const Navbar = ({ height }) => {
    const location = useLocation();
    const isMobile = useResponsive();
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    useEffect(() => {
        if (!isMobile) {
            setIsOpenDropdown(false);
        }
    }, [isMobile]);

    useEffect(() => {
        console.log(`isOpenDropdown: ${isOpenDropdown}`);
    }, [isOpenDropdown]);   
    
    const toggleMobileDropdown = (value)=>{
        setIsOpenDropdown(e=> value ?? !e)
    }
    const isLogin = false;
    return (
        <div
            className={`fixed z-50 flex w-full items-center justify-between  border-b-[1.5px] bg-white  font-bold text-blue-700 shadow-sm md:px-10 `}
            style={{ height: isMobile ? `${height - 20}px` : `${height}px` }}>
            {isMobile ? (
                <MobileMenu location={location} isLogin={isLogin} toggleMobileDropdown={toggleMobileDropdown} />
            ) : (
                <DesktopMenu location={location} isLogin={isLogin} />
            )}
            {isOpenDropdown && isMobile && (
                <MobileDropdown links={links} toggleMobileDropdown={toggleMobileDropdown} location={location} />
            )}
        </div>
    );
};

const DesktopMenu = props => {
    const { location, isLogin } = props;

    return (
        <>
            <div className="flex h-full items-center px-4 md:space-x-6 2md:space-x-8 lg:space-x-14">
                <Link to={"/"} className="h-[40%] shrink-0 md:h-[50%] lg:h-[57%] ">
                    <EztantLogo className="h-full" />
                </Link>
                <div className="flex h-full">
                    {links.map(
                        link =>
                            !link.mobile && (
                                <CustomLink
                                    name={link.name}
                                    to={link.to}
                                    state={link.modal ? { backgroundLocation: location } : null}
                                    key={link.name}>
                                    {link.name}
                                </CustomLink>
                            )
                    )}
                </div>
            </div>
            <div className="flex h-full items-center space-x-5 2md:space-x-8 lg:space-x-10">
                {!isLogin && <div className="rounded-md bg-secondary px-4 py-2 text-white">สร้างโพสต์</div>}
                <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-600" />
                <UserlistDropdown />
                <UserIcon height={40} />
            </div>
        </>
    );
};

const MobileMenu = props => {
    const { toggleMobileDropdown } = props;
    return (
        <>
            <div className="flex h-full  w-full items-center justify-between pr-4">
                <div className="flex-col-cen h-full cursor-pointer pl-4 pr-4 " onClick={() => toggleMobileDropdown(true)}>
                    <FontAwesomeIcon icon={faBars} className="text-2xl text-gray-700 hover:text-gray-800" />
                </div>
                <Link to={"/"} className="h-[49%] shrink-0">
                    <EztantLogo className="h-full" />
                </Link>
                <UserIcon height={35} />
            </div>
        </>
    );
};

const CustomLink = ({ name, children, to, ...props }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: name === "โพสต์" ? false : true });
    return (
        <Link
            className={`flex h-full shrink-0 items-center justify-center border-b-[3px] px-4 text-base font-semibold text-gray-600 2md:px-6 2md:text-xl lg:px-8  ${
                match ? " border-primary" : "border-transparent"
            }`}
            to={to}
            {...props}>
            {children}
        </Link>
    );
};

export default Navbar;
