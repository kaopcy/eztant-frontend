import React, { useState, useRef, useEffect, forwardRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

import { Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";

const PostSuggestDesktop = ({ isLoading, postSuggest }) => {
    gsap.registerPlugin(ScrollTrigger);
    const navigate = useNavigate();

    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const nextEl = useRef(null);
    const prevEl = useRef(null);

    const triggerContainer = useRef(null);
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        if (postSuggest && !isLoading && postSuggest.length > 0) {
            console.log("waawdwa");
            gsap.fromTo(
                ".testtesttest",
                { yPercent: 100 },
                {
                    yPercent: 0,
                    ease: "elastic.out(1.2,1)",
                    stagger: { amount: 0.3, each: 0.3 },
                    duration: 1,
                    scrollTrigger: { trigger: triggerRef.current },
                    overwrite: true,
                }
            );
        }
    }, [postSuggest, isLoading]);
    useEffect(() => {
        ScrollTrigger.refresh();
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

    const handlePostClick = (e, subjectName) => {
        e.preventDefault();
        navigate(`/post-list/all-department?${subjectName.replace(/\s/g, "")}`);
    };

    return (
        <>
            <div ref={triggerRef} className="relative w-[90%] max-w-[1200px]">
                <Swiper {...swiperOption} navigation={{ nextEl: nextEl.current, prevEl: prevEl.current }} ref={triggerContainer}>
                    {isLoading
                        ? [...Array(3)].map((_, index) => (
                              <SwiperSlide
                                  key={index}
                                  className="testtesttest flex-col-cen w-[350px] justify-start  rounded-xl border-[2px] bg-white ">
                                  <div className="flex-cen h-32 w-full justify-start space-x-4 bg-primary-dark px-3 leading-none text-white">
                                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full  bg-blue-800 "></div>
                                      <div className="flex w-full min-w-0 flex-col items-start justify-center">
                                          <div className="mb-1  h-6 w-[60%] overflow-x-hidden text-ellipsis whitespace-nowrap bg-white text-2xl font-semibold leading-6 opacity-25"></div>
                                          <div className="mt-2 h-6 w-[40%] bg-black text-sm font-normal text-text-light opacity-25"></div>
                                      </div>
                                  </div>
                                  <div className="flex min-h-[283px] w-full flex-col space-y-5 whitespace-normal px-6 py-8 text-sm text-text">
                                      <div className="flex w-full items-center ">
                                          <div className="mr-4 h-6 w-20 shrink-0 bg-slate-100 font-bold "></div>
                                          <div className="overflow-x-hidden text-ellipsis whitespace-nowrap"></div>
                                      </div>
                                      <div className="flex w-full items-center ">
                                          <div className="mr-4 h-6 w-20 shrink-0 bg-slate-100 font-bold "></div>
                                          <div className="h-6 w-full bg-zinc-100  "></div>
                                      </div>
                                      <div className="flex w-full items-center ">
                                          <div className="mr-4 h-6 w-20 shrink-0 bg-slate-100 font-bold "></div>

                                          <div className="h-6 w-[50%] bg-zinc-100 "></div>
                                      </div>
                                      <div className="flex w-full items-center ">
                                          <div className="mr-4 h-6 w-20 shrink-0 bg-slate-100 font-bold "></div>

                                          <div className="h-6 w-24 bg-zinc-100 "></div>
                                      </div>

                                      <div className="flex w-full items-center ">
                                          <div className="mr-4 h-6 w-32 shrink-0 bg-slate-100 font-bold"></div>
                                          <div className="h-6 w-24 bg-zinc-100 "></div>
                                      </div>
                                  </div>
                              </SwiperSlide>
                          ))
                        : postSuggest.map(post => (
                              <SwiperSlide
                                  onClick={e => handlePostClick(e, post.subjectName)}
                                  key={post.subjectID}
                                  className="testtesttest flex-col-cen w-[350px] justify-start  rounded-xl border-[2px] bg-white ">
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
                <NextBtn ref={nextEl} />
                <PrevBtn ref={prevEl} />
                <div className="mt-6 cursor-pointer text-right text-base text-text underline">...ดูเพิ่มเติม</div>
            </div>
        </>
    );
};

const PrevBtn = forwardRef((_, ref) => {
    return (
        <div
            ref={ref}
            className=" flex-col-cen absolute -left-8 top-0 h-full cursor-pointer text-2xl text-text hover:text-text-light 2md:-left-10 xl:-left-14 xl:text-4xl">
            <FontAwesomeIcon icon={faChevronCircleLeft} />
        </div>
    );
});

const NextBtn = forwardRef((_, ref) => {
    return (
        <div
            ref={ref}
            className=" flex-col-cen absolute -right-8 top-0 h-full cursor-pointer text-2xl text-text hover:text-text-light 2md:-right-10 xl:-right-14 xl:text-4xl">
            <FontAwesomeIcon icon={faChevronCircleRight} />
        </div>
    );
});

const Loading = () => {
    return <div className="">Loading...</div>;
};

export default PostSuggestDesktop;
