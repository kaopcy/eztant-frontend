import React, { useState, useRef, useMemo, useEffect, useLayoutEffect } from "react";

import gsap from "gsap";
import Post, { PostFallBack } from "../../../mainpost/desktop/components/PostDesktop";
import PostMobile, { PostFallBack as PostFallBackMobile } from "../../../mainpost/mobile/components/PostMobile";

import { v4 as uuid } from "uuid";
import usePostListFetch from "../../../../api/Post/usePostListFetch";
import { useResponsive } from "../../../../composables/context/useResponsive";

const OwnedPost = () => {
    const isMobile = useResponsive()
    const { isLoading, postList } = usePostListFetch("allDepartment", 1);

    const isDataReady = useMemo(() => {
        if (!postList || isLoading || postList.length === 0) return false;
        return true;
    }, [postList, isLoading]);

    const container = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            ".stagger-post-animation",
            { x: gsap.getProperty(container.current, "width") },
            { x: 0, stagger: { amount: 0.3, each: 0.3 }, ease: "elastic.out(1,1)" }
        );
    }, [isDataReady, postList]);

    return (
        <div className="mt-10 flex w-full flex-col items-center">
            {isDataReady ? (
                <div ref={container} className="absolute overflow-hidden px-3">
                    {postList.map(post => (
                        <div key={uuid()} className="stagger-post-animation">
                            {isMobile ? <PostMobile post={post} /> : <Post post={post} />}
                        </div>
                    ))}
                </div>
            ) : (
                <div ref={container} className="absolute overflow-hidden px-3">
                    <div key={uuid()} className="stagger-post-animation">
                        {isMobile ? <PostFallBackMobile /> : <PostFallBack />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnedPost;
