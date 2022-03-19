import react, { useState, useRef, useEffect } from "react";
import { useNonInitialEffect } from "../useNonInitialEffect";
import gsap from "gsap";

// * rule of use
// all container must be useRef() form

export function useTwoComTransition(
    { firstContainer, secondContainer },
    isChange,
) {
    const tl = useRef();
    useEffect(() => {
        tl.current = gsap
            .timeline({ paused: true })
            .fromTo(
                firstContainer.current,
                {
                    xPercent: 100,
                },
                {
                    xPercent: 0,
                    duration: 0.5,
                    ease: "power4.inOut",
                }
            )
            .fromTo(
                secondContainer.current,
                {
                    xPercent: 0,
                },
                {
                    xPercent: -100,
                    duration: 0.5,
                    ease: "power4.inOut",
                },
                "<"
            );
        gsap.set(secondContainer.current, {
            xPercent: 0,
        });
        gsap.set(firstContainer.current, {
            xPercent: -100,
        });

        return () => {
            tl.current.kill();
        };
    }, [firstContainer, secondContainer]);

    useNonInitialEffect(() => {
        if (isChange) {
            tl.current.reverse();
        } else {
            tl.current.play();
        }
    }, [isChange]);
}
