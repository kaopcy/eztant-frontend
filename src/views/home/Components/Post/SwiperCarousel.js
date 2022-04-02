import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { Pagination, Navigation } from "swiper";
import { POSTS as posts } from "../../../../generalConfig";

gsap.registerPlugin(ScrollTrigger);

const SwiperCarousel = () => {
    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const nextEl = useRef(null);
    const prevEl = useRef(null);
    const enterAnim = direction => {
        gsap.fromTo(
            ".card-animation",
            { yPercent: 10 * direction, autoAlpha: 0 },
            { yPercent: 0, duration: 0.5, autoAlpha: 1, stagger: { amount: 0.5 }, overwrite: true, delay: 0 }
        );
    };
    const hideAnim = () => {
        gsap.set(".card-animation", { autoAlpha: 0, overwrite: true });
    };
    useLayoutEffect(() => {
        if (!document.querySelector(".card-animation")) return;
        ScrollTrigger.create({
            trigger: "#swiper-wrapper",
            start: "-70 bottom",
            onEnter: () => enterAnim(1),
            onEnterBack: () => enterAnim(-1),
            onLeaveBack: () => hideAnim(),
            onLeave: () => hideAnim(),
        });
    }, [triggerUpdate]);

    const swiperOption = {
        slidesPerView: 1,
        spaceBetween: 2,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: true,
        modules: [Pagination, Navigation],
        grabCursor: true,
        initialSlide: 0,
        onBreakpoint: () => setTriggerUpdate(e => !e),
        breakpoints: {
            820: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    };

    const prevBtn = () => {
        return (
            <div
                ref={prevEl}
                className=" flex-col-cen absolute -left-8 top-0 h-full cursor-pointer text-2xl text-text hover:text-text-light 2md:-left-10 xl:-left-14 xl:text-4xl">
                <FontAwesomeIcon icon={faChevronCircleLeft} />
            </div>
        );
    };

    const nextBtn = () => {
        return (
            <div
                ref={nextEl}
                className=" flex-col-cen absolute -right-8 top-0 h-full cursor-pointer text-2xl text-text hover:text-text-light 2md:-right-10 xl:-right-14 xl:text-4xl">
                <FontAwesomeIcon icon={faChevronCircleRight} />
            </div>
        );
    };

    return (
        <>
            <div className="relative w-[90%] max-w-[1200px] mt-12">
                <Swiper {...swiperOption} navigation={{ nextEl: nextEl.current, prevEl: prevEl.current }} id="swiper-wrapper" className="">
                    {posts.map(post => (
                        <SwiperSlide
                            key={post.subjectID}
                            className="card-animation flex-col-cen invisible w-[350px] justify-start overflow-hidden rounded-lg border-[2px] bg-white opacity-0 ">
                            <div className="flex-cen h-32 w-full justify-start space-x-4 bg-primary-dark px-3 leading-none text-white">
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white bg-orange-200">
                                    <img src={post?.authorAvatar} className="h-full w-full" alt="" />
                                </div>
                                <div className="flex min-w-0 flex-col items-start justify-center">
                                    <div className="mb-1 w-full overflow-x-hidden text-ellipsis whitespace-nowrap py-1 text-2xl font-semibold leading-6">
                                        {post?.author}
                                    </div>
                                    <div className="text-sm font-normal  text-text-light">{post?.department}</div>
                                </div>
                            </div>
                            <div className="flex min-h-[283px] w-full flex-col space-y-5 whitespace-normal px-6 py-8 text-sm text-text">
                                <div className="flex w-full items-center ">
                                    <div className="w-20 shrink-0 font-bold ">ชื่อวิชา</div>
                                    <div className="overflow-x-hidden text-ellipsis whitespace-nowrap">{post?.subjectName}</div>
                                </div>
                                <div className="flex w-full items-center ">
                                    <div className="w-20 shrink-0 font-bold ">รหัสวิชา</div>
                                    <div className=" ">{post?.subjectID}</div>
                                </div>
                                <div className="flex w-full items-center ">
                                    <div className="w-20 shrink-0 font-bold ">ค่าตอบแทน</div>
                                    <div className=" ">{post?.wage} บาท/ชั่วโมง</div>
                                </div>
                                <div className="flex w-full items-center ">
                                    <div className="w-20 shrink-0 font-bold ">ชั้นปีที่รับ</div>
                                    <div className=" ">{post?.year}</div>
                                </div>

                                <div className="flex w-full items-center ">
                                    <div className="mr-4 shrink-0 font-bold">เกรดรายวิชาไม่ต่ำกว่า</div>
                                    <div className=" ">{post?.minGrade}</div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {nextBtn()}
                {prevBtn()}
                <div className="mt-6 cursor-pointer text-right text-base text-text underline">...ดูเพิ่มเติม</div>
            </div>
        </>
    );
};
export default SwiperCarousel;
