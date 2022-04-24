import React from "react";
import { v4 as uuid } from "uuid";

const MemberSidebar = () => {
    const memberList = [
        {
            studentName: "ปิยชัย แก้วชุ่ม",
            imgURL: "https://i.pravatar.cc/400",
            studentID: "63010604",
        },
        {
            studentName: "พิชชาภา เวียงทอง",
            imgURL: "https://i.pravatar.cc/401",
            studentID: "63010679",
        },
        {
            studentName: "พรหมพิริยะ เจริญพานทองดี",
            imgURL: "https://i.pravatar.cc/402",
            studentID: "63010648",
        },
        {
            studentName: "ธีรภัทร เกตุสิงห์น้อย",
            imgURL: "https://i.pravatar.cc/403",
            studentID: "63010467",
        },
        {
            studentName: "จิรายุส เสนาโนฤทธิ์",
            imgURL: "https://i.pravatar.cc/404",
            studentID: "63010151",
        },
        {
            studentName: "จิรายุส เสนาโนฤทธิ์",
            imgURL: "https://i.pravatar.cc/404",
            studentID: "63010151",
        },
    ];
    return (
        <div className="sticky top-[80px] flex h-[calc(100vh-120px)] w-[250px] shrink-0 flex-col overflow-auto rounded-bl-md border-2 bg-[#f5f5f5] text-text shadow-md">
            <div className="mx-4 mt-14 text-xl font-bold">สมาชิก ({20})</div>
            <Teacher />
            <div className="mt-10 w-full px-4 text-lg font-semibold">TA</div>
            {memberList.map(student => (
                <Student key={uuid()} student={student} />
            ))}
        </div>
    );
};

const Teacher = () => {
    return (
        <div className="mt-3 w-full px-4">
            <div className="text-lg font-semibold">อาจารย์</div>
            <div className="mt-2 ml-4  flex w-full items-center space-x-3">
                <img src="https://i.pravatar.cc/400" alt="" className="aspect-square h-12 shrink-0 rounded-full object-cover" />
                <div className="">ปิยชัย แก้วชุ่ม</div>
            </div>
        </div>
    );
};

const Student = ({ student }) => {
    return (
        <div className="mt-3 w-full px-4">
            <div className="mt-2  ml-4 flex w-full items-center space-x-3">
                <img src={student.imgURL} alt="" className="aspect-square h-12 shrink-0 rounded-full object-cover" />
                <div className=" flex w-full min-w-0 flex-col  text-sm">
                    <div className="ellipsis">{student.studentName}</div>
                    <div className="-mt-1">{student.studentID}</div>
                </div>
            </div>
        </div>
    );
};

export default MemberSidebar;
