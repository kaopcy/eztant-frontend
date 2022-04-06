import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get("page") || 1;
    console.log(page);
    const { postList, isLoading, getPostList } = usePostList(page, id);

    return (
        <div className="min-h-screen w-full">
            {!isMobile && <PostListDesktop postList={postList} isLoading={isLoading} getPostList={getPostList} />}
            {isMobile && <PostListMobile postList={postList} isLoading={isLoading} getPostList={getPostList} />}
            <div className="btn-orange rounded-md px-4 py-1" onClick={() => setSearchParams({ page: page +1 })}>
                Clikc to add {page}
            </div>
        </div>
    );
};

export default PostList;
