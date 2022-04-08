import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
const Test = () => {
    gsap.registerPlugin(Draggable);
    const dragProxy = useRef(null);
    useEffect(() => {
        let lastSnap = 0;
        const AllPage = gsap.utils.toArray(".page");
        const proxyWidth = gsap.getProperty(dragProxy.current, "width");

        gsap.set(AllPage ,{
            x: i=> proxyWidth * i
        })
        Draggable.create(dragProxy.current, {
            type: "x",
            inertia: true,
            onDrag: () => {
                console.log("kuay");
                
            },
            onDragEnd: () => {
                const widthArr = [];
                const count = 7;
                const proxyX = gsap.getProperty(dragProxy.current, "x");
                for (let i = 0; i < count; i++) {
                    if (i === count - 1 && i % 2 === 0) break;
                    widthArr.push(-proxyWidth * i);
                }
                console.log();

                const snapValue = proxyX > lastSnap ? -((proxyWidth * 3) / 4) : -((proxyWidth * 1) / 4);
                const destinationX = proxyX > snapValue ? 0 : -proxyWidth;
                lastSnap = destinationX;
                if (destinationX === 0) {
                    console.log("page1");
                } else {
                    console.log("page2");
                }
                gsap.to(dragProxy.current, {
                    duration: 1,
                    x: gsap.utils.snap(widthArr, proxyX),
                    ease: "expo.out",
                });
            },
        });
    }, []);

    return (
        <div className="relative h-[200px] w-[880px]  self-center overflow-hidden">
            <div className="flex h-full w-[220px]" ref={dragProxy}>
                <Page className="bg-red-200" />
                <Page className="bg-green-200" />
                <Page className="bg-blue-200" />
                <Page className="bg-orange-200" />
                <Page className="bg-pink-200" />
                <Page className="bg-gray-200" />
                <Page className="bg-amber-200" />
            </div>
        </div>
    );
};

const Page = ({ className }) => {
    return <div className={`${className} absolute top-0 left-0 page mx-[10px] flex h-full w-[200px] shrink-0 `}></div>;
};

export default Test;
