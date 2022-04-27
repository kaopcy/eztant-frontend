import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { useNonInitialEffect } from "../../../../composables/useNonInitialEffect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AcceptedList = ({ post, activeSubject, activeSection, setActiveSection }) => {
    const allRequestList = post?.schedules?.map(table => table.requested);

    const allRequestCount = useMemo(() => {
        let temp = 0;
        allRequestList.forEach(request => {
            if (request.length) temp += request.length;
        });
        return temp;
    }, [allRequestList]);

    const allAcceptCount = useMemo(() => {
        let temp = 0;
        allRequestList.forEach(request => {
            request.forEach(user => {
                if (user.is_accepted) temp += 1;
            });
        });
        return temp;
    }, [allRequestList]);

    return (
        <div className="sticky top-[80px] flex h-[calc(100vh-120px)] w-[280px] shrink-0 flex-col overflow-auto border bg-white px-4 py-10 text-text shadow-lg">
            <div className="mb-5 text-xl font-bold">
                ยืนยันคำขอแล้ว ({allAcceptCount}/{allRequestCount})
            </div>
            {post.schedules.map((table, index) => (
                <EachSection
                    setActive={setActiveSection}
                    index={index}
                    isActive={index === activeSection}
                    key={`${index}+${activeSubject * index}`}
                    table={table}
                    activeSubject={activeSubject}
                />
            ))}
        </div>
    );
};

const EachSection = ({ index, table, isActive, setActive, activeSubject }) => {
    const acceptNum = useMemo(() => {
        let temp = 0;
        table?.requested.forEach(request => {
            if (request.is_accepted) temp += 1;
        });
        return temp;
    }, [table]);

    return (
        <>
            <div
                onClick={() => setActive(index)}
                className={`} relative mb-2 flex w-full cursor-pointer flex-col items-start  rounded-md bg-primary-dark px-2 py-2 font-semibold
                text-white ${isActive && "bg-[#06156E]"}`}>
                <div className="flex items-center">
                    <div className=" mr-2">เซค</div>
                    <div className=" mr-2">{table.section}</div>
                    <div className="">
                        ({acceptNum}/{table.max_ta})
                    </div>
                    <FontAwesomeIcon icon={faChevronDown} className={`absolute right-4 ${isActive ? "rotate-180" : "rotate-0"}`} />
                </div>
                {isActive && (
                    <div className="relative w-full overflow-hidden ">
                        {acceptNum === 0 && <div className="">-</div>}
                        {table.requested.map((request, i) => request.is_accepted && <EachStudent request={request} key={`${i}+${activeSubject}`} />)}
                    </div>
                )}
            </div>
        </>
    );
};

const EachStudent = request => {
    const user = request.request;
    console.log(user);
    return (
        <div className="mt-3 flex w-full items-center space-x-3 px-2">
            <div className="aspect-square  w-12 shrink-0 overflow-hidden rounded-full lg:ml-5">
                <img src={user?.imgURL || ""} className="h-full w-full" alt="" />
            </div>
            <div className="flex w-full min-w-0 flex-col -space-y-1">
                <div className="ellipsis text-base font-normal">
                    {user?.firstname} {user?.lastname}
                </div>
                <div className="text-sm font-normal">{user?.student_id}</div>
            </div>
        </div>
    );
};

export default AcceptedList;
