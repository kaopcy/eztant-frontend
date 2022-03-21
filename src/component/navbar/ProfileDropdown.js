import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileDropdown = () => {
    return (
        <div className="relative">
            <Menu>
                <Menu.Button>
                    <FontAwesomeIcon
                        icon={faUser}
                        className="text-2xl text-gray-600"
                    />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        as="div"
                        className="absolute -right-2 top-[calc(100%+1rem)] flex flex-col items-center space-y-2 rounded-md bg-primary py-2 px-3 font-medium"
                    >
                        <div className="triangle-clip absolute -top-1.5 right-3 h-4 w-4 rotate-[135deg] bg-primary"></div>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={`flex w-36 cursor-pointer justify-center  rounded-md border-2 border-white py-2 transition-all duration-300 ${
                                        active
                                            ? " bg-primary text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    อาจารย์
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div
                                    className={`flex w-36 cursor-pointer justify-center  rounded-md border-2 border-white py-2 transition-all duration-300 ${
                                        active
                                            ? " bg-primary text-white"
                                            : "bg-white"
                                    }`}
                                >
                                    นักศึกษา
                                </div>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default ProfileDropdown;
