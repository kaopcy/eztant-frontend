import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useResponsive } from "../../composables/context/useResponsive";

import { ControlProvider } from "./context/ControlContext";
import { PageProvider } from "./context/PageContext";
import usePostListFetch from "../../api/Post/usePostListFetch";
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

    const { query } = useSearchQuery();
    const [params , setParams] = useSearchParams()

    const page = query?.page || 1;
    const sortBy = query?.sortBy || "teacherName";
    const orderBy = query?.orderBy || "ascending";
    useEffect(() => {
        setParams({ sortBy, orderBy, page });
    }, [sortBy , orderBy , page , setParams]);

    const { postList, isLoading } = usePostListFetch(page, id);
    return (
        <div className="min-h-screen w-full">
            {!isMobile && <PostListDesktop postList={postList} isLoading={isLoading} />}
            {isMobile && <PostListMobile postList={postList} isLoading={isLoading} />}
        </div>
    );
};

export default PostList;
