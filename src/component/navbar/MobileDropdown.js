import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
    faMagnifyingGlass,
    faChevronLeft,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import DisclosureAnimate from "../utils/DisclosureAnimate";

const MobileDropdown = (props) => {
    const { toggleMobileDropdown, links, location } = props;

    const [searchValue, setSearchValue] = useState("");
    const handleInput = (e) => {
        const { value } = e.target.value;
        setSearchValue(value);
        console.log(searchValue);
    };

    const container = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline();
        tl.to(container.current, {
            xPercent: 100,
            duration: 0.5,
            ease: "power2.out",
        });

        return () => {
            tl.kill();
        };
    }, []);

    const handleOnClose = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                toggleMobileDropdown();
            },
        });
        tl.to(container.current, {
            xPercent: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    return ReactDOM.createPortal(
        <div
            className="fixed top-0 -left-full z-30 flex h-full w-full flex-col overflow-y-auto bg-white "
            ref={container}
        >
            <div
                className="flex h-16 w-full items-center justify-end px-6"
                onClick={() => handleOnClose()}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-gray-700"
                />
            </div>
            <Searchbar handleInput={handleInput} />
            <div className="mt-10 flex w-full flex-col items-center">
                {links.map((link) =>
                    link.children ? (
                        <DisclosureDropdown
                            key={link.name}
                            link={link}
                            handleOnClose={handleOnClose}
                        />
                    ) : (
                        <CustomLink
                            className="w-[90%] shrink-0 rounded-md px-10 py-3 text-xl font-medium text-gray-600"
                            to={link.to}
                            state={
                                link.modal
                                    ? { backgroundLocation: location }
                                    : null
                            }
                            key={link.name}
                            handleOnClose={handleOnClose}
                        >
                            {link.name}
                        </CustomLink>
                    )
                )}
            </div>
        </div>,
        document.getElementById("navbar-modal")
    );
};

const Searchbar = (props) => {
    const { handleInput } = props;
    return (
        <div className="flex w-full items-center space-x-6 px-6">
            <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-2 py-1 text-base"
                onChange={() => handleInput()}
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-2xl text-gray-700"
            />
        </div>
    );
};

const CustomLink = ({
    children,
    to,
    handleOnClose,
    defaultColor,
    ...props
}) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: true });
    const style = {
        color: match ? "white" : "rgb(75,85,99)",
        background: match ? "#465FFC" : defaultColor ?? "white",
    };
    return (
        <Link style={style} to={to} {...props} onClick={() => handleOnClose()}>
            {children}
        </Link>
    );
};

const DisclosureDropdown = (props) => {
    const { link: data } = props;
    const menu = data.children;
    const [toggle, setToggle] = useState(false);

    const Link = (props) => {
        const { handleOnClose, link } = props;
        return (
            <CustomLink
                className="w-[90%] shrink-0 rounded-md bg-slate-50 px-10 py-3 text-xl font-medium text-gray-600"
                to={link.to}
                key={link.name}
                state={null}
                handleOnClose={handleOnClose}
                defaultColor={"rgb(248,250,252)"}
            >
                {link.name}
            </CustomLink>
        );
    };

    return (
        <DisclosureAnimate toggle={toggle}>
            {({ childRelativeContainer, childAbsoluteContainer }) => (
                <div className="w-[90%] ">
                    <div
                        className={` flex w-full justify-between rounded-md px-10 py-3 text-xl font-medium text-gray-600 ${
                            toggle ? "bg-slate-50" : "bg-white"
                        }`}
                        onClick={() => setToggle((e) => !e)}
                    >
                        <span>{data.name}</span>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`${
                                toggle ? "rotate-180" : ""
                            } transition-transform duration-500 `}
                        />
                    </div>
                    <div
                        className="relative w-full overflow-hidden"
                        ref={childRelativeContainer}
                    >
                        <div
                            ref={childAbsoluteContainer}
                            className="absolute bottom-0 w-full"
                        >
                            <div className="flex w-[100%] flex-col bg-slate-50 pl-14">
                                {menu.map((e) => (
                                    <Link
                                        key={e.name}
                                        {...props}
                                        link={e}
                                    ></Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DisclosureAnimate>
    );
};

export default MobileDropdown;
