import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResponsive } from "../../composables/context/useResponsive";

import PostListDesktop from "./desktop/PostListDesktop";
import PostListMobile from "./mobile/PostListMobile";

const PostList = () => {
    const { id } = useParams()
    const isMobile = useResponsive();
    useEffect(()=>{
        console.log(id);
    },[id])
    return (
        <div className="w-full mt-10 min-h-screen">
            {!isMobile && <PostListDesktop />}
            {isMobile && <PostListMobile />}
        </div>
    );
};

export default PostList;
