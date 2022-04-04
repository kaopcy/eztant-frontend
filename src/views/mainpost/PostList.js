import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResponsive } from "../../composables/context/useResponsive";

import { ControlProvider } from "./context/ControlContext";
import { PageProvider, PageContext } from "./context/PageContext";
import { usePostList } from "../../api/Post/postList";

import PostListDesktop from "./desktop/PostListDesktop";
import PostListMobile from "./mobile/PostListMobile";

const PostList = () => {
    return (
        <PageProvider>
            <ControlProvider>
                <Inside />
            </ControlProvider>
        </PageProvider>
    );
};

const Inside = () => {
    const isMobile = useResponsive();
    const { id } = useParams();
    const { page } = useContext(PageContext);
    const { postList, isLoading , getPostList } = usePostList(page, id);
    
    return (
        <div className="min-h-screen w-full">
            {!isMobile && <PostListDesktop postList={postList} isLoading={isLoading} getPostList={getPostList}/>}
            { isMobile && <PostListMobile />}
        </div>
    );
};

export default PostList;
