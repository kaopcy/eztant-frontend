import React, { useContext, Fragment } from "react";
import { AuthContext } from "../../composables/context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";

const UserIcon = ({ height = 45 }) => {
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
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
const Icon = ({ height = 45 }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex items-center space-x-1">
            {user ? (
                <img
                    src={user.imgURL}
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
