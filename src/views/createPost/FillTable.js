import React, { Suspense } from "react";
import { useResponsive } from "../../composables/context/useResponsive";
const FillTableMobile = React.lazy(() => import("./mobile/FillTableMobile"));
const FillTableDesktop = React.lazy(() => import("./desktop/FillTableDesktop"));

const FillDetail = () => {
    const isMobile = useResponsive();
    return <Suspense fallback={<div>loading</div>}>{isMobile ? <FillTableMobile /> : <FillTableDesktop />}</Suspense>;
};

export default FillDetail;
