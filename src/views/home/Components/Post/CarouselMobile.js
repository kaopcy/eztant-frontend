import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

const CarouselMobile = () => {
    useEffect(() => {
        ScrollTrigger.batch(".card-animation", {
            onEnter: batch => gsap.fromTo(batch, { yPercent: 20 }, { autoAlpha: 1, yPercent: 0, stagger: 0.15, overwrite: true }),
            onLeave: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
            onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, stagger: 0.15, overwrite: true }),
            onLeaveBack: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
        });
    }, []);
    return (
        <div id="trigger-el" className="flex-col-cen mt-6 w-full space-y-4 px-4 sm:px-12">
            {posts.map((post, index) => (index < 5 ? <Card key={post.subjectID} post={post} /> : ""))}
        </div>
    );
};

const Card = ({ post }) => {
    return (
        <div className="card-animation flex w-full space-x-3 rounded-md border px-4 py-6 opacity-0 ">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-md sm:h-16 sm:w-16">
                <img src={post.authorAvatar} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex w-full flex-col text-base text-text">
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap font-semibold leading-tight tracking-wide">
                        <div className="mr-2">{post.author}</div>
                        <div className="">({post.department})</div>
                    </div>
                    <div className="shrink-0 whitespace-nowrap text-xs font-medium text-text-light sm:text-sm">2 ชม.ที่แล้ว</div>
                </div>
                <div className="text-lg font-bold tracking-wide sm:text-xl">{post.subjectName}</div>
                <div className="mt-2 flex flex-col space-y-4">
                    <div className="flex items-center text-sm font-medium">
                        <div className="w-24 shrink-0">ค่าตอบแทน</div>
                        <div className="">{post.wage} บาท/ชั่วโมง</div>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                        <div className="w-24 shrink-0">ชั้นปีที่รับ</div>
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

export default CarouselMobile;
