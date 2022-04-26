import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useResponsive } from "../../composables/context/useResponsive";

import { ControlProvider } from "./context/ControlContext";
import { PageProvider } from "./context/PageContext";
import { usePostListFetch } from "../../composables/fetch/useFetchPost";
import useSearchQuery from "../../composables/useSearchQuery";

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
    const { error, isLoading, posts , totalPage } = usePostListFetch(id);

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <div className="min-h-screen w-full bg-[#f5f5f5]">
            {!isMobile && <PostListDesktop totalPage={totalPage} postList={posts} isLoading={isLoading} />}
            {isMobile && <PostListMobile postList={posts} isLoading={isLoading} />}
        </div>
    );
};

export default PostList;
