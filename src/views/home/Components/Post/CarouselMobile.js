import React from "react";

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
    return (
        <div className="flex-col-cen w-full space-y-4 px-12 mt-6">
            {posts.map((post , index) => (
                index < 3 ?
                <Card key={post.subjectID} post={post} /> : ""
            ))}
        </div>
    );
};

const Card = ({ post }) => {
    return (
        <div className="flex w-full space-x-3 rounded-md border px-4 py-6 ">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-md">
                <img src={post.authorAvatar} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex w-full flex-col text-base text-text">
                <div className="font-semibold tracking-wide">
                    {post.author}({post.department})
                </div>
                <div className="text-xl font-bold tracking-wide">{post.subjectName}</div>
                <div className="flex flex-col space-y-4 mt-2">
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
                <div className="shrink-0 whitespace-nowrap text-sm text-sm font-medium text-text-light">2 ชม.ที่แล้ว</div>
        </div>
    );
};

export default CarouselMobile;
