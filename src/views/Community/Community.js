import React from "react";
import NavSidebar from "./components/NavSidebar";
import MemberSidebar from "./components/MemberSidebar";

import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";

const Community = () => {
    const isHideMemberSidebar = useMediaQuery({ query: "(max-width: 1180px)" });

    return (
        <div className="flex w-full justify-between items-start">
            <NavSidebar />
            <Outlet />
            {!isHideMemberSidebar && <MemberSidebar />}
        </div>
    );
};

export default Community;
