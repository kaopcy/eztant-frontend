import React, { useContext, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../store/actions/authAction";
const UserIcon = ({ height = 45 }) => {
    const dispatch = useDispatch();
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
                        className="absolute -right-2 top-[calc(100%+1rem)] flex flex-col items-center space-y-2 rounded-md bg-primary py-2 px-3 font-medium">
                        <div className="triangle-clip absolute -top-1.5 right-3 h-4 w-4 rotate-[135deg] bg-primary"></div>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={`flex w-36 cursor-pointer justify-center  rounded-md border-2 border-white py-2 transition-all duration-300 ${
                                        active ? " bg-primary text-white" : "bg-white"
                                    }`}>
                                    อาจารย์
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={`flex w-36 cursor-pointer justify-center  rounded-md border-2 border-white py-2 transition-all duration-300 ${
                                        active ? " bg-primary text-white" : "bg-white"
                                    }`}>
                                    นักศึกษา
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    onClick={() => dispatch(logout())}
                                    className={`flex w-36 cursor-pointer justify-center  rounded-md border-2 border-white py-2 transition-all duration-300 ${
                                        active ? " bg-primary text-white" : "bg-white"
                                    }`}>
                                    Logout
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
const Icon = ({ height = 45 }) => {
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <div className="flex items-center space-x-1">
            {user ? (
                <img
                    src={user.picture.large}
                    alt="dwad"
                    className="h-10 w-10 rounded-full bg-black object-cover shadow-sm"
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
