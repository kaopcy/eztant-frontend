import React from "react";
import NavSidebar from "./components/NavSidebar";

import { Outlet } from "react-router-dom";

const Community = () => {
    return (
        <div className="flex w-full justify-between">
            <NavSidebar />
            <Outlet />
        </div>
    );
};

export default Community;
