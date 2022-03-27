import React, { createRef, forwardRef, useMemo } from "react";
import Slider from "react-slick";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

const posts = [
    {
        author: "ปิยชัย แก้วชุ่ม",
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

const SampleNextArrow = ({ currentSlide, slideCount, ...props }) => {
    return <FontAwesomeIcon icon={faCircleChevronRight} {...props} style={{ color: "gray", fontSize: "40px !important", right: "-40px" }} />;
};
const SamplePrevArrow = ({ currentSlide, slideCount, ...props }) => {
    return <FontAwesomeIcon icon={faCircleChevronLeft} {...props} style={{ color: "gray", left: "-40px" }} />;
};

const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slideCount: 1,
    slidesToShow: 3,
    swipeToSlide: true,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
};

const Carousel = () => {
    const postsRef = useMemo(() => posts.map(e => createRef(null)), []);
    
    return (
        <div className="mx-auto w-[80%] max-w-[1060px]">
            <div className="space-x-4 py-8">
                <FontAwesomeIcon icon={faThumbsUp} className="text-2xl text-yellow-200" />
                <span className="text-2xl font-bold text-text ">แนะนำ</span>
            </div>
            <Slider {...sliderSetting} className="relative flex min-h-[400px] w-full items-center ">
                {posts.map((post, index) => (
                    <Post ref={postsRef[index]} key={post.subjectID} post={post} />
                ))}
            </Slider>
        </div>
    );
};

const Post = forwardRef(({ post }, ref) => {
    return (
        <div ref={ref} className=" flex-col-cen  max-w-[350px] justify-start border-[2px] bg-white  ">
            <div className="flex-cen h-32 w-full  justify-start space-x-4 bg-primary-dark px-3 text-white">
                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-white bg-orange-200">
                    <img src={post?.authorAvatar} className="h-full w-full" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="text-2xl font-semibold ">{post?.author}</div>
                    <div className="text-sm font-normal text-text-light">{post?.department}</div>
                </div>
            </div>
            <div className="flex min-h-[283px] w-full flex-col space-y-5 px-6 py-8 text-sm text-text whitespace-normal">
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
        </div>
    );
});

export default Carousel;
