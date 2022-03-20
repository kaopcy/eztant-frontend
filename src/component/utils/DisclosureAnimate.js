import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useNonInitialEffect } from "../../composables/useNonInitialEffect";
const DisclosureAnimate = ({ toggle, children }) => {
    const childRelativeContainer = useRef(null);
    const childAbsoluteContainer = useRef(null);
    const containerHeight = useRef(null);
    useEffect(() => {
        containerHeight.current = childAbsoluteContainer.current.offsetHeight;
        const tl = gsap.timeline();
        tl.set(childRelativeContainer.current, {
            height: 0,
        });
    }, []);

    useNonInitialEffect(() => {
        const tl = gsap.timeline();
        if (toggle) {
            tl.to(childRelativeContainer.current, {
                height: `${containerHeight.current}px`,
            });
        } else {
            tl.to(childRelativeContainer.current, {
                height: 0,
            });
        }
    }, [toggle]);
    return children({ childAbsoluteContainer, childRelativeContainer });
};

export default DisclosureAnimate;
