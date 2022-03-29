import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUser, faCircleUser, faUserPlus, faArrowRightFromBracket, faUserPen } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../store/actions/authAction";

const UserIcon = ({ height }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const location = useLocation();

    const loggedLink = [
        {
            icon: faCircleUser,
            name: "โปรไฟล์",
            to: "/",
            onclick: () => {},
        },
        {
            icon: faUserPlus,
            name: "คำขอทั้งหมด",
            to: "/",
            onclick: () => {},
        },
        {
            icon: faArrowRightFromBracket,
            name: "ออกจากระบบ",
            to: "/",
            onclick: () => {
                dispatch(logout());
            },
        },
    ];

    const unlogLink = [
        {
            icon: faArrowRightFromBracket,
            name: "เข้าสู่ระบบ",
            to: "/",
            onclick: () => {
                navigate("/login", {
                    state: {
                        backgroundLocation: location,
                    },
                });
            },
        },
        {
            icon: faUserPen,
            name: "สมัครสมาชิก",
            to: "/",
            onclick: () => {
                navigate("/register", {
                    state: {
                        backgroundLocation: location,
                    },
                });
            },
        },
    ];

    return (
        <div className="relative">
            <Menu>
                <Menu.Button>
                    <Icon height={height} />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                        as="div"
                        className="absolute -right-2 top-[calc(100%)] flex flex-col items-center space-y-2 rounded-md bg-white py-2 px-3 font-medium shadow-xl">
                        {/* <div className="triangle-clip absolute -top-1.5 right-3 h-4 w-4 rotate-[135deg] bg-primary"></div> */}
                        {user && loggedLink.map(link => <Link link={link} key={link.name} />)}
                        {!user && unlogLink.map(link => <Link link={link} key={link.name} />)}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

const Link = ({ link }) => {
    return (
        <Menu.Item key={link.name}>
            {({ active }) => (
                <div
                    onClick={link.onclick}
                    className={`flex-cen w-36 cursor-pointer justify-start space-x-2 rounded-md  border-2 border-white px-2 py-2  transition-all duration-300 ${
                        active ? " bg-text text-white" : "bg-white text-text"
                    }`}>
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.name}</span>
                </div>
            )}
        </Menu.Item>
    );
};

const Icon = ({ height }) => {
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <div className="flex items-center space-x-2 rounded-md outline-1 outline-offset-4 outline-gray-200 hover:outline">
            {user ? (
                <img
                    src={user.picture.large}
                    alt="dwad"
                    className="rounded-full bg-black object-cover shadow-sm"
                    style={{ height: `${height}px`, width: `${height}px` }}></img>
            ) : (
                <NonUserImg height={height} />
            )}
            <FontAwesomeIcon icon={faChevronDown} className="text-base text-gray-600" />
        </div>
    );
};

const NonUserImg = ({ height }) => {
    return (
        <div
            className="flex-col-cen relative shrink-0 overflow-hidden rounded-full border-2 border-text text-text"
            style={{ height: `${height}px`, width: `${height}px` }}>
            <FontAwesomeIcon icon={faUser} className="absolute translate-y-[20%]" style={{ fontSize: `${height - 10}px` }} />
        </div>
    );
};

export default UserIcon;
