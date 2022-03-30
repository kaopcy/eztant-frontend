import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";

gsap.registerPlugin(ScrollTrigger);
const posts = [
    {
        author: "พรหมพิริยะ เจริญพานทองดี",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMNICATION NAJA",
        subjectID: "0100123",
        wage: "600",
        year: "2,3,4",
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/400",
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION NAJA",
        subjectID: "0100124",
        wage: "600",
        year: "2,3,4",
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/399",
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION NAJA",
        subjectID: "0100125",
        wage: "600",
        year: "2,3,4",
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION NAJA",
        subjectID: "0100126",
        wage: "600",
        year: "2,3,4",
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION NAJA",
        subjectID: "0100127",
        wage: "600",
        year: "2,3,4",
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
    },
];

const SwiperCarousel = () => {
    const [triggerUpdate, setTriggerUpdate] = useState(true);
    const enterAnim = direction => {
        gsap.fromTo(
            ".card-animation",
            { yPercent: 20 * direction, autoAlpha: 0 },
            { yPercent: 0, duration: 0.5, autoAlpha: 1, stagger: { amount: 0.5 }, overwrite: true, delay: 0 }
        );
    };
    const hideAnim = () => {
        gsap.set(".card-animation", { autoAlpha: 0, overwrite: true });
    };
    useEffect(() => {
        ScrollTrigger.create({
            trigger: "#swiper-wrapper",
            onEnter: () => enterAnim(1),
            onEnterBack: () => enterAnim(-1),
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

    return (
        <Swiper {...swiperOption} id="swiper-wrapper" className=" relative flex min-h-[400px] w-[90%] max-w-[1200px] items-center overflow-hidden">
            <div className="text h-full w-[100px]"></div>
            <div className="text h-full w-[100px]"></div>
            <div className="text h-full w-[100px]"></div>
            {posts.map(post => (
                <SwiperSlide
                    key={post.subjectID}
                    className="card-animation flex-col-cen invisible w-[350px] justify-start overflow-hidden rounded-lg border-[2px] bg-white opacity-0 ">
                    <div className="flex-cen h-32 w-full  justify-start space-x-4 bg-primary-dark px-3 leading-none text-white">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white bg-orange-200">
                            <img src={post?.authorAvatar} className="h-full w-full" alt="" />
                        </div>
                        <div className="flex flex-col justify-center ">
                            <div className="mb-1 text-2xl font-semibold leading-6">{post?.author}</div>
                            <div className="text-sm font-normal  text-text-light">{post?.department}</div>
                        </div>
                    </div>
                    <div className="flex min-h-[283px] w-full flex-col space-y-5 whitespace-normal px-6 py-8 text-sm text-text">
                        <div className="flex w-full items-center ">
                            <div className="w-20 shrink-0 font-bold ">ชื่อวิชา</div>
                            <div className="whitespace-normal ">{post?.subjectName}</div>
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
    );
};
export default SwiperCarousel;
