import React, { useEffect, useMemo, useRef, useState } from "react";

import { DAY_COLOR } from "../../../../generalConfig";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faTrashAlt, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useHandleUserPost } from "../../RequestListContext";
import { useAcceptRequest } from "../../../../composables/interact/useAcceptRequest";

const MainRequest = ({ post, postNum, setActiveSection }) => {
    return (
        <div className="h-[500px] w-[975px]  ">
            <div className="mb-5 flex w-full  items-center border-b-2 py-5 px-5 text-xl font-semibold text-text">
                นักศึกษาที่สมัครเป็น TA วิชา {post.subject_name} {post.subject_id}
            </div>
            {post.schedules.map((table, index) => (
                <EachSection setActiveSection={setActiveSection} postNum={postNum} sectionNum={index} table={table} key={index} />
            ))}
        </div>
    );
};

const EachSection = ({ table, sectionNum, setActiveSection, ...props }) => {
    let requestNum = 0;
    console.log(table?.accepted.length || 0 , table.max_ta);
    const [acceptNum, setAcceptNum] = useState( null);
    useEffect(()=>{
        setAcceptNum(table?.accepted.length|| 0)
    },[table])
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
            className={`mx-auto flex w-full max-w-[800px] flex-col bg-white py-4 px-10 text-text outline-2 outline-gray-200 hover:rounded-md hover:outline `}
            ref={container}>
            <div className="mb-2 flex items-center text-base  ">
                เซค {table.section}{" "}
                <div className="ml-2 font-bold">
                    ({requestNum}/{table.max_ta})
                </div>
                {/* <div className="ml-2 h-4 w-6  shrink-0 rounded-md" style={{ backgroundColor: DAY_COLOR[table.day] }}></div> */}
            </div>
            <div className="  ">
                {table.requested.length > 0 || table.accepted.length > 0 ? (
                    [...table.accepted, ...table.requested].map((request, index) => (
                        <div key={index} className="relative pt-3 pl-5 pr-0 pb-4 first:overflow-hidden xl:pr-5">
                            {request.is_accepted && (
                                <div className="absolute -top-12 left-1 h-full w-[2px] bg-gray-300">
                                    <div className="absolute bottom-0 h-[2px] w-4 bg-gray-300"></div>
                                </div>
                            )}
                            <EachUser
                                section={table}
                                userID={request._id}
                                scheduleID={table}
                                acceptNum={acceptNum}
                                setAcceptNum={setAcceptNum}
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

const EachUser = ({ acceptNum, setAcceptNum, max_ta, request: user, userNum, postNum, sectionNum, section }) => {
    const { setAccept, reject, unAccept } = useHandleUserPost(postNum, sectionNum, userNum);
    const {
        mutate: serverToggle,
        isLoading,
        error,
    } = useAcceptRequest(() => {
        window.location.reload();
    });

    useEffect(() => {
        console.log(
            section.accepted.some(e => {
                return e._id === user._id;
            })
        );
    }, [section.accepted, user]);

    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(() => {
        setIsAccepted(
            section.accepted.some(e => {
                return e._id === user._id;
            })
        );
    }, [section,user]);

    const onAccept = () => {
        serverToggle({ scheduleID: section._id, userID: user._id });
        setAcceptNum(e => e + 1);
        setAccept();
    };

    const onUnAccept = () => {
        serverToggle({ scheduleID: section._id, userID: user._id });
        setIsAccepted(false);
        setAcceptNum(e => e - 1);
    };

    useEffect(() => {
        console.log(`acceptNum: ${acceptNum}`);
    }, [acceptNum]);

    return (
        <div
            className={`relative flex w-full items-center justify-between  rounded-md bg-zinc-100 px-2 py-3 shadow-sm hover:bg-zinc-200 ${
                !isAccepted && acceptNum >= max_ta && "opacity-30"
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
            {isLoading && <div className="">กำลังโหลด</div>}
            <div className="flex shrink-0 items-center space-x-6">
                {isAccepted ? (
                    <>
                        <div className="font-bold text-green-500">รับแล้ว {JSON.stringify(isAccepted)}</div>
                        <FontAwesomeIcon icon={faXmark} onClick={() => onUnAccept()} className="cursor-pointer text-2xl text-secondary" />
                    </>
                ) : acceptNum < max_ta ? (
                    <>
                        <FontAwesomeIcon icon={faCheck} onClick={() => onAccept()} className="cursor-pointer text-2xl text-primary-dark" />
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
