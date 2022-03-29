import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";

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
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={2}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
                820:{
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
            }}
            className="relative flex min-h-[400px] w-[90%] max-w-[1200px] items-center overflow-hidden">
            
            {posts.map(post => (
                <SwiperSlide key={post.subjectID} className=" flex-col-cen w-[350px] justify-start border-[2px] bg-white rounded-lg overflow-hidden ">
                    <div className="flex-cen h-32 w-full  justify-start leading-none space-x-4 bg-primary-dark px-3 text-white">
                        <div className="shrink-0 h-20 w-20 overflow-hidden rounded-full border-2 border-white bg-orange-200">
                            <img src={post?.authorAvatar} className="h-full w-full" alt="" />
                        </div>
                        <div className="flex flex-col justify-center ">
                            <div className="text-2xl font-semibold mb-1 leading-6">{post?.author}</div>
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
