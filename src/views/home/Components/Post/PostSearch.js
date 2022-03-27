import React, { useState } from "react";
import { useResponsive } from "../../../../composables/context/useResponsive";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
const PostSearch = () => {
    const isMobile = useResponsive();
    return (
        <div className="">
            {isMobile && <Mobile />}
            {!isMobile && <Desktop />}
        </div>
    );
};

const Mobile = () => {
    return (
        <div className="mt-10 flex w-full items-center justify-between px-10 xs:px-14 sm:px-16 ">
            <div className=" relative py-2 pr-12 text-xl sm:text-3xl font-bold text-text ">
                <div className="flex space-x-4 items-center">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-yellow-300 " />
                    <span>แนะนำ</span>
                </div>
                <div className="absolute bottom-0 left-0 h-[4px] w-full bg-yellow-200"></div>
            </div>
            <FontAwesomeIcon icon={faSearch} className="text-xl sm:text-3xl  text-text-light" />
        </div>
    );
};

const Desktop = () => {
    return (
        <div className="flex-col-cen m-auto w-full max-w-[1000px]  bg-text py-8 px-20  text-white">
            <div className="flex-col-cen mb-8 w-full space-y-4">
                <div className="text-3xl">โพสต์</div>
                <div className="h-[1px] w-3/4 max-w-md bg-white  "></div>
                <div className="text-lg">รวบรวมโพสต์งาน TA ทุกภาควิชาในคณะวิศวกรรมศาสตร์มาไว้ที่นี่แล้ว</div>
            </div>
            <SearchBarDesktop />
        </div>
    );
};

const SearchBarDesktop = () => {
    const [searchInput, setSearchInput] = useState("");
    const handleInput = e => {
        const { value } = e.target;
        setSearchInput(value);
    };

    return (
        <div className="flex w-full space-x-2 text-lg">
            <input type="text" className="w-full px-2 py-1 text-text" onChange={handleInput} />
            <div className="btn-orange h-full py-2 px-5">ค้นหา</div>
        </div>
    );
};

export default PostSearch;
