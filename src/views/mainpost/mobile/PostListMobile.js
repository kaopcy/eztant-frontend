import React, { useEffect, useRef, useState } from "react";
import ControlBar from "./components/ControlBar";
import PostMobile from "./components/PostMobile";

const PostListMobile = ({ postList, isLoading }) => {
    const controlBarRef = useRef(null);
    const blankRef = useRef(null);
    useEffect(() => {
        console.log(controlBarRef.current.offsetHeight);
        blankRef.current.style.height = `${controlBarRef.current.offsetHeight}px`;
    }, []);

    return (
        <div className="flex min-h-[5000px] w-full flex-col">
            <ControlBar ref={controlBarRef} />
            <div ref={blankRef} className=""></div>
            <div className="flex-col-cen mt-6 space-y-4 text-text">
                {postList.map((post, i) => (
                    <PostMobile post={post} key={post.subjectID} />
                ))}
            </div>
        </div>
    );
};

export default PostListMobile;
