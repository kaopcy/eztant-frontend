import React, { Suspense } from "react";
import { useResponsive } from "../../composables/context/useResponsive";
const FillDetailMobile = React.lazy(() => import("./mobile/FillDetailMobile"));
const FillDetailDesktop = React.lazy(() => import("./desktop/FillDetailDesktop"));

const FillDetail = () => {
    const isMobile = useResponsive();
    return <Suspense fallback={<div>loading</div>}>{isMobile ? <FillDetailMobile /> : <FillDetailDesktop />}</Suspense>;
};

export default FillDetail;
