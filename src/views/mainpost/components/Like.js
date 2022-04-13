import React, { useRef, useEffect } from "react";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Like = () => {
    const heartBorderRef = useRef(null);
    const heartSolidRef = useRef(null);

    const animation = useRef(null);
    useEffect(() => {
        animation.current = gsap
            .timeline({ paused: true, reversed: true })
            .to(heartBorderRef.current, { autoAlpha: 0 })
            .to(heartSolidRef.current, { color: "red", ease: "expo.inOut" }, "<");
        return () => {
            animation.current.kill();
        };
    }, []);

    const toggleAnimation = () => {
        animation.current.reversed() ? animation.current.play() : animation.current.reverse();
    };

    return (
        <div className="mb-1 flex space-x-2 self-end">
            <div className="flex-col-cen relative " onClick={() => toggleAnimation()}>
                <div ref={heartSolidRef} className="absolute top-0 left-0 z-10 text-white">
                    <FontAwesomeIcon icon={faHeartSolid} className="" />
                </div>
                <div ref={heartBorderRef} className="z-20">
                    <FontAwesomeIcon icon={faHeart} className="" />
                </div>
            </div>
            <div className="self-end text-sm text-text-light">17</div>
        </div>
    );
};

export default Like;
