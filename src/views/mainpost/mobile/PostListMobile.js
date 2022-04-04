import React, { useEffect, useRef } from "react";
import ControlBar from "./components/ControlBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import PostMobile from "./components/PostMobile";

const PostListMobile = ({ postList, isLoading, getPostList }) => {
    const controlBarRef = useRef(null);
    // useEffect(() => {
    //     const animate = gsap.to(controlBarRef.current, { y: "-=60", duration: 0.5, ease: "power2.in", paused: true });

    //     ScrollTrigger.create({
    //         trigger: controlBarRef.current,
    //         start: "10px top",
    //         end: 99999,
    //         onUpdate: ({ progress, direction, isActive }) => {
    //             if (direction === -1) animate.reverse();
    //             if (direction === 1) animate.play();
    //         },
    //     });
    // }, []);

    
    return (
        <div className="flex min-h-[5000px] w-full flex-col">
            <ControlBar ref={controlBarRef} />
            <div className="" style={{ height: controlBarRef.current?.offsetHeight }}></div>
            <div className="flex-col-cen space-y-4 text-text mt-6">
                {postList.map((post, i) => (
                    <PostMobile post={post} key={post.subjectID} />
                ))}
            </div>
        </div>
    );
};

export default PostListMobile;
