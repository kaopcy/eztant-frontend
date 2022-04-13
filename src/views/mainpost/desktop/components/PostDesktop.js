import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Moment from "react-moment";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import TeachTable from "./TeachTable";
import Like from "../../components/Like";

const PostDesktop = ({ post, setSelectedPost }, ref) => {
    const container = useRef(null);
    useLayoutEffect(() => {
        gsap.from(container.current, {
            autoAlpha: 0,
            yPercent: 50,
            scale: 0.8,
            duration: 1,
            ease: "expo.inOut",
        });
    }, [ref]);

    return (
        <div ref={container} className="mypost w-[768px] shrink-0 rounded-md  border bg-white px-10 py-8 text-xl shadow-md">
            <Header post={post} />
            <Detail post={post} />
            <div className="flex justify-end space-x-8">
                <div className="btn-orange rounded-lg px-10 py-2" onClick={() => setSelectedPost(post)}>
                    สมัครเป็น TA
                </div>
                <Like />
            </div>
        </div>
    );
};

const Header = ({ post }) => {
    const left = () => (
        <div className="flex-cen w-full justify-start space-x-4">
            <div className="h-16 w-16 overflow-hidden rounded-full">
                <img src={post?.authorAvatar} alt="" className="h-full w-full bg-slate-100" />
            </div>
            <div className="flex flex-col ">
                <span className="font-semibold">{post?.author}</span>
                <span className="text-sm text-text-light">{post?.department}</span>
            </div>
        </div>
    );

    const right = post => (
        <div className="flex-cen space-x-3">
            <Moment className="whitespace-nowrap text-sm text-text-light" locale="th" fromNow>
                {new Date("2022-04-01T08:30-0500")}
            </Moment>
            <FontAwesomeIcon icon={faEllipsis} className="text-lg " />
        </div>
    );

    return (
        <div className="flex-cen w-full">
            {left(post)}
            {right(post)}
        </div>
    );
};

const Detail = ({ post }) => {
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
            duration: 0.3,
            onComplete: () => {
                setIsShowMore(true);
            },
            onReverseComplete: () => {
                setIsShowMore(false);
            },
        });
    }, []);

    const text = ({ label, detail, className = "" }) => (
        <div className={`${className} flex min-w-0 items-start whitespace-nowrap `}>
            <span className="w-28 font-semibold">{label}</span>
            <span className="max-w-[220px]  whitespace-pre-line">{detail}</span>
        </div>
    );
    return (
        <div className="relative mt-8 flex h-[400px] items-start justify-between overflow-hidden " ref={detailRef}>
            <div className="mb-10 flex flex-col  space-y-4 text-lg">
                {text({ label: "ชื่อวิชา", detail: post.subjectName })}
                {text({ label: "รหัสวิชา", detail: post.subjectID })}
                {text({ label: "ค่าตอบแทน", detail: `${post.wage} บาท/ชั่วโมง` })}
                {text({ label: "ชั้นปีที่รับ", detail: post.year })}
                <div className={`flex min-w-0 items-center whitespace-nowrap `}>
                    <span className="mr-6 font-semibold">เกรดรายวิชาไม่ต่ำกว่า</span>
                    <span className="ellipsis ">{post.minGrade}</span>
                </div>
                <div className={`flex min-w-0 flex-col whitespace-nowrap `}>
                    <div className="mr-6 font-semibold">หน้าที่</div>
                    <div className="whitespace-pre-line px-5 py-4 ">
                        <div className="leading-[28px]">
                            <div className="w-full">{post?.moreDetail.trim() || "-"}</div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <TeachTable />
            {isOverflow && (
                <div className="opacity-gradient absolute bottom-0  z-10 h-[100px] w-full cursor-pointer " onClick={() => handleClick()}>
                    <div className="absolute bottom-0 left-0 self-end text-sm text-text underline">{isShowMore ? "ดูน้อยลง" : "ดูเพิ่มเติม"}</div>
                </div>
            )}
        </div>
    );
};

export const PostFallBack = () => {
    return (
        <div className="relative min-h-[500px] min-w-[768px] shrink-0 rounded-md  border bg-white px-10 py-8 text-xl shadow-md">
            <div className="flex-cen mb-10 w-full">
                <div className="flex-cen w-full justify-start space-x-4">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                        <div className="h-full w-full bg-slate-200"></div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-3">
                            <span className="h-6 w-8 bg-gray-200"></span>
                            <span className="h-6 w-[225px] bg-gray-200"></span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="h-6 w-8 bg-gray-200"></span>
                            <span className="h-6 w-[225px] bg-gray-200"></span>
                        </div>
                    </div>
                </div>
                <div className="flex-cen space-x-3">
                    <div className="h-7 w-[100px] bg-zinc-100"></div>
                    <FontAwesomeIcon icon={faEllipsis} className="h-7 bg-zinc-50 px-4 text-lg text-gray-300 " />
                </div>
            </div>
            <div className="flex w-full space-x-5">
                <div className="w-full bg-white py-6 px-6">
                    <div className="flex w-full flex-col space-y-3">
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-3/4 bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-2/5 bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-3/5 bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-[70%] bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
                <div className="flex-col-cen w-[300px] shrink-0 space-y-3 bg-[#E7E7E7] py-4">
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-yellow-100"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-pink-200"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-green-200"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-orange-200"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 right-16 text-3xl text-gray-300">
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    );
};

export default PostDesktop;
