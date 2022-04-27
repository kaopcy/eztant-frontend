import React, { useEffect, useRef, useState } from "react";

import { DAY_COLOR } from "../../../../generalConfig";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const RequestSubjectList = ({ posts, ...props }) => {
    return (
        <div className="left-scroll sticky top-[80px] h-[calc(100vh-120px)] w-[270px]  shrink-0 flex-col items-center overflow-auto bg-primary-burn py-10 px-4 text-text shadow-lg">
            <div className="left-scroll-child w-full">
                <div className="mb-5 text-2xl font-bold text-white">รายวิชา</div>

                <div className="w-full space-y-[2px] ">
                    {posts.map((post, index) => (
                        <EachPost {...props} key={index} index={index} active={index === props.active} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const EachPost = ({ setActive, index, active = false, post, ...props }) => {
    const contentRef = useRef(null);
    const absoluteRef = useRef(null);
    const animate = useRef(null);

    useEffect(() => {
        const height = absoluteRef.current.clientHeight;
        animate.current = gsap.timeline({ paused: true, reversed: true }).to(contentRef.current, { duration: 0.3, ease: "linear", height });
    }, []);

    useEffect(() => {
        if (active) animate.current.play();
        else animate.current.reverse();
    }, [active]);

    return (
        <div onClick={() => setActive(index)} className="w-full cursor-pointer bg-white">
            <div className="flex  min-w-0 flex-col px-3 py-4">
                <div className="  flex items-center justify-between leading-5 tracking-wide text-primary">
                    <div className="ellipsis text-base font-bold uppercase">{post?.subject_name}</div>
                    <FontAwesomeIcon icon={faChevronDown} className={`ml-3 shrink-0 transition-all  ${active ? "rotate-180" : "rotate-0"}`} />
                </div>
                <div className="text-base font-bold  text-gray-400">{post?.subject_id}</div>
            </div>
            <div ref={contentRef} className="relative h-0 w-full overflow-hidden">
                <div ref={absoluteRef} className="absolute w-full  pb-5">
                    {post.schedules.map((table, i) => (
                        <EachSection {...props} index={i} table={table} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const EachSection = ({ table, activeSection, index }) => {
    let requestNum = 0;
    let acceptNum = 0;
    table?.requested.forEach(request => {
        requestNum += 1;
        if (request.is_accepted) acceptNum += 1;
    });
    return (
        <div className={`mt-2  flex w-full items-center py-1 ${activeSection === index && "bg-gray-100"}`}>
            <div className="flex w-full items-center justify-center text-base  font-bold">
                {/* <div className="mr-2 h-2 w-4 shrink-0 rounded-sm" style={{ backgroundColor: DAY_COLOR[table.day] }}></div> */}
                เซค {table.section}
            </div>
            <div className="flex w-full items-center justify-center text-base  font-bold">
                {requestNum}/{table.max_ta} <div className="ml-2">คน</div>
            </div>
        </div>
    );
};

export default RequestSubjectList;
