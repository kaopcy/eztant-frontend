import React, { useEffect, useRef } from "react";
import ControlBar from "./components/ControlBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const PostListMobile = () => {
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
        <div className="flex flex-col min-h-[5000px] w-full">
            <ControlBar ref={controlBarRef} />
            <div className="" style={{ height: controlBarRef.current?.offsetHeight }}></div>
            <div className="">hello this is dawn</div>
        </div>
    );
};

export default PostListMobile;
