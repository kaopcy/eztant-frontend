import React, { useEffect, useRef } from "react";

import { DAY_COLOR } from "../../../../generalConfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const MainRequest = ({ post, setActiveSection }) => {
    return (
        <div className="h-[500px] w-[975px]  ">
            <div className="mb-5 flex w-full  items-center border-b-2 py-5 px-5 text-xl font-semibold text-text">
                นักศึกษาที่สมัครเป็น TA วิชา {post.subjectName} {post.subjectID}
            </div>
            {post.tables.map((table, index) => (
                <EachSection setActiveSection={setActiveSection} index={index} table={table} key={index} />
            ))}
        </div>
    );
};

const EachSection = ({ table, index, setActiveSection }) => {
    let requestNum = 0;
    let acceptNum = 0;
    table?.requested.forEach(request => {
        requestNum += 1;
        if (request.is_accepted) acceptNum += 1;
    });

    const container = useRef(null);
    useEffect(() => {
        const copyContainer = container.current;
        const onMouseEnter = e => {
            setActiveSection(index);
        };
        container.current.addEventListener("mouseenter", onMouseEnter);
        return () => {
            copyContainer.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [setActiveSection, index]);

    return (
        <div className={`flex w-full max-w-[800px] mx-auto flex-col px-10 text-text hover:outline outline-2 outline-gray-200 hover:rounded-md `}  ref={container}>
            <div className="flex items-center text-base  ">
                เซค {table.section} <div className="ml-2 font-bold">({requestNum}/{table.max_ta})</div>
                <div className="ml-2 h-4 w-6  shrink-0 rounded-md" style={{ backgroundColor: DAY_COLOR[table.day] }}></div>
            </div>
            <div className="pl-5 pr-0 pb-4 xl:pr-5">
                {table.requested.length ? (
                    table.requested.map((request, index) => !request.is_accepted && <EachUser request={request} key={index} />)
                ) : (
                    <div className="ml-4">-</div>
                )}
            </div>
        </div>
    );
};

const EachUser = ({ request }) => {
    const user = request.user;
    return (
        <div className="mt-3 flex w-full items-center justify-between  rounded-md bg-zinc-100 px-2 py-3 shadow-sm">
            <div className="flex space-x-5">
                <img src={user.imgURL} className="aspect-square  w-12 shrink-0 rounded-full lg:ml-5 " alt="" />
                <div className="flex w-full min-w-0 flex-col -space-y-1">
                    <div className="ellipsis text-lg  font-semibold tracking-wide">
                        {user.firstname} {user.lastname}
                    </div>
                    <div className="text-sm font-normal">{user.studentID}</div>
                </div>
            </div>
            <div className="flex shrink-0 items-center space-x-6">
                <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-2xl text-primary-dark" />
                <FontAwesomeIcon icon={faXmark} className="cursor-pointer text-2xl text-secondary" />
                <div className="mr-1 text-xs text-text-light ">2 ชม.ที่แล้ว</div>
            </div>
        </div>
    );
};

export default MainRequest;
