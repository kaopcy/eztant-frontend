import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Moment from "react-moment";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis , faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNonInitialEffect } from "../../../../composables/useNonInitialEffect";

import TeachTable from "./TeachTable";

const PostDesktop = ({ post }, ref) => {
    const container = useRef(null)
    useLayoutEffect(()=>{
        gsap.from(container.current, {
            autoAlpha: 0,
            yPercent: 50,
            scale: 0.8,
            duration: 1,
            ease: 'expo.inOut'
        })
    },[ref])

    return (
        <div ref={container} className="mypost min-h-[500px] min-w-[768px] shrink-0 rounded-md  border bg-white px-10 py-8 text-xl shadow-md">
            <Header post={post} />
            <Detail post={post} />
        </div>
    );
};

const Header = ({ post }) => {
    const left = () => (
        <div className="flex-cen w-full justify-start space-x-4">
            <div className="h-16 w-16 overflow-hidden rounded-full">
                <img src={post?.authorAvatar} alt="" className="h-full w-full " />
            </div>
            <div className="flex flex-col ">
                <span className="font-semibold">{post?.author}</span>
                <span className="text-sm text-text-light">{post?.department}</span>
            </div>
        </div>
    );

    const right = (post) => (
        <div className="flex-cen space-x-3">
            <div className="">{post.page}</div>
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
    const [isMore, setIsMore] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const moreDetailRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const setSize = () => {
            const containerHeight = textRef.current.offsetHeight;
            const lineHeight = 28;
            if (containerHeight > lineHeight * 3) {
                setIsMore(true);
                moreDetailRef.current.style.height = `${28 * 3}px`;
                moreDetailRef.current.style.overflow = "hidden";
            } else {
                setIsMore(false);
                moreDetailRef.current.style.height = `auto`;
                moreDetailRef.current.style.overflow = "hidden";
            }
        };
        setSize();
        window.addEventListener("resize", setSize);

        return () => {
            window.removeEventListener("resize", setSize);
        };
    }, []);

    useNonInitialEffect(() => {
        if (showMore) {
            gsap.to(moreDetailRef.current, { duration: 0.5, height: "auto" });
        } else {
            gsap.to(moreDetailRef.current, { height: 84, duration: 0.5 });
        }
    }, [showMore]);

    const text = ({ label, detail, className = "" }) => (
        <div className={`${className} flex min-w-0 items-start whitespace-nowrap `}>
            <span className="w-28 font-semibold">{label}</span>
            <span className="max-w-[220px]  whitespace-pre-line">{detail}</span>
        </div>
    );
    return (
        <div className="mt-8 flex items-start justify-between ">
            <div className="flex flex-col space-y-4  text-lg">
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
                        <div ref={moreDetailRef} className="leading-[28px]">
                            <div ref={textRef} className="w-full">
                                {post.moreDetail}
                            </div>
                        </div>
                        <br />
                        {isMore && (
                            <div className="cursor-pointer text-sm underline" onClick={() => setShowMore(e => !e)}>
                                {showMore ? "...ดูน้อยลง" : "...ดูเพิ่มเติม"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <TeachTable />
        </div>
    );
};

export const PostFallBack = () => {
    return (
        <div className="min-h-[500px] min-w-[768px] relative shrink-0 rounded-md  border bg-white px-10 py-8 text-xl shadow-md">
            <div className="flex-cen w-full mb-10">
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
                    <div className="w-[100px] h-7 bg-zinc-100"></div>
                    <FontAwesomeIcon icon={faEllipsis} className="text-lg bg-zinc-50 h-7 text-gray-300 px-4 " />
                </div>
            </div>
            <div className="w-full flex space-x-5">
                <div className="w-full bg-white py-6 px-6">
                    <div className="flex flex-col w-full space-y-3">
                        <div className="flex items-center space-x-1">
                            <div className="w-[130px] h-7 shrink-0">
                                <div className="h-full w-3/4 bg-gray-300"></div>
                            </div>
                            <div className="w-full h-7 bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-[130px] h-7 shrink-0">
                                <div className="h-full w-2/5 bg-gray-300"></div>
                            </div>
                            <div className="w-full h-7 bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-[130px] h-7 shrink-0">
                                <div className="h-full w-3/5 bg-gray-300"></div>
                            </div>
                            <div className="w-full h-7 bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-[130px] h-7 shrink-0">
                                <div className="h-full w-[70%] bg-gray-300"></div>
                            </div>
                            <div className="w-full h-7 bg-gray-200"></div>
                        </div>
                    </div>
                </div>
                <div className="shrink-0 w-[300px] py-4 bg-[#E7E7E7] flex-col-cen space-y-3">
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="shrink-0 w-10 rounded-l-3xl h-8 bg-yellow-100"></div>
                        <div className="w-full h-8 bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="shrink-0 w-10 rounded-l-3xl h-8 bg-pink-200"></div>
                        <div className="w-full h-8 bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="shrink-0 w-10 rounded-l-3xl h-8 bg-green-200"></div>
                        <div className="w-full h-8 bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="shrink-0 w-10 rounded-l-3xl h-8 bg-orange-200"></div>
                        <div className="w-full h-8 bg-white"></div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 right-16 text-gray-300 text-3xl">
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    );
};

export default PostDesktop;
