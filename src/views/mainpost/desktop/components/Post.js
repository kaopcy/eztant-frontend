import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Moment from "react-moment";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNonInitialEffect } from "../../../../composables/useNonInitialEffect";

const Post = ({ post }) => {
    return (
        <div className="min-h-[500px] min-w-[768px] max-w-[1000px] rounded-md px-10 py-8 text-xl shadow-md">
            <Header post={post} />
            <Detail post={post} />
        </div>
    );
};

const Header = ({ post }) => {
    const left = () => (
        <div className="flex-cen w-full justify-start space-x-4">
            <div className="h-16 w-16 overflow-hidden rounded-full">
                <img src={post.authorAvatar} alt="" className="h-full w-full " />
            </div>
            <div className="flex flex-col ">
                <span className="font-semibold">{post.author}</span>
                <span className="text-sm text-text-light">{post.department}</span>
            </div>
        </div>
    );

    const right = () => (
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
    const [isMore, setIsMore] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const moreDetailRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const setSize = () => {
            const containerHeight = textRef.current.offsetHeight;
            const lineHeight = 28;
            console.log(containerHeight);
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
    }, []);

    useNonInitialEffect(() => {
        if (showMore) {
            gsap.to(moreDetailRef.current, { duration: 0.5, height: "auto" });
        } else {
            gsap.to(moreDetailRef.current, { height: 84, duration: 0.5 });
        }
    }, [showMore]);

    const text = ({ label, detail, className = "" }) => (
        <div className={`${className} flex min-w-0 items-center whitespace-nowrap text-lg `}>
            <span className="w-28 font-semibold">{label}</span>
            <span className="ellipsis ">{detail}</span>
        </div>
    );
    return (
        <div className="mt-8  flex flex-col space-y-4">
            {text({ label: "ชื่อวิชา", detail: post.subjectName })}
            {text({ label: "รหัสวิชา", detail: post.subjectID })}
            {text({ label: "ค่าตอบแทน", detail: `${post.wage} บาท/ชั่วโมง` })}
            {text({ label: "ชั้นปีที่รับ", detail: post.year })}
            <div className={`flex min-w-0 items-center whitespace-nowrap text-lg `}>
                <span className="mr-6 font-semibold">เกรดรายวิชาไม่ต่ำกว่า</span>
                <span className="ellipsis ">{post.minGrade}</span>
            </div>
            <div className={`flex min-w-0 flex-col whitespace-nowrap text-lg `}>
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
                            ...ดูเพิ่มเติม
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;
