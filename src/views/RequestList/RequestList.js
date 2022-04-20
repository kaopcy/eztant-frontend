import React from "react";
import RequestListDesktop from "./desktop/RequestListDesktop";
import { useResponsive } from "../../composables/context/useResponsive";

const RequestList = () => {
    const isMobile = useResponsive();
    return isMobile ? <div className=""></div> : <RequestListDesktop />;
};

export default RequestList;
