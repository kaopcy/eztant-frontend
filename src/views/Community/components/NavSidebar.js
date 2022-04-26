import React from "react";
import { useResolvedPath, useMatch, Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendarCheck, faFileLines, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const NavSidebar = () => {
    const {
        user: { communities },
    } = useSelector(state => state.user);
    const subjectLinks = [
        {
            color: "bg-red-500",
            to: communities?.[0]?.id,
            name: "DATA COMMUNICATION",
        },
        {
            color: "bg-blue-600",
            to: communities?.[1]?.id,
            name: "DATA COMMUNICATION",
        },
        {
            color: "bg-green-600",
            to: communities?.[2]?.id,
            name: "DATA COMMUNICATION",
        },
    ];

    const { id } = useParams();

    return (
        <div className="left-scroll sticky top-[80px] flex h-[calc(100vh-120px)] w-[250px] shrink-0 flex-col overflow-auto rounded-bl-md border-2 bg-[#f5f5f5] text-text shadow-md">
            <div className="left-scroll-child h-full w-full">
                <div className="my-14 flex w-full flex-col">
                    <ControlLink to={`/community/${id}`} name="หน้าหลัก" icon={faHouse} />
                    <ControlLink to={`/community/${id}/attendance`} name="เช็คชื่อ" icon={faCalendarCheck} />
                    <ControlLink to={`/community/${id}/file`} name="ไฟล์" icon={faFileLines} />
                    <ControlLink to={`/community/${id}/receipt`} name="ใบเสร็จ" icon={faReceipt} />
                </div>
                <div className="h-[2px] w-full bg-gray-200"></div>
                <div className="flex w-full flex-col">
                    <div className="ml-8 mt-10 mb-2 text-xl font-bold">คอมมูนิตี้ ({subjectLinks.length})</div>
                    {subjectLinks.map(link => (
                        <SubjectLink key={uuid()} {...link} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ControlLink = ({ name, icon, to }) => {
    const { pathname: path } = useResolvedPath(to);
    const match = useMatch({ path, end: true });

    return (
        <Link to={to} className={`flex w-full items-center px-4 py-4 text-xl font-semibold ${match && "bg-primary text-white"}`}>
            <FontAwesomeIcon icon={icon} className="w-14 text-2xl" />
            <div className="">{name}</div>
        </Link>
    );
};

const SubjectLink = ({ name, color, to }) => {
    const toPath = `/community/${to}`;
    const { pathname: path } = useResolvedPath(toPath);
    const match = useMatch({ path, end: false });
    return (
        <Link to={toPath} className="flex w-full min-w-0 items-center px-8 py-3">
            <div className={`mr-3 h-4 w-4 shrink-0 rounded-full ${color}`}></div>
            <div className={`ellipsis w-full text-base  ${match ? "font-bold" : "font-normal"}`}>{name}</div>
        </Link>
    );
};

export default NavSidebar;
