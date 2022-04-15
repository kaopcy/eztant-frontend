import React, { useEffect, useRef, useState } from "react";
import ApplyPopup from "./components/ApplyPopup";
import ControlBar from "./components/ControlBar";
import PostMobile, { PostFallBack } from "./components/PostMobile";

const PostListMobile = ({ postList, isLoading }) => {
    const [selectedPost, setSelectedPost] = useState(null);

    const controlBarRef = useRef(null);
    const blankRef = useRef(null);

    useEffect(() => {
        console.log(controlBarRef.current.clientHeight);
        blankRef.current.style.height = `${controlBarRef.current.clientHeight}px`;
    }, []);

    return (
        <div className="flex  w-full flex-col">
            <div ref={blankRef} className="h-[57px]"></div>
            <div className="flex-col-cen mt-6 space-y-4 text-text">
                {isLoading ? (
                    <PostFallBack />
                ) : (
                    postList.map((post, i) => <PostMobile post={post} key={post.subjectID} setSelectedPost={setSelectedPost} />)
                )}
            </div>
            {selectedPost && <ApplyPopup setSelectedPost={setSelectedPost} selectedPost={selectedPost} />}
            <ControlBar ref={controlBarRef} />
        </div>
    );
};

export default PostListMobile;
