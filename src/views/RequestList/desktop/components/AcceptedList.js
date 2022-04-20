import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AcceptedList = ({ post, activeSubject, activeSection, setActiveSection }) => {
    const allRequestList = post?.tables?.map(table => table.requested);

    let allRequestCount = 0;
    let allAcceptCount = 0;

    allRequestList.forEach(request => {
        if (request.length)
            request.forEach(user => {
                if (user.is_accepted) allAcceptCount += 1;
            });
        allRequestCount += request.length;
    });

    return (
        <div className="sticky top-[80px] flex h-[calc(100vh-120px)] w-[280px] shrink-0 flex-col overflow-auto border bg-white px-4 py-10 text-text shadow-lg">
            <div className="mb-5 text-xl font-bold">
                ยืนยันคำขอแล้ว ({allAcceptCount}/{allRequestCount})
            </div>
            {post.tables.map((table, index) => (
                <EachSection
                    setActive={() => setActiveSection(index)}
                    isActive={index === activeSection}
                    key={`${index}+${activeSubject * index}`}
                    table={table}
                    activeSubject={activeSubject}
                />
            ))}
        </div>
    );
};

const EachSection = ({ table, isActive, setActive, activeSubject }) => {
    let requestNum = 0;
    let acceptNum = 0;
    table?.requested.forEach(request => {
        requestNum += 1;
        if (request.is_accepted) acceptNum += 1;
    });

    const containRef = useRef(null);
    const absoluteRef = useRef(null);
    const containerRef = useRef(null);
    const animate = useRef(null);

    useEffect(() => {
        const height = absoluteRef.current.clientHeight;
        animate.current = gsap
            .timeline({ paused: true, reversed: true })
            .to(containRef.current, { height })
            .to(containerRef.current, { backgroundColor: "#06156E" }, "<");
        animate.current.play();
    }, []);

    useEffect(() => {
        if (isActive) animate.current.play();
        else animate.current.reverse();
    }, [isActive]);

    return (
        <>
            <div
                ref={containerRef}
                onClick={() => setActive()}
                className={`} relative mb-2 flex w-full cursor-pointer flex-col items-start  rounded-md bg-primary-dark px-2 py-2 font-semibold
                text-white`}>
                <div className="flex items-center">
                    <div className=" mr-2">เซค</div>
                    <div className=" mr-2">{table.section}</div>
                    <div className="">
                        ({acceptNum}/{table.max_ta})
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} className={`absolute right-4 ${isActive ? "rotate-180" : "rotate-0"}`} />
                </div>
                <div ref={containRef} className="relative w-full overflow-hidden ">
                    <div ref={absoluteRef} className="absolute w-full">
                        {acceptNum === 0 && <div className="">-</div>}
                        {table.requested.map((request, i) => request.is_accepted && <EachStudent request={request} key={`${i}+${activeSubject}`} />)}
                    </div>
                </div>
            </div>
        </>
    );
};

const EachStudent = request => {
    const user = request.request.user;
    return (
        <div className="mt-3 flex w-full items-center space-x-3 px-2">
            <img src={user.imgURL} className="aspect-square w-12 shrink-0 rounded-full " alt="" />
            <div className="flex w-full min-w-0 flex-col -space-y-1">
                <div className="ellipsis text-base font-normal">
                    {user.firstname} {user.lastname}
                </div>
                <div className="text-sm font-normal">{user.studentID}</div>
            </div>
        </div>
    );
};

export default AcceptedList;
