import React from "react";
import NavSidebar from "./components/NavSidebar";
import MemberSidebar from "./components/MemberSidebar";

import { useMediaQuery } from "react-responsive";

import { Outlet } from "react-router-dom";

import { Provider } from "./CommunityHome/CommunityHomeContext";

const Community = () => {
    const isHideMemberSidebar = useMediaQuery({ query: "(max-width: 1180px)" });

    return (
        <Provider>
            <div className="flex w-full items-start justify-between bg-[#F5F5F5]">
                <NavSidebar />

                <Outlet />
                {!isHideMemberSidebar && <MemberSidebar />}
            </div>
        </Provider>
    );
};

export default Community;
