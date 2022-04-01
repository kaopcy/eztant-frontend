import React from "react";
import { useResponsive } from "../../composables/context/useResponsive";

import PostListDesktop from "./desktop/PostListDesktop";
import PostListMobile from "./mobile/PostListMobile";

const PostList = () => {
    const isMobile = useResponsive();

    return (
        <div className="w-full min-h-screen">
            {!isMobile && <PostListDesktop />}
            {isMobile && <PostListMobile />}
        </div>
    );
};

export default PostList;
