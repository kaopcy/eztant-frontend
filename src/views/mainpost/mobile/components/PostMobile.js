import React, { useState, useRef, useEffect, forwardRef } from "react";
import Moment from "react-moment";
import { Observer } from "gsap/Observer";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import TeachTable from "../../desktop/components/TeachTable";

const PostMobile = ({ post }) => {
    gsap.registerPlugin(Observer)
    const containerRef = useRef(null);
    const detailRef = useRef(null);
    const teachTableRef = useRef(null);
    const [isTeachTable, setIsTeachTable] = useState(false);
    const openTeachTable = useRef(() => {});
    const closeTeachTable = useRef(() => {});

    useEffect(()=>{
        console.log('mounted')
    },[])


    useEffect(() => {
        const animate = gsap.to(teachTableRef.current, { paused: true, xPercent: -100 });
        openTeachTable.current = () => {
            setIsTeachTable(true);
            animate.play();
        };
        closeTeachTable.current = () => {
            setIsTeachTable(false);
            animate.reverse();
        };
        Observer.create({
            target: containerRef.current,
            tolerance: 20,
            type: "touch",
            onLeft: () => openTeachTable.current(),
            onRight: () => closeTeachTable.current(),
        });
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-[500px] w-[95%] shrink-0 rounded-md  border bg-white px-6 py-8 text-xl shadow-md">
            <Header post={post} />
            <div className="overflow-hidden">
                <div className="flex" ref={teachTableRef}>
                    <Detail post={post} ref={detailRef} />
                    <div className="flex-col-cen w-full shrink-0">
                        <TeachTable />
                    </div>
                </div>
                <div className="relative mx-auto mt-3 flex w-full items-center justify-center space-x-3">
                    <div
                        onClick={() => closeTeachTable.current()}
                        className={`h-2 w-2 rounded-full bg-gray-200 ${isTeachTable ? "bg-gray-200" : "bg-gray-700"}`}></div>
                    <div
                        onClick={() => openTeachTable.current()}
                        className={`h-2 w-2 rounded-full bg-gray-200 ${!isTeachTable ? "bg-gray-200" : "bg-gray-700"}`}></div>
                </div>
            </div>
            <FontAwesomeIcon icon={faHeart} className="absolute right-10 bottom-8 text-text" />
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

    const text = ({ label, detail, className = "" }) => (
        <div className={`${className} flex min-w-0 items-start whitespace-nowrap`}>
            <span className="w-20 shrink-0 font-semibold text-black">{label}</span>
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
                        <div ref={moreDetailRef} className="leading-[28px]">
                            <div ref={textRef} className="w-full ">
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
        </div>
    );
});

export default PostMobile;
