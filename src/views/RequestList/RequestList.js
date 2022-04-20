import React from "react";
import RequestListDesktop from "./desktop/RequestListDesktop";
import { useResponsive } from "../../composables/context/useResponsive";

import { RequestListProvider } from "./RequestListContext";

const RequestList = () => {
    const isMobile = useResponsive();
    return <RequestListProvider>{isMobile ? <div className=""></div> : <RequestListDesktop />}</RequestListProvider>;
};

export default RequestList;
