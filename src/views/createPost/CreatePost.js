import React, { Suspense } from "react";

import { useResponsive } from "../../composables/context/useResponsive";
import { InputProvider } from "./context/inputCreatePostContext";
import { TableInputProvider } from "./context/tableCreatePostContext";

const CreatePostDesktop = React.lazy(() => import("./desktop/CreatePostDesktop"));
const CreatePostMobile = React.lazy(() => import("./mobile/CreatePostMobile"));

const CreatePost = () => {
    const isMobile = useResponsive();
    return (
        <Suspense fallback={<div>Loading</div>}>
            <TableInputProvider>
                <InputProvider>{isMobile ? <CreatePostMobile /> : <CreatePostDesktop />}</InputProvider>
            </TableInputProvider>
        </Suspense>
    );
};

export default CreatePost;
