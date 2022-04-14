import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { faMagnifyingGlass, faChevronLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import DisclosureAnimate from "../utils/DisclosureAnimate";

const MobileDropdown = props => {
    gsap.registerPlugin(Draggable);
    const { toggleMobileDropdown, links, location } = props;
    const [searchValue, setSearchValue] = useState("");

    const tl1 = useRef(null);
    const container = useRef(null);
    const overlayRef = useRef(null);
    const mainContainer = useRef(null);

    const handleInput = e => {
        const { value } = e.target.value;
        setSearchValue(value);
        console.log(searchValue);
    };

    useEffect(() => {
        let lastSnap = 0;
        Draggable.create(mainContainer.current, {
            type: "x",
            onDragEnd: () => {
                const proxyWidth = gsap.getProperty(mainContainer.current, "width");
                const proxyX = gsap.getProperty(mainContainer.current, "x");
                const snapValue = proxyX > lastSnap ? -((proxyWidth * 3) / 4) : -((proxyWidth * 1) / 4);
                const destinationX = proxyX > snapValue ? 0 : -proxyWidth;
                lastSnap = destinationX;
                if (destinationX !== 0) {
                    gsap.to(overlayRef.current, {
                        autoAlpha: 0,
                        onComplete: () => {
                            toggleMobileDropdown();
                        },
                    });
                }
                gsap.to(mainContainer.current, {
                    duration: 1,
                    x: destinationX,
                    ease: "power4.out",
                });
            },
        });

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [toggleMobileDropdown]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        tl1.current = gsap
            .timeline({ paused: true, reversed: true, onReverseComplete: () => toggleMobileDropdown() })
            .to(container.current, {
                xPercent: 100,
                duration: 0.3,
                ease: "linear",
            })
            .to(overlayRef.current, { opacity: 0.3, duration: 0.3 }, "<");
        tl1.current.play();
    }, [toggleMobileDropdown]);

    const handleOnClose = () => {
        tl1.current.reverse();
    };

    return ReactDOM.createPortal(
        <>
            <div className=" fixed inset-0 z-[1001] ">
                <div className="absolute inset-0 bg-black opacity-0 " ref={overlayRef}></div>
                <div className=" fixed inset-0 z-[99] flex" ref={mainContainer}>
                    <div
                        className="absolute top-0 -left-[300px] z-[100] flex h-full w-[300px] shrink-0 flex-col overflow-y-auto bg-white"
                        ref={container}>
                        <Searchbar handleInput={handleInput} />
                        <div className="mt-6 flex w-full flex-col items-center">
                            {links.map(link =>
                                link.children ? (
                                    <DisclosureDropdown key={link.name} link={link} handleOnClose={toggleMobileDropdown} />
                                ) : (
                                    <CustomLink
                                        className="w-[90%] shrink-0 rounded-md px-4 py-3 text-xl font-medium text-gray-600"
                                        to={link.to}
                                        state={link.modal ? { backgroundLocation: location } : null}
                                        key={link.name}
                                        handleOnClose={toggleMobileDropdown}>
                                        {link.name}
                                    </CustomLink>
                                )
                            )}
                        </div>
                    </div>
                    <div className="h-full w-full bg-transparent" onClick={() => handleOnClose()}></div>
                </div>
            </div>
        </>,
        document.getElementById("navbar-modal")
    );
};

const Searchbar = props => {
    const { handleInput } = props;
    return (
        <div className="flex mt-6 w-full items-center space-x-6 px-6 ">
            <input type="text" className="w-full rounded-md border border-gray-300 px-2 py-1 text-base" onChange={() => handleInput()} />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl text-gray-700" />
        </div>
    );
};

const CustomLink = ({ children, to, handleOnClose, defaultColor, ...props }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: true });
    const style = {
        color: match ? "white" : "rgb(75,85,99)",
        background: match ? "#465FFC" : defaultColor ?? "white",
    };
    return (
        <Link style={style} to={to} {...props} onClick={()=> handleOnClose()}>
            {children}
        </Link>
    );
};

const DisclosureDropdown = props => {
    const { link: data } = props;
    const menu = data.children;
    const [toggle, setToggle] = useState(false);

    const Link = props => {
        const { handleOnClose, link } = props;
        return (
            <CustomLink
                className="w-[90%] shrink-0 rounded-md bg-slate-50 px-2 py-[6px] text-base font-medium text-gray-600 xs:px-10 xs:py-3"
                to={link.to}
                key={link.name}
                state={null}
                handleOnClose={handleOnClose}
                defaultColor={"rgb(248,250,252)"}>
                {link.name}
            </CustomLink>
        );
    };

    return (
        <DisclosureAnimate toggle={toggle}>
            {({ childRelativeContainer, childAbsoluteContainer }) => (
                <div className="flex w-[90%] flex-col ">
                    <div
                        className={` flex w-full cursor-pointer justify-between rounded-md px-4  py-3 text-xl font-medium text-gray-600 ${
                            toggle ? "bg-slate-100" : "bg-white"
                        }`}
                        onClick={() => setToggle(e => !e)}>
                        <span>{data.name}</span>
                        <FontAwesomeIcon icon={faChevronDown} className={`${toggle ? "rotate-180" : ""} transition-transform duration-500 `} />
                    </div>
                    <div className="relative w-[95%] self-end overflow-hidden " ref={childRelativeContainer}>
                        <div ref={childAbsoluteContainer} className="absolute bottom-0 w-full">
                            <div className="flex w-[100%] flex-col bg-slate-50 pl-4 xs:pl-14">
                                {menu.map(e => (
                                    <Link key={e.name} {...props} link={e}></Link>
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
