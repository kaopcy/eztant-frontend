import React, { createContext, useContext, useEffect, useRef } from "react";
import gsap from "gsap";

const TitleContext = createContext();
const LoaderContext = createContext();
const IsLoadingContext = createContext();

const SmallLoading = ({ children, isLoading, gap = 20 }) => {
    const titleRef = useRef(null);
    const loaderRef = useRef(null);

    useEffect(() => {
        console.log(isLoading);

        gsap.set(loaderRef.current, {
            right: "50%",
            xPercent: 50,
        });
        const tl = gsap.timeline();
        const titleSize = titleRef.current.offsetWidth;
        const loaderSize = loaderRef.current.offsetWidth;

        if (isLoading) {
            gsap.set(loaderRef.current, {
                rotation: "+=360",
                duration: 1,
                ease: "linear",
                repeat: -1,
            });
            tl.to(loaderRef.current, {
                opacity: 1,
                x: titleSize / 2 + gap,
            }).to(
                titleRef.current,
                {
                    x: -(loaderSize / 2 + gap),
                },
                "<"
            );
        } else {
            tl.to(loaderRef.current, {
                opacity: 0,
                x: 0,
            }).to(
                titleRef.current,
                {
                    x: 0,
                },
                "<"
            );
        }
    }, [isLoading, gap]);

    return (
        <IsLoadingContext.Provider value={isLoading}>
            <TitleContext.Provider value={titleRef}>
                <LoaderContext.Provider value={loaderRef}>
                    <div className="relative">{children}</div>
                </LoaderContext.Provider>
            </TitleContext.Provider>
        </IsLoadingContext.Provider>
    );
};

const Title = ({ children, ...props }) => {
    const titleRef = useContext(TitleContext);
    // const isLoading = useContext(IsLoadingContext);
    return (
        <div className="" ref={titleRef}>
            {children}
            {/* {!isLoading && children} */}
        </div>
    );
};

const Loader = ({ children, ...props }) => {
    const loaderRef = useContext(LoaderContext);
    // const isLoading = useContext(IsLoadingContext);
    return (
        <div className="absolute m-0 whitespace-nowrap p-0 opacity-0" ref={loaderRef}>
            {children}
            {/* {isLoading && children} */}
        </div>
    );
};

SmallLoading.Title = Title;
SmallLoading.Loader = Loader;

export default SmallLoading;
