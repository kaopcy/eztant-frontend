import React, { memo } from "react";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useMatch } from "react-router-dom";


const CreatePostDesktop = memo(() => {
    
    return (
        <div className="flex h-screen w-full flex-col text-text ">
            <div className="flex-col-cen relative h-[110px] w-full shrink-0 overflow-hidden">
                <div className="absolute text-2xl font-bold text-secondary  ">รายละเอียด</div>
                <img src={require("../../../assets/images/header.jpg")} alt="" className="h-full w-full object-cover" />
            </div>
            <Outlet  />
            
        </div>
    );
});

export default CreatePostDesktop;
