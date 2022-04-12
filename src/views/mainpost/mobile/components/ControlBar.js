import React, { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { faArrowLeft, faSearch, faDownLong, faChevronDown, faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";

import { SearchContext, SortContext } from "../../context/ControlContext";

import { SORT_TYPE, ORDER_TYPE } from "../../../../generalConfig";
import DisclosureAnimate from "../../../../component/utils/DisclosureAnimate";
const ControlBar = forwardRef((_, ref) => {
    return (
        <div ref={ref} className="fixed top-[60px] z-100 flex w-full items-center space-x-2 border-b bg-white px-2 py-3 text-text">
            <FontAwesomeIcon icon={faArrowLeft} className="flex-cen cursor-pointer rounded-full py-2 px-0 hover:bg-slate-100 xs:px-2" />
            <SearchBar />
            <SortBar />
        </div>
    );
});

const SearchBar = () => {
    const { setSearchValue } = useContext(SearchContext);
    const inputRef = useRef(null);
    useEffect(() => {
        const searchWidth = inputRef.current.clientWidth
        const animate = gsap.to(inputRef.current, {
            paused: true,
            yoyo: true,
            width: searchWidth > 200 ? searchWidth : 200,
            onReverseComplete: () => {
                inputRef.current.style.width = "100%";
            },
        });
        inputRef.current.addEventListener("focus", () => {
            animate.play();
        });
        inputRef.current.addEventListener("blur", () => {
            animate.reverse();
        });
    }, []);
    return (
        <div className="flex w-full items-center space-x-1 ">
            <input
                ref={inputRef}
                type="text"
                className="ellipsis w-full rounded-md px-2 py-1 outline outline-1 outline-text-light focus:outline-text "
                onChange={e => setSearchValue(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="shrink-0 text-text-light" />
        </div>
    );
};

const SortBar = () => {
    const { setSortBy, sortBy, orderBy, setOrderBy } = useContext(SortContext);
    const [open, setOpen] = useState(false);

    return (
        <div className="flex shrink-0 items-center space-x-2">
            <DisclosureAnimate toggle={open}>
                {({ childRelativeContainer, childAbsoluteContainer }) => (
                    <div
                        className="relative flex w-[130px] cursor-pointer items-center justify-between space-x-2 rounded-md bg-white px-2 py-1 outline outline-1 outline-text-light"
                        onClick={() => setOpen(e => !e)}>
                        <span className="ellipsis ">{SORT_TYPE.filter(e => sortBy === e.value)[0].label} </span>
                        <FontAwesomeIcon icon={faChevronDown} className="" />
                        <div className="absolute top-[calc(100%+1px)] -left-2 w-full ">
                            <div className="relative w-full self-end overflow-hidden " ref={childRelativeContainer}>
                                <div ref={childAbsoluteContainer} className="absolute bottom-0 left-0 flex w-full flex-col border bg-white py-2">
                                    {SORT_TYPE.map(e => {
                                        const active = e.value === sortBy;
                                        return (
                                            <div
                                                className={`w-full  py-1 px-2  ${active ? "bg-primary text-white " : "hover:bg-gray-100 "} `}
                                                onClick={() => setSortBy(e.value)}
                                                key={e.label}>
                                                {e.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </DisclosureAnimate>

            <div
                className="flex cursor-pointer items-center rounded-full bg-white px-1 py-2 hover:bg-gray-100"
                onClick={() => setOrderBy(prev => (prev === "ascending" ? "descending" : "ascending"))}>
                <FontAwesomeIcon icon={faDownLong} className="" />
                <FontAwesomeIcon
                    icon={faSignal}
                    className={`text-[12px] transition-transform ${orderBy === "descending" ? "rotate-90 scale-y-100" : "-rotate-90 -scale-y-100"}`}
                />
            </div>
        </div>
    );
};

export default ControlBar;
