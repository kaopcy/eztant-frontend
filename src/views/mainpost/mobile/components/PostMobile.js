import React, { useState, useRef, useEffect, forwardRef, useMemo } from "react";
import Moment from "react-moment";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";

import TeachTable from "../../desktop/components/TeachTable";
import Like from "../../components/Like";

const PostMobile = ({ post, setSelectedPost }) => {
    gsap.registerPlugin(Draggable);
    const dragProxy = useRef(null);
    const [isTeachTable, setIsTeachTable] = useState(false);
    const openTeachTable = useRef(() => {});
    const closeTeachTable = useRef(() => {});

    // Show-Hide overflow content
    const detailRef = useRef(null);
    const animateDetail = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);

    const handleClick = () => {
        animateDetail.current.reversed() ? animateDetail.current.play() : animateDetail.current.reverse();
    };

    useEffect(() => {
        setIsOverflow(detailRef.current?.scrollHeight > detailRef.current?.clientHeight);
        animateDetail.current = gsap.to(detailRef.current, {
            height: "auto",
            paused: true,
            reversed: true,
            onComplete: () => {
                setIsShowMore(true);
            },
            onReverseComplete: () => {
                setIsShowMore(false);
            },
        });
    }, []);

    useEffect(() => {
        let lastSnap = 0;
        Draggable.create(dragProxy.current, {
            type: "x",
            onDragEnd: () => {
                const proxyWidth = gsap.getProperty(dragProxy.current, "width");
                const proxyX = gsap.getProperty(dragProxy.current, "x");
                const snapValue = proxyX > lastSnap ? -((proxyWidth * 3) / 4) : -((proxyWidth * 1) / 4);
                const destinationX = proxyX > snapValue ? 0 : -proxyWidth;
                lastSnap = destinationX;
                if (destinationX === 0) {
                    setIsTeachTable(false);
                } else {
                    setIsTeachTable(true);
                }
                gsap.to(dragProxy.current, {
                    duration: 1,
                    x: destinationX,
                    ease: "power4.out",
                });
            },
        });
    }, []);

    return (
        <div className="relative  w-[95%] shrink-0 rounded-md  border bg-white px-6 py-8 text-xl shadow-md">
            <Header post={post} />
            <div className="relative h-[300px] overflow-hidden " ref={detailRef}>
                <div className="mb-10 flex" ref={dragProxy}>
                    <Detail post={post} />
                    <div className="flex-col-cen my-10 w-full shrink-0 justify-start">
                        <TeachTable tables={post.tables} />
                    </div>
                </div>
                {isOverflow && (
                    <div className="opacity-gradient z-1 absolute  bottom-0 h-[100px] w-full cursor-pointer " onClick={() => handleClick()}>
                        <div className="absolute bottom-0 left-0 self-end text-sm text-text underline">{isShowMore ? "ดูน้อยลง" : "ดูเพิ่มเติม"}</div>
                        <div className="absolute bottom-0 mx-auto mt-6 flex w-full items-center justify-center space-x-3">
                            <div
                                onClick={() => closeTeachTable.current()}
                                className={`h-2 w-2 rounded-full bg-gray-200 ${isTeachTable ? "bg-gray-200" : "bg-gray-700"}`}></div>
                            <div
                                onClick={() => openTeachTable.current()}
                                className={`h-2 w-2 rounded-full bg-gray-200 ${!isTeachTable ? "bg-gray-200" : "bg-gray-700"}`}></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-10 flex justify-end space-x-4">
                {setSelectedPost && (
                    <div className="btn-orange rounded-lg px-10 py-2 text-base" onClick={() => setSelectedPost(post)}>
                        สมัครเป็น TA
                    </div>
                )}
                <Like />
            </div>
        </div>
    );
};

const Header = ({ post }) => {
    const left = () => (
        <div className="flex-cen w-full justify-start space-x-4">
            <div className=" h-12 w-12  shrink-0 overflow-hidden  rounded-full lg:h-16 lg:w-16">
                <img src={post.authorAvatar} alt="" className="h-full w-full " />
            </div>
            <div className="flex w-full items-start justify-between">
                <div className="flex flex-col  ">
                    <span className="text-[14px] font-semibold leading-5">{post.author}</span>
                    <span className="text-xs text-text-light">{post.department}</span>
                </div>
                {right(post)}
            </div>
        </div>
    );

    const right = () => (
        <div className="flex-cen space-x-3">
            <Moment className="whitespace-nowrap text-xs text-text-light" locale="th" fromNow>
                {new Date("2022-04-01T08:30-0500")}
            </Moment>
            <FontAwesomeIcon icon={faEllipsis} className="rotate-90 text-lg" />
        </div>
    );

    return <div className="flex-cen w-full">{left(post)}</div>;
};

const Detail = forwardRef(({ post }, ref) => {
    const text = ({ label, detail, className = "" }) => (
        <div className={`${className} flex min-w-0 items-start whitespace-nowrap`}>
            <span className="w-20 shrink-0 font-semibold ">{label}</span>
            <span className="  whitespace-pre-line ">{detail}</span>
        </div>
    );

    return (
        <div className="mt-8 flex w-full shrink-0 items-start justify-between text-sm " ref={ref}>
            <div className="flex flex-col space-y-2 ">
                {text({ label: "ชื่อวิชา", detail: post.subjectName })}
                {text({ label: "รหัสวิชา", detail: post.subjectID })}
                {text({ label: "ค่าตอบแทน", detail: `${post.wage} บาท/ชั่วโมง` })}
                {text({ label: "ชั้นปีที่รับ", detail: post.year })}
                <div className={`flex min-w-0 items-center whitespace-nowrap  `}>
                    <span className="mr-6 font-semibold">เกรดรายวิชาไม่ต่ำกว่า</span>
                    <span className="ellipsis ">{post.minGrade}</span>
                </div>
                <div className={`flex min-w-0 flex-col whitespace-nowrap  `}>
                    <div className="mr-6 font-semibold">หน้าที่</div>
                    <div className="whitespace-pre-line px-5 py-2 ">
                        <div className="leading-[28px]">
                            <div className="w-full ">{post.duty.trim()}</div>
                        </div>
                        <br />
                    </div>
                </div>
                <div className={`flex min-w-0 flex-col whitespace-nowrap  `}>
                    <div className="mr-6 font-semibold">ข้อกำหนด</div>
                    <div className="whitespace-pre-line px-5 py-2 ">
                        <div className="leading-[28px]">
                            <div className="w-full ">{post.requirement.trim()}</div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
});

export const PostFallBack = () => {
    const left = () => (
        <div className="flex-cen w-full justify-start space-x-4">
            <div className=" h-12 w-12  shrink-0 overflow-hidden  rounded-full lg:h-16 lg:w-16">
                <div className="h-full w-full bg-slate-200"></div>
            </div>
            <div className="flex w-full items-start justify-between">
                <div className="flex flex-col  ">
                    <span className="h-4 w-28 bg-slate-100"></span>
                    <span className="mt-2 h-4 w-28 bg-slate-100"></span>
                </div>
                {right()}
            </div>
        </div>
    );

    const right = () => (
        <div className="flex-cen space-x-3">
            <div className="h-4 w-16 bg-gray-100"></div>
            <FontAwesomeIcon icon={faEllipsis} className="rotate-90 text-lg" />
        </div>
    );

    const text = ({ width }) => (
        <div className=" flex w-full items-start whitespace-nowrap">
            <div style={{ width }} className="h-4 w-24 shrink-0 bg-gray-200 "></div>
            <div className="ml-4 h-4 w-full bg-gray-100 "></div>
        </div>
    );

    return (
        <div className="relative  w-[95%] shrink-0 rounded-md  border bg-white px-6 py-8 text-xl shadow-md">
            <div className="flex-cen w-full">{left()}</div>
            <div className="relative overflow-hidden ">
                <div className="mb-10 flex">
                    <div className="mt-8 flex w-full shrink-0 items-start justify-between text-sm ">
                        <div className="flex w-full flex-col space-y-4">
                            {text({ width: "100px" })}
                            {text({ width: "150px" })}
                            {text({ width: "130px" })}
                            {text({ width: "110px" })}
                            {text({ width: "160px" })}
                            {text({ width: "50px" })}
                            {text({ width: "60px" })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-end space-x-4">
                <div className="w-40 rounded-lg bg-red-100 px-10 py-2 text-base"></div>
                <div className="mb-1 flex space-x-2 self-end">
                    <div className="flex-col-cen relative ">
                        <FontAwesomeIcon icon={faHeart} className="text-slate-200" />
                    </div>
                    <div className="self-end text-sm text-text-light">17</div>
                </div>
            </div>
        </div>
    );
};

export default PostMobile;
