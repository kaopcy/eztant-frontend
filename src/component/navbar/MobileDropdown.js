import React, { useEffect, useRef, useState } from "react";
import {
    faMagnifyingGlass,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";

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

    return (
        <div
            className="fixed top-0 -left-full flex h-full w-full flex-col bg-white "
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
            <div className="flex w-full flex-col space-y-2 mt-10">
                {links.map((link) => (
                    <CustomLink
                        className="shrink-0 text-xl font-medium text-gray-600 px-10 w-full"
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
        </div>
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

export default MobileDropdown;
