import React, { useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useFetchCommunityByID } from "../../../composables/fetch/useFetchCommunity";

const MemberSidebar = () => {
    const { data, error, isLoading } = useFetchCommunityByID();

    const memberLists = useMemo(() => {
        return data?.data.student_ta;
    }, [data]);

    return (
        <div className="sticky top-[80px] flex h-[calc(100vh-120px)] w-[250px] shrink-0 flex-col overflow-auto rounded-bl-md border-2 bg-[#f5f5f5] text-text shadow-md">
            <div className="mx-4 mt-14 text-xl font-bold">สมาชิก ({20})</div>
            <Teacher />
            <div className="mt-10 w-full px-4 text-lg font-semibold">TA</div>
            {!isLoading && !error && memberLists?.map(student => <Student key={uuid()} student={student} />)}
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
                <div className="aspect-square h-12 shrink-0 overflow-hidden rounded-full">
                    <img src={student.imgURL || ""} alt="" className="h-full w-full bg-slate-100  object-cover" />
                </div>
                <div className=" flex w-full min-w-0 flex-col  text-sm">
                    <div className="ellipsis">
                        {student.firstname} {student.lastname}
                    </div>
                    <div className="-mt-1">{student.studentID}</div>
                </div>
            </div>
        </div>
    );
};

export default MemberSidebar;
