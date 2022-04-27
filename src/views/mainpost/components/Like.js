import React, { useRef, useEffect, useLayoutEffect, useMemo, useState } from "react";
import gsap from "gsap";

import { useLike } from "../../../composables/interact/useLike";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

const Like = ({ flashAnimate, likes, postID }) => {
    const heartBorderRef = useRef(null);
    const heartSolidRef = useRef(null);
    const circleRef = useRef(null);
    const circleWhiteRef = useRef(null);

    const animation = useRef(null);
    useLayoutEffect(() => {
        gsap.set(circleRef.current, { scale: 0 });
        gsap.set(circleWhiteRef.current, { scale: 0 });
        gsap.set(heartSolidRef.current, { scale: 0 });
    }, []);

    const { user } = useSelector(state => state.user);
    const { mutate } = useLike();

    const initLike = useRef(likes.some(e => e._id === user._id));
    const [isLike, setIsLike] = useState(initLike.current);

    useEffect(() => {
        animation.current = gsap
            .timeline({ paused: true, reversed: true })
            .to(circleRef.current, { scale: 1, duration: 0.4, ease: "back.out(4)" }, "<")
            .to(circleWhiteRef.current, { scale: 1, duration: 0.4, ease: "back.out(2)" }, "<0.1")
            .to(circleRef.current, { autoAlpha: 0 }, "<")
            .to(circleWhiteRef.current, { autoAlpha: 0 }, "<")
            .to(heartBorderRef.current, { autoAlpha: 0 }, "<")
            .to(heartSolidRef.current, { color: "red", duration: 0.3 }, "<")
            .to(heartSolidRef.current, { scale: 1, duration: 0.4, ease: "back.out(7)" }, "<");
        initLike.current ? animation.current.progress(100) : animation.current.progress(0);
        return () => {
            animation.current.kill();
        };
    }, []);

    const toggleAnimation = () => {
        !isLike ? animation.current.play() : animation.current.reverse();
    };

    return (
        <div
            className="z-20 mb-1 flex cursor-pointer space-x-2 self-end"
            onClick={() => {
                setIsLike(e => !e);
                flashAnimate();
                toggleAnimation();
                mutate(postID);
            }}>
            <div className="flex-col-cen relative ">
                <div
                    className="absolute top-1/2 left-1/2 z-[1] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400"
                    ref={circleRef}></div>
                <div
                    className="absolute top-1/2 left-1/2 z-[2] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    ref={circleWhiteRef}></div>
                <div ref={heartSolidRef} className="absolute top-0 left-0 z-10 text-white">
                    <FontAwesomeIcon icon={faHeartSolid} className="" />
                </div>
                <div ref={heartBorderRef} className="z-20">
                    <FontAwesomeIcon icon={faHeart} className="" />
                </div>
            </div>
            <div className="self-end text-sm text-text-light">{likes?.length - (initLike.current ? 1 : 0) + (isLike ? 1 : 0)}</div>
        </div>
    );
};

export default Like;
