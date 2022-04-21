import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";

const CommunityHome = () => {
    const testRef = useRef(null);
    const animate = useRef(null);
    useEffect(() => {
        animate.current = gsap
            .timeline({
                paused: true,
                onComplete: () => {
                    animate.current.restart();
                },
            })
            .to(testRef.current, {
                y: "+=360",
                ease: "linear",
            });
    }, []);

    return (
        <div className="flex flex-col items-center ">
            <div onClick={() => animate.current.play()} className="btn-white rounded-md px-4 py-2 shadow-md ">
                Play
            </div>
            <div ref={testRef} className="aspect-video h-10 shrink-0 rounded-full bg-red-500"></div>
        </div>
    );
};

export default CommunityHome;
