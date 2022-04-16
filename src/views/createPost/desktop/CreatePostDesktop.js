import React, { memo } from "react";
import { useHandleInput, useInput } from "../context/inputCreatePostContext";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";

const CreatePostDesktop = memo(() => {
    return (
        <div className="flex h-screen w-full flex-col text-text ">
            <div className="flex-col-cen relative h-[110px] w-full shrink-0 overflow-hidden">
                <div className="absolute text-2xl font-bold text-secondary  ">รายละเอียด</div>
                <img src={require("../../../assets/images/header.jpg")} alt="" className="h-full w-full object-cover" />
            </div>
            <Outlet />
            <div className="mt-20 flex w-full items-center justify-center space-x-2">
                <Link to="/create-post" className="">
                    <FontAwesomeIcon icon={faChevronRight} className="rotate-180 cursor-pointer border-2 py-3 px-2 hover:bg-text hover:text-white" />
                </Link>
                <Link className="" to="fill-table">
                    <FontAwesomeIcon icon={faChevronRight} className="cursor-pointer border-2 py-3 px-2 hover:bg-text hover:text-white" />
                </Link>
            </div>
        </div>
    );
});

export default CreatePostDesktop;
