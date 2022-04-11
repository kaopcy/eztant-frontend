import React, { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PostSuggestMobile = ({ isLoading, postSuggest }) => {
    useEffect(() => {
        if (!document.querySelector(".card-animation")) return;
        ScrollTrigger.batch(".card-animation", {
            onEnter: batch => gsap.fromTo(batch, { yPercent: 20 }, { autoAlpha: 1, yPercent: 0, stagger: 0.15, overwrite: true }),
            onLeave: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
            onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
            onLeaveBack: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
        });
        ScrollTrigger.refresh();
    }, [postSuggest]);
    return isLoading ? (
        <div className="">Loading</div>
    ) : (
        postSuggest.map((post, index) => (index < 5 ? <Card key={post.subjectID} post={post} /> : ""))
    );
};

const Card = ({ post }) => {
    return (
        <div className="card-animation flex w-full cursor-pointer space-x-3 rounded-md border px-4 py-6 opacity-0 hover:border-gray-500">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-md sm:h-16 sm:w-16">
                <img src={post.authorAvatar} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="xs:text-md flex w-full min-w-0 flex-col text-xs text-text md:text-xl">
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap font-semibold leading-tight tracking-wide">
                        <div className="mr-2">{post.author}</div>
                        <div className="">({post.department})</div>
                    </div>
                    <div className=" shrink-0 whitespace-nowrap text-[10px] font-medium text-text-light xs:text-xs sm:text-sm">2 ชม.ที่แล้ว</div>
                </div>
                <div className="ellipsis text-sm font-bold tracking-tight">{post.subjectName}</div>
                <div className="mt-2 flex flex-col space-y-2">
                    <div className="flex items-center text-sm font-medium">
                        <div className="w-20 shrink-0 sm:w-24">ค่าตอบแทน</div>
                        <div className="">{post.wage} บาท/ชั่วโมง</div>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                        <div className="w-20 shrink-0 sm:w-24">ชั้นปีที่รับ</div>
                        <div className="">{post.year}</div>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                        <div className="mr-4 shrink-0 whitespace-nowrap">เกรดรายวิชาไม่ต่ำกว่า</div>
                        <div className="">{post.minGrade}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostSuggestMobile;
