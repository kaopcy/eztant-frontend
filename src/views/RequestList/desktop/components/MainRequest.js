import React, { useEffect, useRef } from "react";

import { DAY_COLOR } from "../../../../generalConfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faTrashAlt, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useHandleUserPost } from "../../RequestListContext";
import { useAcceptRequest } from "../../../../composables/interact/useAcceptRequest";

const MainRequest = ({ post, postNum, setActiveSection }) => {
    return (
        <div className="h-[500px] w-[975px]  ">
            <div className="mb-5 flex w-full  items-center border-b-2 py-5 px-5 text-xl font-semibold text-text">
                นักศึกษาที่สมัครเป็น TA วิชา {post.subjectName} {post.subjectID}
            </div>
            {post.schedules.map((table, index) => (
                <EachSection setActiveSection={setActiveSection} postNum={postNum} sectionNum={index} table={table} key={index} />
            ))}
        </div>
    );
};

const EachSection = ({ table, sectionNum, setActiveSection, ...props }) => {
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
            setActiveSection(sectionNum);
        };
        container.current.addEventListener("mouseenter", onMouseEnter);
        container.current.addEventListener("click", onMouseEnter);
        return () => {
            copyContainer.removeEventListener("mouseenter", onMouseEnter);
            copyContainer.addEventListener("click", onMouseEnter);
        };
    }, [setActiveSection, sectionNum]);

    table.requested.sort(function (x, y) {
        return x.is_accepted === y.is_accepted ? 0 : x.is_accepted ? -1 : 1;
    });

    return (
        <div
            className={`mx-auto flex w-full max-w-[800px] flex-col bg-white px-10 text-text outline-2 outline-gray-200 hover:rounded-md hover:outline `}
            ref={container}>
            <div className="mb-2 flex items-center text-base  ">
                เซค {table.section}{" "}
                <div className="ml-2 font-bold">
                    ({requestNum}/{table.max_ta})
                </div>
                {/* <div className="ml-2 h-4 w-6  shrink-0 rounded-md" style={{ backgroundColor: DAY_COLOR[table.day] }}></div> */}
            </div>
            <div className="  ">
                {table.requested.length > 0 ? (
                    table.requested.map((request, index) => (
                        <div key={index} className="relative pt-3 pl-5 pr-0 pb-4 first:overflow-hidden xl:pr-5">
                            {request.is_accepted && (
                                <div className="absolute -top-12 left-1 h-full w-[2px] bg-gray-300">
                                    <div className="absolute bottom-0 h-[2px] w-4 bg-gray-300"></div>
                                </div>
                            )}
                            <EachUser
                                userID={request._id}
                                scheduleID={table}
                                acceptNum={acceptNum}
                                max_ta={table.max_ta}
                                sectionNum={sectionNum}
                                userNum={index}
                                request={request}
                                {...props}
                            />
                        </div>
                    ))
                ) : (
                    <div className="ml-4">-</div>
                )}
            </div>
        </div>
    );
};

const EachUser = ({ acceptNum, max_ta, request, userNum, postNum, sectionNum }) => {
    const user = request;
    const { setAccept, reject, unAccept } = useHandleUserPost(postNum, sectionNum, userNum);
    const { mutate , isLoading , error } = useAcceptRequest()

    useEffect(()=>{
        console.log(request)
    },[request])

    const onAccept = ()=>{
        mutate()
        setAccept()
    }

    useEffect(()=>{
        if(error)
        console.log(error.response);
    },[error])

    return (
        <div
            className={`relative flex w-full items-center justify-between  rounded-md bg-zinc-100 px-2 py-3 shadow-sm hover:bg-zinc-200 ${
                !request.is_accepted && acceptNum >= max_ta && "opacity-30"
            }`}>
            <div className="flex space-x-5">
                <div className="aspect-square  w-12 shrink-0 overflow-hidden rounded-full lg:ml-5">
                    <img src={user.imgURL || ""} className="h-full w-full" alt="" />
                </div>
                <div className="flex w-full min-w-0 flex-col -space-y-1">
                    <div className="ellipsis text-lg  font-semibold tracking-wide">
                        {user.firstname} {user.lastname}
                    </div>
                    <div className="text-sm font-normal">{user.student_id}</div>
                </div>
            </div>

            <div className="flex shrink-0 items-center space-x-6">
                {request.is_accepted ? (
                    <>
                        <div className="font-bold text-green-500">รับแล้ว</div>
                        <FontAwesomeIcon icon={faXmark} onClick={() => unAccept()} className="cursor-pointer text-2xl text-secondary" />
                    </>
                ) : acceptNum < max_ta ? (
                    <>
                        <FontAwesomeIcon icon={faCheck} onClick={() => setAccept()} className="cursor-pointer text-2xl text-primary-dark" />
                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => reject()} className="cursor-pointer text-lg text-secondary" />
                    </>
                ) : (
                    <>
                        <div className="font-bold">เต็ม</div>
                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => reject()} className="cursor-pointer text-lg text-secondary" />
                    </>
                )}
                <div className="mr-1 text-xs text-text-light ">2 ชม.ที่แล้ว</div>
            </div>
        </div>
    );
};

export default MainRequest;
